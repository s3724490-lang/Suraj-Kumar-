import { Chess } from 'chess.js';

const game = new Chess();
game.move('e4');
const gameCopy = new Chess(game.fen());
console.log('Copy FEN:', gameCopy.fen());
