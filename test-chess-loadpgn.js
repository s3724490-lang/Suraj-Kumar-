import { Chess } from 'chess.js';

const game = new Chess();
game.move('e4');
const gameCopy = new Chess();
gameCopy.loadPgn(game.pgn());
console.log('Original FEN:', game.fen());
console.log('Copy FEN:', gameCopy.fen());
