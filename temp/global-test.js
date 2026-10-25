// Simulate browser global scope
global.window = global;

// Load scripts in order
const fs = require('fs');
eval(fs.readFileSync('js/app.js', 'utf8'));
eval(fs.readFileSync('js/pages-part1.js', 'utf8'));
eval(fs.readFileSync('js/pages-part2.js', 'utf8'));
eval(fs.readFileSync('js/pages-part3.js', 'utf8'));

console.log('DPP global:', typeof DPP);
console.log('Pages global:', typeof Pages);
console.log('DPP.navigate:', typeof DPP.navigate);
console.log('Pages.dashboard:', typeof Pages.dashboard);
console.log('Pages.datasource:', typeof Pages.datasource);
