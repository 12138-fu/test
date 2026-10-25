const fs = require('fs');

const elements = { 'page-content': { innerHTML: '', style: {} } };
global.document = {
  getElementById: (id) => elements[id] || { innerHTML: '', style: {} },
  querySelector: () => ({ addEventListener: () => {}, classList: { add: () => {}, remove: () => {} } }),
  querySelectorAll: () => [],
  addEventListener: () => {}
};
global.window = global;
global.setTimeout = (fn) => { fn(); return 0; };

eval(fs.readFileSync('js/app.js', 'utf8'));
eval(fs.readFileSync('js/pages-part1.js', 'utf8'));
eval(fs.readFileSync('js/pages-part2.js', 'utf8'));
eval(fs.readFileSync('js/pages-part3.js', 'utf8'));

const pages = ['dashboard','datasource','sync-task','upload','workorder','dataset','preprocess','annotation-task','annotation-work','quality','evaluate','package','user','role','org','logs'];
let allOk = true;
pages.forEach(p => {
  try {
    window.DPP.navigate(p);
    const len = elements['page-content'].innerHTML.length;
    console.log((len > 500 ? 'OK' : 'FAIL') + '  ' + p + ': ' + len + ' chars');
    if (len < 500) allOk = false;
  } catch(e) {
    console.log('ERR ' + p + ': ' + e.message);
    allOk = false;
  }
});
console.log('\nAll pages OK:', allOk);
