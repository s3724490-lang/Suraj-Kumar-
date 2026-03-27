import { Chess } from 'chess.js';

const game = new Chess();
game.move('e4');
const gameCopy = new Chess();
gameCopy.loadPgn(game.pgn());
console.log('History length:', gameCopy.history().length);
