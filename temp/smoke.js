global.window = global;
global.document = {
  querySelector: () => null,
  querySelectorAll: () => [],
  getElementById: () => null,
  addEventListener: () => {},
  createElement: () => ({ classList: { add(){}, remove(){} }, appendChild(){}, remove(){}, innerHTML: '' }),
  body: { appendChild(){} }
};
const fs = require('fs');
const src = ['js/app.js','js/pages-part1.js','js/pages-part2.js','js/pages-part3.js','js/pages-part4.js'].map(f => fs.readFileSync(f,'utf8')).join('\n');
require('vm').runInThisContext(src);
const pages = ['dashboard','datasource','syncTask','upload','workorder','workorderDetail','dataset','datasetDetail','preprocess','annotationTask','annotationWork','quality','evaluate','user','role','org','tenant','logs','packagePage'];
let fail = 0;
pages.forEach(p => {
  try {
    const html = Pages[p]();
    if (typeof html !== 'string' || html.length < 100) throw new Error('empty output');
    console.log('OK', p, html.length);
  } catch (e) { fail++; console.log('FAIL', p, e.message); }
});
DPP.pageParams = { id: 'WO-QB-20241018-005', name: '客服语音识别语料', org: '12345热线中心', type: '音频', stage: '测评中', stag: 'warning', owner: '王芳', progress: 82, priority: '高', ptag: 'error', time: '2024-10-18 11:00' };
console.log('workorderDetail w/params OK:', Pages.workorderDetail().includes('测评中'));
DPP.pageParams = DS_ROWS[2];
console.log('datasetDetail w/params OK:', Pages.datasetDetail().includes('客服语音识别语料'));
process.exit(fail);
