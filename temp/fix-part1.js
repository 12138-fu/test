const fs = require('fs');
let p1 = fs.readFileSync('js/pages-part1.js', 'utf8');

// Replace "const Pages = {" with "Pages = (typeof Pages !== 'undefined') ? Pages : {};"
// and convert method shorthand to Pages.xxx = function()
// The pattern is: methodName() { ... }, 

// First, remove the const declaration and opening brace
p1 = p1.replace(/^const Pages = \{\s*\n/, '');

// Remove the closing }; at the end
p1 = p1.replace(/\n\};\s*$/, '\n');

// Now convert each "  methodName() {" to "Pages.methodName = function() {"
p1 = p1.replace(/^  (\w+)\(\) \{/gm, 'Pages.$1 = function() {');

// Also fix the "  },\n" separators - remove trailing commas after closing braces
p1 = p1.replace(/^\  \},\n/gm, '}\n');

// Add the Pages guard at the top
p1 = "var Pages = (typeof Pages !== 'undefined') ? Pages : {};\n\n" + p1;

fs.writeFileSync('js/pages-part1.js', p1, 'utf8');
console.log('Part1 converted. Size:', fs.statSync('js/pages-part1.js').size);

// Verify
const check = fs.readFileSync('js/pages-part1.js', 'utf8');
const fns = check.match(/Pages\.(\w+)\s*=\s*function/g) || [];
console.log('Functions found:', fns.length);
fns.forEach(f => console.log('  ' + f));
