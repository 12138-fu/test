const fs = require('fs');

// ============================================================
// 1. Add multi-tenant dropdown to header (add to app.js renderSidebar or header)
// Actually, add tenant switcher to the sidebar logo area and top header
// ============================================================

// Read current app.js
let appJS = fs.readFileSync('js/app.js', 'utf8');

// Add tenant-related config to DPP
appJS = appJS.replace(/currentPage: 'dashboard',/, `currentPage: 'dashboard',
  currentTenant: { id: 'qb', name: '青阳市运营租户', logo: '青' },
  tenants: [
    { id: 'qb', name: '青阳市运营租户', logo: '青' },
    { id: 'qyzy', name: '青阳市政务中心', logo: '政' },
    { id: 'qyjj', name: '青阳市经开区', logo: '经' },
    { id: 'qyws', name: '青阳市卫健局', logo: '卫' }
  ],`);

// Add tenant switch method
appJS = appJS.replace(/toggleSidebar\(\) \{/, `switchTenant(tenantId) {
    const t = this.tenants.find(x => x.id === tenantId);
    if (t) {
      this.currentTenant = t;
      const dropdown = document.getElementById('tenant-dropdown');
      if (dropdown) dropdown.classList.remove('show');
      // Update header display
      const tenantName = document.getElementById('current-tenant-name');
      const tenantLogo = document.getElementById('current-tenant-logo');
      if (tenantName) tenantName.textContent = t.name;
      if (tenantLogo) tenantLogo.textContent = t.logo;
    }
  },
  toggleTenantDropdown() {
    const dropdown = document.getElementById('tenant-dropdown');
    if (dropdown) dropdown.classList.toggle('show');
  },
  toggleSidebar() {`);

// Update renderSidebar to show tenant info at top
// Actually let's put tenant in header instead. Let's add a renderHeader method.
// Better: modify the HTML structure to include tenant selector in header.

fs.writeFileSync('js/app.js', appJS, 'utf8');
console.log('app.js updated with tenant support');
console.log('Size:', fs.statSync('js/app.js').size);
