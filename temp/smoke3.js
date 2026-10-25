const fs = require('fs');
const vm = require('vm');
const ctx = {
  window: {}, document: { getElementById: () => null, querySelector: () => null, querySelectorAll: () => [], addEventListener: () => {}, createElement: () => ({ style: {}, classList: { add(){}, remove(){}, toggle(){} }, appendChild(){}, remove(){} }), body: { appendChild(){} }, title: '' },
  console, setTimeout: (fn) => {}, FileReader: function(){},
};
ctx.globalThis = ctx;
vm.createContext(ctx);
let code = '';
['js/app.js','js/pages-part1.js','js/pages-part2.js','js/pages-part3.js','js/pages-part4.js'].forEach(f => { code += fs.readFileSync(f, 'utf8') + '\n'; });
code = code.replace(/\r/g, '');
vm.runInContext(code + '\nvar DPP = window.DPP;', ctx);
const Pages = ctx.Pages, DPP = ctx.DPP;
let pass = 0, fail = 0;
const pages = ['dashboard','datasource','syncTask','upload','workorder','workorderDetail','dataset','datasetDetail','preprocess','annotationTask','annotationWork','quality','evaluate','packagePage','user','role','org','tenant','menuManage','settings','loginLogs','logs'];
pages.forEach(p => {
  try {
    const html = Pages[p]();
    if (typeof html === 'string' && html.length > 100) { pass++; }
    else { fail++; console.log('EMPTY', p); }
  } catch (e) { fail++; console.log('FAIL', p, e.message); }
});
// 弹窗构建
try { DPP.openModal = () => {}; Pages.menuModal(); Pages.menuModal('m-user'); Pages.menuModal(null, 'm-sys'); Pages.menuDelete('m-menu', '菜单管理'); pass += 4; } catch (e) { fail++; console.log('FAIL modal', e.message); }
try { const p = Pages.menuParentOf('m-user-add'); if (p !== 'm-user') throw new Error('parent=' + p); pass++; } catch (e) { fail++; console.log('FAIL parentOf', e.message); }
console.log(`pass=${pass} fail=${fail}`);
process.exit(fail ? 1 : 0);
