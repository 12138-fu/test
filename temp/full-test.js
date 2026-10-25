const fs = require('fs');

// Mock DOM
const elements = {};
function makeEl(id = '', cls = '') {
  const el = {
    id, className: cls, innerHTML: '', style: {}, dataset: {},
    classList: {
      toggle: function(c, v) { this[c] = v; },
      add: function(c) { this[c] = true; },
      remove: function(c) { this[c] = false; }
    },
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
  addEventListener: (evt, cb) => { if (evt === 'DOMContentLoaded') { /* simulate */ setTimeout(cb, 0); } }
};
global.window = { addEventListener: () => {} };

// Create page-content element
elements['page-content'] = makeEl('page-content', 'app-content');

// Load scripts
eval(fs.readFileSync('js/app.js', 'utf8'));
eval(fs.readFileSync('js/pages-part1.js', 'utf8'));
eval(fs.readFileSync('js/pages-part2.js', 'utf8'));
eval(fs.readFileSync('js/pages-part3.js', 'utf8'));

// Simulate DOMContentLoaded
try {
  window.DPP.init();
  console.log('Init OK');
  console.log('sidebar-nav innerHTML length:', elements['sidebar-nav'].innerHTML.length);
  console.log('page-content innerHTML length:', elements['page-content'].innerHTML.length);
  console.log('Current page:', window.DPP.currentPage);
} catch(e) {
  console.log('Init ERR:', e.message);
  console.log(e.stack.split('\n').slice(0,5).join('\n'));
}
