import { Chess } from 'chess.js';

const game = new Chess();
try {
  game.move({ from: 'e2', to: 'e4', promotion: 'q' });
  console.log('Move successful');
} catch (e) {
  console.error('Move failed:', e.message);
}
