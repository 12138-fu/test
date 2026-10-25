const fs = require('fs');
var Pages = {};
try {
  eval(fs.readFileSync('js/pages-part3.js', 'utf8'));
  console.log('p3 OK:', Object.keys(Pages).length);
  console.log('Keys:', Object.keys(Pages).join(', '));
} catch(e) {
  console.log('p3 ERR:', e.message);
  const lines = e.stack.split('\n');
  console.log(lines[1] || '');
  console.log(lines[2] || '');
}
