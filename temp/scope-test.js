global.window = global;
eval('window.DPP = { init: function() { console.log("init called"); } };');
console.log('window.DPP:', typeof window.DPP);
console.log('DPP:', typeof DPP);
console.log('global.DPP:', typeof global.DPP);
