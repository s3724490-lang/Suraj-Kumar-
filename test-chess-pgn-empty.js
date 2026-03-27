import { Chess } from 'chess.js';

const game = new Chess();
const gameCopy = new Chess();
gameCopy.loadPgn(game.pgn());
console.log('History length:', gameCopy.history().length);
