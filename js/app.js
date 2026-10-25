/* DPP Platform - Navigation & Layout */
window.DPP = {
  currentPage: 'dashboard',
  currentTenant: { id: 'qb', name: '青阳市运营租户', logo: '青' },
  tenants: [
    { id: 'qb', name: '青阳市运营租户', logo: '青', code: 'T-QB-001', contact: '张启明', phone: '0532-8800 1001', users: 128, datasets: 86, storage: '1.2 TB', status: '运行中', tag: 'success', created: '2023-06-12' },
    { id: 'qyzy', name: '青阳市政务中心', logo: '政', code: 'T-QB-002', contact: '李慧', phone: '0532-8800 1002', users: 56, datasets: 24, storage: '356 GB', status: '运行中', tag: 'success', created: '2023-08-03' },
    { id: 'qyjj', name: '青阳市经开区', logo: '经', code: 'T-QB-003', contact: '王成', phone: '0532-8800 1003', users: 32, datasets: 12, storage: '128 GB', status: '运行中', tag: 'success', created: '2024-01-20' },
    { id: 'qyws', name: '青阳市卫健局', logo: '卫', code: 'T-QB-004', contact: '陈雪', phone: '0532-8800 1004', users: 18, datasets: 6, storage: '64 GB', status: '已停用', tag: 'default', created: '2024-03-15' }
  ],
  sidebarCollapsed: false,

  menuConfig: [
    {
      group: '工作台',
      items: [
        { id: 'dashboard', name: '工作台', icon: 'dashboard' }
      ]
    },
    {
      group: '数据接入',
      items: [
        { id: 'datasource', name: '数据源管理', icon: 'database' },
        { id: 'sync-task', name: '同步任务', icon: 'sync' },
        { id: 'upload', name: '数据上传', icon: 'upload' }
      ]
    },
    {
      group: '数据集管理',
      items: [
        { id: 'workorder', name: '工单管理', icon: 'ticket' },
        { id: 'dataset', name: '数据集列表', icon: 'folder' },
        { id: 'preprocess', name: '预处理任务', icon: 'filter' }
      ]
    },
    {
      group: '标注中心',
      items: [
        { id: 'annotation-task', name: '标注任务', icon: 'edit' },
        { id: 'annotation-work', name: '标注工作台', icon: 'tool' },
        { id: 'quality', name: '质量校验', icon: 'check' }
      ]
    },
    {
      group: '测评与交付',
      items: [
        { id: 'evaluate', name: '数据集测评', icon: 'chart' },
        { id: 'package', name: '封装交付', icon: 'package' }
      ]
    },
    {
      group: '系统管理',
      items: [
        { id: 'user', name: '用户管理', icon: 'user' },
        { id: 'role', name: '角色权限', icon: 'shield' },
        { id: 'org', name: '组织架构', icon: 'org' },
        { id: 'tenant', name: '租户管理', icon: 'tenant' },
        { id: 'menu', name: '菜单管理', icon: 'menu' },
        { id: 'settings', name: '系统设置', icon: 'setting' },
        { id: 'login-logs', name: '登录日志', icon: 'key' },
        { id: 'logs', name: '操作日志', icon: 'log' }
      ]
    }
  ],

  icons: {
    dashboard: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="3" rx="1"/><rect x="9" y="7" width="5" height="7" rx="1"/><rect x="2" y="9" width="5" height="5" rx="1"/></svg>',
    database: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="8" cy="3" rx="5" ry="2"/><path d="M3 3v10c0 1.1 2.24 2 5 2s5-.9 5-2V3"/><path d="M3 8c0 1.1 2.24 2 5 2s5-.9 5-2"/></svg>',
    sync: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 3v3h-3M3 13v-3h3"/><path d="M13 6a5 5 0 00-9-2M3 10a5 5 0 009 2"/></svg>',
    upload: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 12V4M4 8l4-4 4 4"/><path d="M2 12v2h12v-2"/></svg>',
    ticket: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="12" height="8" rx="1"/><path d="M5 4v8M6 4v8M10 4v8M11 4v8"/></svg>',
    folder: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 4a1 1 0 011-1h3l1.5 2H13a1 1 0 011 1v6a1 1 0 01-1 1H3a1 1 0 01-1-1V4z"/></svg>',
    filter: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 3h12L10 8.5V12l-4 2V8.5L2 3z"/></svg>',
    edit: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 2l3 3L5 14H2v-3L11 2z"/></svg>',
    tool: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 6L8 12 4 8l6-6"/><circle cx="11" cy="5" r="2.5"/></svg>',
    check: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 8.5l3 3 7-7"/></svg>',
    chart: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 14h12M4 10V7M7 10V4M10 10V6M13 10V2"/></svg>',
    package: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 1l6 3v8l-6 3-6-3V4l6-3z"/><path d="M2 4l6 3 6-3M8 7v7"/></svg>',
    user: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="5" r="2.5"/><path d="M3 14c.5-2.5 2.5-4 5-4s4.5 1.5 5 4"/></svg>',
    shield: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 2l5 2v4c0 3-2 5-5 6-3-1-5-3-5-6V4l5-2z"/></svg>',
    org: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="6" y="2" width="4" height="3" rx="1"/><rect x="2" y="9" width="4" height="3" rx="1"/><rect x="10" y="9" width="4" height="3" rx="1"/><path d="M8 5v2M5 9V7h6v2"/></svg>',
    log: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="2" width="10" height="12" rx="1"/><path d="M6 6h4M6 9h4M6 12h2"/></svg>',
    plus: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3v10M3 8h10"/></svg>',
    search: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="4.5"/><path d="M11 11l3 3"/></svg>',
    bell: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 13a1.5 1.5 0 001.5-1.5h-3A1.5 1.5 0 008 13z"/><path d="M12 10V7a4 4 0 10-8 0v3L3 11h10L12 10z"/></svg>',
    setting: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="2"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.4 1.4M11.6 11.6L13 13M13 3l-1.4 1.4M4.4 11.6L3 13"/></svg>',
    close: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4l8 8M12 4l-8 8"/></svg>',
    arrow: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 4l4 4-4 4"/></svg>',
    chevronDown: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 6l4 4 4-4"/></svg>',
    tenant: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="2" width="10" height="12" rx="1"/><path d="M6 5h1.5M8.5 5H10M6 8h1.5M8.5 8H10M6 11h1.5M8.5 11H10"/></svg>',
    menu: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 4h12M2 8h12M2 12h7"/><circle cx="12.5" cy="12" r="1.5"/></svg>',
    back: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 4l-4 4 4 4"/></svg>',
    key: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="5" cy="10" r="2.5"/><path d="M7 8L13 2M10.5 4.5L13 7M8.5 6.5L10 8"/></svg>'
  },

  init() {
    this.renderTopnav();
    this.renderSidebar();
    this.renderTenantDropdown();
    this.navigate(this.currentPage);
    this.bindGlobalEvents();
  },

  /* 当前页面所属的一级菜单分组 */
  activeGroup() {
    const navId = this.detailMeta[this.currentPage] ? this.detailMeta[this.currentPage].parent : this.currentPage;
    return this.menuConfig.find(g => g.items.some(i => i.id === navId)) || this.menuConfig[0];
  },

  renderTopnav() {
    const topnav = document.getElementById('topnav');
    if (!topnav) return;
    const active = this.activeGroup();
    topnav.innerHTML = this.menuConfig.map(group => `
      <div class="topnav-item ${group === active ? 'active' : ''}" data-group="${group.group}" onclick="DPP.navigate('${group.items[0].id}')">${group.group}</div>
    `).join('');
  },

  renderTenantDropdown() {
    const dropdown = document.getElementById('tenant-dropdown');
    if (!dropdown) return;
    dropdown.innerHTML = `
      <div class="tenant-dropdown-title">切换租户空间</div>
      ${this.tenants.map(t => `
        <div class="tenant-option ${t.id === this.currentTenant.id ? 'active' : ''}" onclick="DPP.switchTenant('${t.id}')">
          <span class="tenant-logo">${t.logo}</span>
          <div style="flex: 1; min-width: 0;">
            <div style="font-size: 14px; color: var(--dpp-fg);">${t.name}</div>
            <div style="font-size: 12px; color: var(--dpp-muted);">${t.users} 用户 · ${t.datasets} 数据集</div>
          </div>
          ${t.id === this.currentTenant.id ? '<span class="tenant-check">✓</span>' : ''}
        </div>
      `).join('')}
      <div class="tenant-dropdown-footer">
        <a href="javascript:void(0)" onclick="DPP.toggleTenantDropdown();DPP.navigate('tenant')">${this.icon('tenant')} 租户管理</a>
      </div>
    `;
  },

  renderSidebar() {
    const sidebar = document.querySelector('.sidebar-nav');
    const layout = document.querySelector('.app-layout');
    if (!sidebar || !layout) return;
    const group = this.activeGroup();
    // 一级菜单仅一个页面（如工作台）时不展示侧边栏
    if (group.items.length <= 1) {
      layout.classList.add('no-sidebar');
      sidebar.innerHTML = '';
      return;
    }
    layout.classList.remove('no-sidebar');
    const navId = this.detailMeta[this.currentPage] ? this.detailMeta[this.currentPage].parent : this.currentPage;
    let html = `<div class="nav-group-title">${group.group}</div>`;
    group.items.forEach(item => {
      const active = navId === item.id ? 'active' : '';
      html += `
        <div class="nav-item ${active}" data-page="${item.id}" onclick="DPP.navigate('${item.id}')">
          ${this.icons[item.icon] || ''}
          <span class="nav-text">${item.name}</span>
        </div>
      `;
    });
    sidebar.innerHTML = html;
  },

  pageParams: null,

  navigate(pageId, params) {
    this.currentPage = pageId;
    this.pageParams = params || null;
    this.renderTopnav();
    this.renderSidebar();
    const pageEl = document.getElementById('page-content');
    if (pageEl) {
      pageEl.style.opacity = '0';
      pageEl.style.transform = 'translateY(8px)';
      setTimeout(() => {
        this.renderPage(pageId, pageEl);
        this.updateBreadcrumb(pageId);
        pageEl.style.opacity = '1';
        pageEl.style.transform = 'translateY(0)';
      }, 100);
    }
  },

  detailMeta: {
    datasetDetail: { parent: 'dataset', group: '数据集管理', parentName: '数据集列表', name: '数据集详情' },
    workorderDetail: { parent: 'workorder', group: '数据集管理', parentName: '工单管理', name: '工单详情' }
  },

  updateBreadcrumb(pageId) {
    const bc = document.querySelector('.breadcrumb');
    if (!bc) return;
    const detail = this.detailMeta[pageId];
    if (detail) {
      bc.innerHTML = `<a href="javascript:void(0)" onclick="DPP.navigate('dashboard')">首页</a><span class="breadcrumb-separator">/</span><a href="javascript:void(0)" onclick="DPP.navigate('${detail.parent}')">${detail.group} / ${detail.parentName}</a><span class="breadcrumb-separator">/</span><span class="breadcrumb-current">${detail.name}</span>`;
      return;
    }
    let currentName = '工作台';
    let parentName = '';
    this.menuConfig.forEach(group => {
      group.items.forEach(item => {
        if (item.id === pageId) {
          currentName = item.name;
          parentName = group.group;
        }
      });
    });
    if (parentName && parentName !== '工作台') {
      bc.innerHTML = `<a href="javascript:void(0)" onclick="DPP.navigate('dashboard')">首页</a><span class="breadcrumb-separator">/</span><span class="breadcrumb-current">${parentName} / ${currentName}</span>`;
    } else {
      bc.innerHTML = `<span class="breadcrumb-current">${currentName}</span>`;
    }
  },

  renderPage(pageId, container) {
    const renderers = {
      dashboard: Pages.dashboard,
      datasource: Pages.datasource,
      'sync-task': Pages.syncTask,
      upload: Pages.upload,
      workorder: Pages.workorder,
      workorderDetail: Pages.workorderDetail,
      dataset: Pages.dataset,
      datasetDetail: Pages.datasetDetail,
      preprocess: Pages.preprocess,
      'annotation-task': Pages.annotationTask,
      'annotation-work': Pages.annotationWork,
      quality: Pages.quality,
      evaluate: Pages.evaluate,
      package: Pages.packagePage,
      user: Pages.user,
      role: Pages.role,
      org: Pages.org,
      tenant: Pages.tenant,
      menu: Pages.menuManage,
      settings: Pages.settings,
      'login-logs': Pages.loginLogs,
      logs: Pages.logs
    };
    const renderer = renderers[pageId] || Pages.dashboard;
    container.innerHTML = renderer();
    if (Pages[pageId + 'Init']) Pages[pageId + 'Init']();
  },

  switchTenant(tenantId) {
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
      this.renderTenantDropdown();
      // 重新渲染当前页面，使租户视角数据随之刷新
      const pageEl = document.getElementById('page-content');
      if (pageEl) {
        this.renderPage(this.currentPage, pageEl);
        this.updateBreadcrumb(this.currentPage);
      }
      this.toast(`已切换至「${t.name}」`, 'success');
    }
  },
  toggleTenantDropdown() {
    const dropdown = document.getElementById('tenant-dropdown');
    if (dropdown) dropdown.classList.toggle('show');
  },
  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    document.querySelector('.app-layout').classList.toggle('sidebar-collapsed', this.sidebarCollapsed);
  },

  openModal(title, contentHTML, onConfirm, options) {
    const mask = document.getElementById('global-modal');
    if (!mask) return;
    const opts = options || {};
    document.querySelector('#global-modal .modal-title').textContent = title;
    document.querySelector('#global-modal .modal-body').innerHTML = contentHTML;
    const footer = document.querySelector('#global-modal .modal-footer');
    footer.style.display = opts.hideFooter ? 'none' : '';
    const cancelBtn = footer.querySelector('.btn:not(.btn-primary)');
    const confirmBtn = footer.querySelector('.btn-primary');
    cancelBtn.textContent = opts.cancelText || '取消';
    confirmBtn.textContent = opts.confirmText || '确定';
    confirmBtn.classList.toggle('btn-danger-solid', !!opts.danger);
    mask.classList.add('show');
    confirmBtn.onclick = () => {
      if (onConfirm) onConfirm();
      this.closeModal();
    };
  },

  confirm(title, message, onConfirm, options) {
    const opts = options || {};
    const content = `
      <div class="od-row-top" style="gap: 12px;">
        <div class="confirm-icon ${opts.danger ? 'danger' : ''}">${opts.danger ? '!' : '?'}</div>
        <div style="flex: 1; min-width: 0;">
          <div style="font-size: 14px; color: var(--dpp-fg); line-height: 1.6;">${message}</div>
          ${opts.hint ? `<div style="font-size: 13px; color: var(--dpp-muted); margin-top: 6px;">${opts.hint}</div>` : ''}
        </div>
      </div>
    `;
    this.openModal(title, content, onConfirm, {
      confirmText: opts.confirmText || '确定',
      danger: opts.danger
    });
  },

  toast(message, type) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    const el = document.createElement('div');
    el.className = `toast toast-${type || 'success'}`;
    el.innerHTML = `<span class="toast-dot"></span><span>${message}</span>`;
    container.appendChild(el);
    setTimeout(() => el.classList.add('show'), 10);
    setTimeout(() => {
      el.classList.remove('show');
      setTimeout(() => el.remove(), 300);
    }, 2600);
  },

  closeModal() {
    document.getElementById('global-modal').classList.remove('show');
  },

  bindGlobalEvents() {
    document.getElementById('global-modal')?.addEventListener('click', e => {
      if (e.target.classList.contains('modal-mask')) this.closeModal();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.closeModal();
    });
    document.addEventListener('click', e => {
      const dropdown = document.getElementById('tenant-dropdown');
      const trigger = document.getElementById('tenant-trigger');
      if (dropdown && dropdown.classList.contains('show') &&
          !dropdown.contains(e.target) && !(trigger && trigger.contains(e.target))) {
        dropdown.classList.remove('show');
      }
    });
  },

  icon(name) { return this.icons[name] || ''; }
};



