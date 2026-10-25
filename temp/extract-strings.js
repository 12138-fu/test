const fs = require('fs');
const path = process.argv[2];
let data = fs.readFileSync(path, 'utf8');
// decode unicode escapes globally (safe enough for analysis)
data = data.replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
const m = data.match(/[\u4e00-\u9fff][\u4e00-\u9fffA-Za-z0-9]{1,14}/g) || [];
const cnt = {};
m.forEach(s => { cnt[s] = (cnt[s] || 0) + 1; });
const out = Object.entries(cnt).sort((a, b) => b[1] - a[1]).slice(0, 160).map(([s, c]) => c + ' ' + s).join('\n');
console.log('matches:', m.length);
console.log(out);
