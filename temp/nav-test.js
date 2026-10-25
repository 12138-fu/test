const fs = require('fs');

const elements = {};
function makeEl(id = '', cls = '') {
  const el = {
    id, className: cls, innerHTML: '', style: {}, dataset: {},
    classList: { toggle: function(c, v) { this[c] = v; }, add: function(c) { this[c] = true; }, remove: function(c) { this[c] = false; } },
    addEventListener: () => {}
  };
  if (id) elements[id] = el;
  return el;
}

global.document = {
  getElementById: (id) => elements[id] || makeEl(id),
  querySelector: (sel) => {
    if (sel === '.sidebar-nav') return elements['sidebar-nav'] || (elements['sidebar-nav'] = makeEl('sidebar-nav', 'sidebar-nav'));
    if (sel === '.breadcrumb') return makeEl('', 'breadcrumb');
    return makeEl();
  },
  querySelectorAll: () => [],
  addEventListener: () => {}
};
global.window = global;
global.setTimeout = (fn, ms) => { fn(); return 0; };

eval(fs.readFileSync('js/app.js', 'utf8'));
eval(fs.readFileSync('js/pages-part1.js', 'utf8'));
eval(fs.readFileSync('js/pages-part2.js', 'utf8'));
eval(fs.readFileSync('js/pages-part3.js', 'utf8'));

window.DPP.init();
console.log('=== After init ===');
console.log('sidebar HTML length:', elements['sidebar-nav'].innerHTML.length);
console.log('page HTML length:', elements['page-content'].innerHTML.length);

// Test navigate to datasource
window.DPP.navigate('datasource');
console.log('=== After navigate to datasource ===');
console.log('page HTML length:', elements['page-content'].innerHTML.length);
console.log('currentPage:', window.DPP.currentPage);

// Test navigate to annotation-work
window.DPP.navigate('annotation-work');
console.log('=== After navigate to annotation-work ===');
console.log('page HTML length:', elements['page-content'].innerHTML.length);
