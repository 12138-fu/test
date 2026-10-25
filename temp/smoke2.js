const fs = require('fs');
const vm = require('vm');
const files = ['js/app.js', 'js/pages-part1.js', 'js/pages-part2.js', 'js/pages-part3.js', 'js/pages-part4.js'];
const code = files.map(f => fs.readFileSync(f, 'utf8')).join('\n');
const el = () => ({ innerHTML: '', classList: { add() {}, remove() {}, toggle() {} }, style: {}, value: '', addEventListener() {}, appendChild() {}, querySelector: () => el(), querySelectorAll: () => [] });
const ctx = {
  document: { getElementById: () => el(), querySelector: () => el(), querySelectorAll: () => [], createElement: () => el(), body: el(), addEventListener() {} },
  window: {}, localStorage: { getItem: () => null, setItem() {} }, console, setTimeout: (fn) => fn(),
};
ctx.window = ctx;
vm.createContext(ctx);
vm.runInContext(code + `
;(function(){
  const names = Object.keys(Pages).filter(k => typeof Pages[k] === 'function' && !/Modal|Filter|Reset|Change|Html|Detail$|^open|select|switch|toggle/i.test(k));
  let pass = 0, fail = 0;
  names.forEach(n => {
    try { const html = Pages[n](); if (typeof html === 'string' && html.length > 50) pass++; else { fail++; console.log('THIN', n); } }
    catch (e) { fail++; console.log('FAIL', n, '-', e.message); }
  });
  // detail pages with params
  try { Pages.datasetDetail(DS_ROWS[0]); pass++; } catch (e) { fail++; console.log('FAIL datasetDetail -', e.message); }
  try { Pages.workorderDetail(WO_ROWS[0]); pass++; } catch (e) { fail++; console.log('FAIL workorderDetail -', e.message); }
  // modal builders (they call DPP.openModal which needs document; stub returns)
  ['datasetModal','preprocessModal','datasourceModal','workorderModal','annotationTaskModal'].forEach(n => {
    if (Pages[n]) { try { Pages[n](); pass++; } catch (e) { fail++; console.log('FAIL', n, '-', e.message); } }
  });
  console.log('PASS ' + pass + ' / FAIL ' + fail);
})();`, ctx);
