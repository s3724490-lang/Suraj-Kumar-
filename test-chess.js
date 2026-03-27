import { Chess } from 'chess.js';

const game = new Chess();
try {
  const result = game.move({ from: 'e2', to: 'e4', promotion: 'q' });
  console.log('Move successful:', result.san);
} catch (e) {
  console.error('Move failed:', e);
}
