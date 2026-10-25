const fs = require('fs');
try {
  // Simulate loading all JS files in order
  global.DPP = { icon: () => 'ICON', navigate: () => {} };
  
  const p1 = fs.readFileSync('js/pages-part1.js', 'utf8');
  eval(p1);
  console.log('Part1 OK. Pages:', Object.keys(Pages).join(', '));
} catch(e) {
  console.log('Part1 ERROR:', e.message);
  console.log(e.stack.split('\n')[0]);
}
