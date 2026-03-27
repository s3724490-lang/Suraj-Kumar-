import { Chess } from 'chess.js';

const gameCopy = new Chess();
try {
  gameCopy.loadPgn("");
  console.log('loadPgn("") successful');
} catch (e) {
  console.error('loadPgn("") failed:', e.message);
}
