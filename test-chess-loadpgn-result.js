import { Chess } from 'chess.js';

const game = new Chess();
game.move('e4');
const gameCopy = new Chess();
const result = gameCopy.loadPgn(game.pgn());
console.log('loadPgn result:', result);
