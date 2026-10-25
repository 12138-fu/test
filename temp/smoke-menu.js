const fs = require('fs');
global.window = global;
global.document = { addEventListener(){}, querySelector(){return null}, getElementById(){return null}, querySelectorAll(){return []}, title:'' };
global.localStorage = { getItem(){return null}, setItem(){} };
global.history = { pushState(){} };
global.location = { hash:'' };
const src = ['js/app.js','js/pages-part1.js','js/pages-part2.js','js/pages-part3.js','js/pages-part4.js']
  .map(f => fs.readFileSync(f, 'utf8')).join('\n');
eval(src + `
const html = Pages.menuManage();
if (!html.includes('目录')) throw new Error('menu page missing 目录');
if (html.includes('命令')) throw new Error('残留 命令');
Pages.menuModal();
Pages.menuModal('m-access');
console.log('MENU_OK');`);
