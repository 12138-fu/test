const fs = require('fs');
const path = require('path');
const files = ['js/app.js','js/pages-part1.js','js/pages-part2.js','js/pages-part3.js','js/pages-part4.js'];
let src = files.map(f => fs.readFileSync(path.join(__dirname, '..', f), 'utf8').replace(/^﻿/, '')).join('\n;\n');

// minimal DOM/browser stubs
const elStub = () => ({
  innerHTML: '', textContent: '', style: {}, dataset: { search: '' }, value: '',
  classList: { add(){}, remove(){}, toggle(){ return true; }, contains(){ return false; } },
  addEventListener(){}, removeEventListener(){}, appendChild(){}, querySelector(){ return null; },
  querySelectorAll(){ return []; }, contains(){ return false; }, focus(){}, click(){}
});
global.window = global;
global.document = {
  getElementById(){ return null; }, querySelector(){ return null; }, querySelectorAll(){ return []; },
  addEventListener(){}, removeEventListener(){}, createElement: elStub, body: elStub(), documentElement: elStub()
};
global.localStorage = { getItem(){ return null; }, setItem(){}, removeItem(){} };
global.location = { hash: '' };
global.setTimeout = global.setTimeout;

eval(src);

let pass = 0, fail = 0;
function t(name, fn) {
  try { const r = fn(); if (r === false) throw new Error('assert failed'); pass++; }
  catch (e) { fail++; console.log('FAIL ' + name + ': ' + e.message); }
}

// 弹窗构建
let captured = null;
DPP.openModal = function(title, body, onOk, opts) { captured = { title, body, opts }; };
t('workorderModal 构建', () => {
  Pages.workorderModal();
  return captured.body.includes('id="woDsrc"')
      && captured.body.includes('wo-dsrc-drop')
      && captured.body.includes('oninput="Pages.filterDsrcOptions(this.value)"')
      && captured.body.includes('onchange="Pages.syncDsrcText()"')
      && (captured.body.match(/wo-dsrc-option/g) || []).length === 9
      && captured.body.includes('青阳市政务库-主')
      && captured.body.includes('气象数据接口');
});
t('未连接数据源禁选', () => {
  const m = captured.body.match(/达梦历史库[\s\S]{0,400}/);
  return m && m[0].includes('disabled') && m[0].includes('cursor: not-allowed');
});
t('交互函数已定义', () =>
  typeof Pages.toggleDsrcDropdown === 'function' &&
  typeof Pages.filterDsrcOptions === 'function' &&
  typeof Pages.syncDsrcText === 'function');
t('无残留箭头元素', () => !captured.body.includes('wo-dsrc-arrow'));

// 全页面渲染
['dashboard','datasource','syncTask','upload','workorder','dataset','datasetDetail','workorderDetail',
 'preprocess','annotationTask','annotationWork','quality','evaluate','user','role','org','logs','loginLogs',
 'packagePage','tenant','settings','menuManage'].forEach(p => {
  t('Pages.' + p, () => typeof Pages[p] === 'function' && Pages[p]().length > 100);
});

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
