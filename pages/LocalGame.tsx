import React, { useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { Link } from 'react-router-dom';

export function LocalGame() {
  const [game, setGame] = useState(new Chess());

  function makeAMove(move: any) {
    try {
      const result = game.move(move);
      setGame(new Chess(game.fen()));
      return result;
    } catch (e) {
      return null;
    }
  }

  function onDrop(sourceSquare: any, targetSquare: any) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // always promote to a queen for example simplicity
    });
    return move !== null;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-4 flex justify-between items-center">
        <Link to="/" className="text-blue-400 hover:text-blue-300">&larr; Back to Menu</Link>
        <h2 className="text-2xl font-bold">Local Game</h2>
      </div>
      <div className="w-full max-w-[600px] aspect-square">
        <Chessboard position={game.fen()} onPieceDrop={onDrop} boardOrientation="white" />
      </div>
      <div className="mt-4 flex gap-4">
        <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg" onClick={() => {
          game.undo();
          setGame(new Chess(game.fen()));
        }}>Undo</button>
        <button className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg" onClick={() => {
          setGame(new Chess());
        }}>Reset</button>
      </div>
    </div>
  );
}
