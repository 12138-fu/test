const fs=require('fs'); var Pages={}; 
try { eval(fs.readFileSync('js/pages-part2.js','utf8')); console.log('p2 OK:', Object.keys(Pages).length); } 
catch(e) { console.log('p2 ERR:', e.message); }
try { eval(fs.readFileSync('js/pages-part3.js','utf8')); console.log('p3 OK, total:', Object.keys(Pages).length); } 
catch(e) { console.log('p3 ERR:', e.message); }
