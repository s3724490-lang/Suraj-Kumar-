import { Chess } from 'chess.js';

const game = new Chess();
game.move('e4');
console.log('Original FEN:', game.fen());

const gameCopy = new Chess();
gameCopy.loadPgn(game.pgn());
console.log('Copy FEN:', gameCopy.fen());

console.log('Are they equal?', game.fen() === gameCopy.fen());
