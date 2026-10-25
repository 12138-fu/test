const fs = require('fs');
const src = ['js/app.js','js/pages-part1.js','js/pages-part2.js','js/pages-part3.js','js/pages-part4.js']
  .map(f => fs.readFileSync(f, 'utf8').replace(/^﻿/, '')).join('\n');
global.window = global;
global.localStorage = { getItem: () => null, setItem: () => {} };
global.document = { title: '', getElementById: () => null, querySelector: () => null, querySelectorAll: () => [] };
eval(src);
let pass = 0, fail = 0;
[['workorderModal', 'modal'], ['workorderDetail', 'page']].forEach(([name, kind]) => {
  try {
    if (kind === 'modal') Pages[name]();
    else Pages[name]({ id: 'WO-QB-20241020-001', name: '政务问答语料数据集 v2', org: '政务服务管理局', type: '文本', stage: '标注中', owner: '张明', progress: 68, priority: '高', time: '2024-10-20 09:30', dsrc: ['青阳市政务库-主'] });
    pass++;
  } catch (e) { fail++; console.log('FAIL', name, e.message); }
});
console.log(`pass=${pass} fail=${fail}`);
