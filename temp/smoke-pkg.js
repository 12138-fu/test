const fs = require('fs');
const elements = {};
function makeEl(id = '', cls = '') {
  const el = {
    id, className: cls, innerHTML: '', style: {}, dataset: {},
    classList: { toggle(c, v) { this[c] = v; }, add(c) { this[c] = true; }, remove(c) { this[c] = false; } },
    querySelector: () => makeEl(),
    addEventListener: () => {}
  };
  if (id) elements[id] = el;
  return el;
}
global.document = {
  getElementById: (id) => elements[id] || makeEl(id),
  querySelector: () => makeEl(),
  querySelectorAll: () => [],
  addEventListener: () => {}
};
global.window = { addEventListener: () => {} };
global.localStorage = { getItem: () => null, setItem: () => {} };

const code = ['js/app.js','js/pages-part1.js','js/pages-part2.js','js/pages-part3.js','js/pages-part4.js']
  .map(f => fs.readFileSync(f, 'utf8')).join('\n');

const test = `
var DPP = window.DPP;
let pass = 0, fail = 0;
const pages = ['dashboard','datasource','syncTask','upload','workorder','dataset','preprocess','annotationTask','annotationWork','quality','evaluate','packagePage','user','role','org','logs','loginLogs','tenant','settings','menuManage','datasetDetail','workorderDetail'];
pages.forEach(p => {
  try {
    const html = Pages[p]();
    if (!html || html.length < 100) throw new Error('empty/short output');
    pass++;
  } catch (e) { fail++; console.log('FAIL', p, e.message); }
});
try { DPP.pageParams = { id: 'WO-QB-20241015-001' }; Pages.workorderDetail(); pass++; } catch (e) { fail++; console.log('FAIL workorderDetail(param)', e.message); }
try { DPP.pageParams = { name: '政务问答语料数据集' }; Pages.datasetDetail(); pass++; } catch (e) { fail++; console.log('FAIL datasetDetail(param)', e.message); }
['packageModal','evaluateModal','qualityModal','userModal','roleModal','orgModal'].forEach(m => {
  try { Pages[m](); pass++; } catch (e) { fail++; console.log('FAIL modal', m, e.message); }
});
try {
  if (PKG_FORMATS.length !== 10) throw new Error('expect 10 formats, got ' + PKG_FORMATS.length);
  let out; const orig = DPP.openModal; DPP.openModal = (t, b) => { out = b; }; Pages.packageModal(); DPP.openModal = orig;
  ['JSON-MIN','TSV','COCO 含图片','YOLO 含图片','YOLOv8 OBB 含图片'].forEach(v => { if (!out.includes(v)) throw new Error('missing format ' + v); });
  if (!out.includes('fmt-list')) throw new Error('fmt-list missing');
  pass++;
} catch (e) { fail++; console.log('FAIL pkgfmt', e.message); }
console.log(pass + ' passed, ' + fail + ' failed');
if (fail) process.exit(1);
`;
eval(code + '\n' + test);
