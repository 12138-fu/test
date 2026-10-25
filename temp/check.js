const fs = require('fs');
const menuItems = ['dashboard','datasource','sync-task','upload','workorder','dataset','preprocess','annotation-task','annotation-work','quality','evaluate','package','user','role','org','logs'];
const p1 = fs.readFileSync('js/pages-part1.js','utf8');
const p2 = fs.readFileSync('js/pages-part2.js','utf8');
const p3 = fs.readFileSync('js/pages-part3.js','utf8');
const all = p1 + p2 + p3;
const appJS = fs.readFileSync('js/app.js','utf8');

console.log('=== Page Render Check ===');
let missing = [];
menuItems.forEach(id => {
  // Check navigate function maps to Pages[id.replace(/-/g, ...)]
  let fnId = id.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  // Special cases
  if (id === 'package') fnId = 'packagePage';
  if (id === 'sync-task') fnId = 'syncTask';
  if (id === 'annotation-task') fnId = 'annotationTask';
  if (id === 'annotation-work') fnId = 'annotationWork';
  
  const has = all.includes('Pages.' + fnId);
  console.log(id + ' -> Pages.' + fnId + ': ' + (has ? 'OK' : 'MISSING'));
  if (!has) missing.push(id);
});

console.log('\nMissing: ' + missing.length);
console.log('Total page functions: ' + (all.match(/Pages\.\w+\s*=\s*function/g) || []).length);
