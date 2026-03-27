import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { Link, useParams } from 'react-router-dom';
import { doc, onSnapshot, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../AuthContext';

export function OnlineGame() {
  const { gameId } = useParams<{ gameId: string }>();
  const { user } = useAuth();
  const [game, setGame] = useState(new Chess());
  const [playerColor, setPlayerColor] = useState<'white' | 'black' | null>(null);
  const [status, setStatus] = useState<string>('loading');

  useEffect(() => {
    if (!gameId || !user) return;

    const gameRef = doc(db, 'games', gameId);
    
    // Check if game exists, if not, create it
    getDoc(gameRef).then((docSnap) => {
      if (!docSnap.exists()) {
        setDoc(gameRef, {
          whiteId: user.uid,
          whiteName: user.isAnonymous ? 'Guest' : user.email,
          fen: new Chess().fen(),
          pgn: '',
          status: 'waiting',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
        setPlayerColor('white');
      } else {
        const data = docSnap.data();
        if (data.whiteId === user.uid) {
          setPlayerColor('white');
        } else if (!data.blackId) {
          // Join as black
          updateDoc(gameRef, {
            blackId: user.uid,
            blackName: user.isAnonymous ? 'Guest' : user.email,
            status: 'active',
            updatedAt: new Date().toISOString()
          });
          setPlayerColor('black');
        } else if (data.blackId === user.uid) {
          setPlayerColor('black');
        } else {
          // Spectator
          setPlayerColor(null);
        }
      }
    });

    const unsubscribe = onSnapshot(gameRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const newGame = new Chess();
        if (data.pgn) {
          newGame.loadPgn(data.pgn);
        } else if (data.fen) {
          newGame.load(data.fen);
        }
        setGame(newGame);
        setStatus(data.status);
      }
    });

    return () => unsubscribe();
  }, [gameId, user]);

  function onDrop(sourceSquare: any, targetSquare: any) {
    if (!user || !gameId || status !== 'active') return false;
    
    // Check if it's the player's turn
    if ((game.turn() === 'w' && playerColor !== 'white') || 
        (game.turn() === 'b' && playerColor !== 'black')) {
      return false;
    }

    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      if (move === null) return false;

      const gameRef = doc(db, 'games', gameId);
      updateDoc(gameRef, {
        fen: game.fen(),
        pgn: game.pgn(),
        updatedAt: new Date().toISOString()
      });

      setGame(new Chess(game.fen()));
      return true;
    } catch (e) {
      return false;
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-4 flex justify-between items-center">
        <Link to="/" className="text-blue-400 hover:text-blue-300">&larr; Back to Menu</Link>
        <h2 className="text-2xl font-bold">Online Game</h2>
      </div>
      
      <div className="w-full max-w-md mb-4 text-center">
        <p className="text-slate-300">Game ID: <span className="font-mono bg-slate-800 px-2 py-1 rounded">{gameId}</span></p>
        <p className="text-slate-400 mt-2">
          {status === 'waiting' ? 'Waiting for opponent...' : 
           status === 'active' ? `Game Active - You are ${playerColor || 'Spectating'}` : 
           'Game Over'}
        </p>
      </div>

      <div className="w-full max-w-[600px] aspect-square">
        <Chessboard 
          position={game.fen()} 
          onPieceDrop={onDrop} 
          boardOrientation={playerColor === 'black' ? 'black' : 'white'} 
          arePiecesDraggable={status === 'active' && playerColor !== null}
        />
      </div>
    </div>
  );
}
