import { Chess } from 'chess.js';

const game = new Chess();
game.move('e4');
game.move('e5');
console.log('Original FEN:', game.fen());
console.log('Original PGN:', game.pgn());

const gameCopy = new Chess();
try {
  gameCopy.loadPgn(game.pgn());
  console.log('Copy FEN:', gameCopy.fen());
  console.log('Are they equal?', game.fen() === gameCopy.fen());
} catch (e) {
  console.error('loadPgn failed:', e.message);
}
