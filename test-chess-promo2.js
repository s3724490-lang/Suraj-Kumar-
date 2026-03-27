import { Chess } from 'chess.js';

const game = new Chess();
try {
  const result = game.move({ from: 'g1', to: 'f3', promotion: 'q' });
  console.log('Move successful:', result.san);
} catch (e) {
  console.error('Move failed:', e.message);
}
