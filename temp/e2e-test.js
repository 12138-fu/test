const fs = require('fs');

// Mock browser DOM
global.document = {
  addEventListener: () => {},
  querySelectorAll: () => [],
  getElementById: () => ({ 
    innerHTML: '', 
    style: {},
    classList: { toggle: () => {} }
  }),
  querySelector: () => ({ addEventListener: () => {}, classList: { add: () => {}, remove: () => {} } })
};
global.window = { addEventListener: () => {} };

// Load app.js first
eval(fs.readFileSync('js/app.js', 'utf8').replace('const DPP', 'var DPP'));

// Load pages
eval(fs.readFileSync('js/pages-part1.js', 'utf8'));
eval(fs.readFileSync('js/pages-part2.js', 'utf8'));
eval(fs.readFileSync('js/pages-part3.js', 'utf8'));

console.log('Pages keys:', Object.keys(Pages).length);
console.log('DPP.menuConfig:', typeof DPP.menuConfig);

// Try navigate
try {
  const html = Pages.dashboard();
  console.log('Dashboard HTML length:', html.length);
  console.log('Dashboard render OK');
} catch(e) {
  console.log('Dashboard render ERR:', e.message);
}
