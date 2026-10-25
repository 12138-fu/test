var Pages = (typeof Pages !== 'undefined') ? Pages : {};

﻿/* DPP Pages - Part 1: Dashboard, DataSource, SyncTask, Upload, Workorder, Dataset, Preprocess */

/* 工单数据（工作台与工单管理共用，详情页从此取数） */
var WO_ROWS = [
  { id: 'WO-QB-20241020-001', name: '政务问答语料数据集 v2', org: '政务服务管理局', type: '文本', stage: '标注中', owner: '张明', progress: 68, priority: '高', ptag: 'error', stag: 'primary', time: '2024-10-20 09:30', dsrc: ['青阳市政务库-主'] },
  { id: 'WO-QB-20241019-003', name: '工业质检图像数据集', org: '经开区管委会', type: '图像', stage: '预处理', owner: '李伟', progress: 45, priority: '中', ptag: 'warning', stag: 'info', time: '2024-10-19 14:20', dsrc: ['企业数据汇聚库', '对象存储桶'] },
  { id: 'WO-QB-20241018-005', name: '客服语音识别语料', org: '12345热线中心', type: '音频', stage: '测评中', owner: '王芳', progress: 82, priority: '高', ptag: 'error', stag: 'warning', time: '2024-10-18 11:00', dsrc: ['实时消息队列'] },
  { id: 'WO-QB-20241017-002', name: '道路场景视频标注', org: '交通运输局', type: '视频', stage: '已交付', owner: '赵强', progress: 100, priority: '中', ptag: 'warning', stag: 'success', time: '2024-10-17 16:45', dsrc: ['对象存储桶'] },
  { id: 'WO-QB-20241016-004', name: '医疗影像分割数据集', org: '卫健局', type: '图像', stage: '待受理', owner: '-', progress: 5, priority: '低', ptag: 'default', stag: 'default', time: '2024-10-16 10:15', dsrc: ['PostgreSQL分析库'] },
  { id: 'WO-QB-20241015-001', name: '政策法规结构化数据', org: '司法局', type: '文本', stage: '封装中', owner: '陈静', progress: 90, priority: '中', ptag: 'warning', stag: 'info', time: '2024-10-15 09:00', dsrc: ['青阳市政务库-主', '气象数据接口'] },
  { id: 'WO-QB-20241014-006', name: '交通出行OD数据集', org: '交通运输局', type: '结构化', stage: '已完成', owner: '刘洋', progress: 100, priority: '低', ptag: 'default', stag: 'success', time: '2024-10-14 13:30', dsrc: ['PostgreSQL分析库', 'RocketMQ业务队列'] }
];

Pages.openWorkorderDetail = function(id) {
  const row = WO_ROWS.find(r => r.id === id) || WO_ROWS[0];
  DPP.navigate('workorderDetail', row);
};

Pages.workorderModal = function() {
  DPP.openModal('新建工单', `
    <div class="form-item">
      <label class="form-label required">数据集名称</label>
      <input type="text" class="form-input" placeholder="请输入数据集名称">
    </div>
    <div class="form-item">
      <label class="form-label">关联数据源</label>
      <div class="wo-dsrc" id="woDsrc">
        <div class="form-select wo-dsrc-trigger" onclick="Pages.toggleDsrcDropdown(event)">
          <span class="wo-dsrc-text" id="woDsrcText">请选择数据源（可多选）</span>
        </div>
        <div class="wo-dsrc-drop" id="woDsrcDrop">
          <div class="wo-dsrc-search">
            <input type="text" class="form-input" placeholder="搜索名称 / 类型" oninput="Pages.filterDsrcOptions(this.value)">
          </div>
          <div class="wo-dsrc-list" id="woDsrcList">
            ${DSRC_ROWS.map(r => `
              <label class="checkbox wo-dsrc-option" data-search="${r.name} ${r.type}" style="display: flex; align-items: center; padding: 7px 0;${r.status !== '已连接' ? ' opacity: .5; cursor: not-allowed;' : ''}">
                <input type="checkbox" value="${r.name}"${r.status !== '已连接' ? ' disabled' : ''} onchange="Pages.syncDsrcText()"><span class="checkbox-box"></span>
                <span style="flex: 1;">${r.name}</span>
                <span class="tag tag-info" style="margin-left: 8px;">${r.type}</span>
                <span class="tag ${r.tag}" style="margin-left: 8px;">${r.status}</span>
              </label>`).join('')}
            <div class="wo-dsrc-empty" id="woDsrcEmpty" style="display: none;">无匹配的数据源</div>
          </div>
        </div>
      </div>
      <div style="font-size: 12px; color: var(--dpp-muted); margin-top: 6px;">选填：从已接入的数据源中选择，作为本工单的数据接入范围；未连接的数据源不可选</div>
    </div>
    <div class="form-row">
      <div class="form-item">
        <label class="form-label required">需求机构</label>
        <select class="form-select">
          <option>青阳市大数据中心</option>
          <option>政务服务管理局</option>
          <option>交通运输局</option>
          <option>卫健局</option>
          <option>司法局</option>
        </select>
      </div>
      <div class="form-item">
        <label class="form-label required">数据类型</label>
        <select class="form-select">
          <option>文本</option><option>图像</option><option>音频</option>
          <option>视频</option><option>结构化</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-item">
        <label class="form-label required">优先级</label>
        <select class="form-select">
          <option>高</option><option selected>中</option><option>低</option>
        </select>
      </div>
      <div class="form-item">
        <label class="form-label required">期望交付日期</label>
        <input type="date" class="form-input">
      </div>
    </div>
    <div class="form-item" style="margin-bottom: 0;">
      <label class="form-label">需求说明</label>
      <textarea class="form-textarea" placeholder="请描述加工需求、样本规模与质量要求"></textarea>
    </div>
  `, () => DPP.toast('工单创建成功，已进入待受理队列', 'success'), { confirmText: '创建' });
};

/* 关联数据源：可搜索多选下拉 */
Pages.toggleDsrcDropdown = function(e) {
  e.stopPropagation();
  const drop = document.getElementById('woDsrcDrop');
  const box = document.getElementById('woDsrc');
  if (!drop || !box) return;
  drop.classList.toggle('show');
  if (!drop.classList.contains('show')) return;
  const input = drop.querySelector('.wo-dsrc-search input');
  if (input) setTimeout(() => input.focus(), 0);
  const closer = function(ev) {
    if (!box.contains(ev.target)) {
      drop.classList.remove('show');
      document.removeEventListener('click', closer);
    }
  };
  document.addEventListener('click', closer);
};

Pages.filterDsrcOptions = function(kw) {
  const list = document.getElementById('woDsrcList');
  if (!list) return;
  const k = (kw || '').trim().toLowerCase();
  let visible = 0;
  list.querySelectorAll('.wo-dsrc-option').forEach(item => {
    const hit = !k || (item.dataset.search || '').toLowerCase().includes(k);
    item.style.display = hit ? '' : 'none';
    if (hit) visible++;
  });
  const empty = document.getElementById('woDsrcEmpty');
  if (empty) empty.style.display = visible ? 'none' : '';
};

Pages.syncDsrcText = function() {
  const list = document.getElementById('woDsrcList');
  const text = document.getElementById('woDsrcText');
  if (!list || !text) return;
  const names = Array.from(list.querySelectorAll('input:checked')).map(i => i.value);
  if (names.length) {
    text.textContent = names.join('、');
    text.classList.add('has-value');
  } else {
    text.textContent = '请选择数据源（可多选）';
    text.classList.remove('has-value');
  }
};

  /* ========== Dashboard ========== */
Pages.dashboard = function() {
    return `
    <div class="page-header">
      <div>
        <div class="page-title">工作台</div>
        <div class="page-subtitle">欢迎使用数据集加工平台，以下是今日数据概览</div>
      </div>
      <div class="page-actions">
        <button class="btn" onclick="Pages.workorderModal()">${DPP.icon('plus')} 新建工单</button>
        <button class="btn btn-primary" onclick="DPP.navigate('upload')">${DPP.icon('upload')} 上传数据</button>
      </div>
    </div>

    <div class="stat-grid">
      <div class="stat-card">
        <div class="od-row" style="justify-content:space-between;">
          <div>
            <div class="stat-label">数据集总数</div>
            <div class="stat-value">128</div>
          </div>
          <div class="stat-icon blue">${DPP.icon('folder')}</div>
        </div>
        <div class="stat-trend up">↑ 12.5% 较上月</div>
      </div>
      <div class="stat-card">
        <div class="od-row" style="justify-content:space-between;">
          <div>
            <div class="stat-label">进行中工单</div>
            <div class="stat-value">36</div>
          </div>
          <div class="stat-icon green">${DPP.icon('ticket')}</div>
        </div>
        <div class="stat-trend up">↑ 8 新增</div>
      </div>
      <div class="stat-card">
        <div class="od-row" style="justify-content:space-between;">
          <div>
            <div class="stat-label">待标注样本</div>
            <div class="stat-value">12,486</div>
          </div>
          <div class="stat-icon orange">${DPP.icon('edit')}</div>
        </div>
        <div class="stat-trend down">↓ 3.2% 较上周</div>
      </div>
      <div class="stat-card">
        <div class="od-row" style="justify-content:space-between;">
          <div>
            <div class="stat-label">已交付封装</div>
            <div class="stat-value">54</div>
          </div>
          <div class="stat-icon purple">${DPP.icon('package')}</div>
        </div>
        <div class="stat-trend up">↑ 15 本月</div>
      </div>
    </div>

    <div style="display:grid; grid-template-columns: 2fr 1fr; gap: 16px; margin-bottom: 24px;">
      <div class="card">
        <div class="card-header">
          <div class="card-title">数据处理趋势</div>
          <div style="display:flex; gap: 8px;">
            <span class="tag tag-primary">近7天</span>
          </div>
        </div>
        <div class="card-body">
          <div class="chart-area">
            ${[65, 78, 52, 91, 84, 110, 95].map((v, i) => `
              <div class="chart-bar" style="height: ${v}%;">
                <div class="chart-bar-value">${v}%</div>
                <div class="chart-bar-label">周${'一二三四五六日'[i]}</div>
              </div>
            `).join('')}
          </div>
          <div style="height: 40px;"></div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">工单流程进度</div>
        </div>
        <div class="card-body">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            ${[
              { name: '数据接入', value: 85, color: 'success' },
              { name: '预处理', value: 62, color: '' },
              { name: '标注作业', value: 43, color: '' },
              { name: '质量测评', value: 28, color: 'warning' },
              { name: '封装交付', value: 15, color: '' }
            ].map(item => `
              <div>
                <div class="od-row" style="justify-content: space-between; margin-bottom: 6px;">
                  <span style="font-size: 13px;">${item.name}</span>
                  <span style="font-size: 13px; font-weight: 500;">${item.value}%</span>
                </div>
                <div class="progress"><div class="progress-bar ${item.color}" style="width: ${item.value}%;"></div></div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">最近工单</div>
        <a href="javascript:void(0)" onclick="DPP.navigate('workorder')" style="font-size: 13px;">查看全部</a>
      </div>
      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th>工单号</th>
              <th>数据集名称</th>
              <th>类型</th>
              <th>当前阶段</th>
              <th>负责人</th>
              <th>进度</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            ${WO_ROWS.slice(0, 5).map(row => `
              <tr>
                <td><a href="javascript:void(0)" onclick="Pages.openWorkorderDetail('${row.id}')">${row.id}</a></td>
                <td>${row.name}</td>
                <td>${row.type}</td>
                <td><span class="tag tag-${row.stag}">${row.stage}</span></td>
                <td>${row.owner}</td>
                <td style="width: 120px;">
                  <div class="od-row" style="gap: 8px;">
                    <div class="progress" style="flex:1;"><div class="progress-bar" style="width:${row.progress}%;"></div></div>
                    <span style="font-size:12px; color: var(--dpp-muted); width: 36px;">${row.progress}%</span>
                  </div>
                </td>
                <td style="color: var(--dpp-muted); font-size: 13px;">${row.time}</td>
                <td>
                  <button class="btn btn-text btn-sm" onclick="Pages.openWorkorderDetail('${row.id}')">详情</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
    `;
}

  /* ========== DataSource ========== */
var DSRC_ROWS = [
  { name: '青阳市政务库-主', type: 'MySQL', conn: '数据库直连', host: '10.10.1.101', port: '3306', db: 'qb_gov_main', status: '已连接', tag: 'success', time: '2024-09-15 10:00', auth: '账号密码' },
  { name: '企业数据汇聚库', type: 'Oracle', conn: '数据库直连', host: '10.10.2.200', port: '1521', db: 'ENTERPRISE', status: '已连接', tag: 'success', time: '2024-09-16 14:30', auth: '账号密码' },
  { name: '实时消息队列', type: 'Kafka', conn: '消息队列', host: '10.10.3.50', port: '9092', db: '3个Topic', status: '已连接', tag: 'success', time: '2024-09-18 09:15', auth: 'SASL 认证（可选）' },
  { name: '对象存储桶', type: 'S3', conn: '对象存储', host: 'oss.qb.local', port: '9000', db: 'dpp-source', status: '已连接', tag: 'success', time: '2024-09-20 11:20', auth: '密钥对' },
  { name: '达梦历史库', type: '达梦', conn: '数据库直连', host: '10.10.4.10', port: '5236', db: 'HISTORY', status: '连接失败', tag: 'error', time: '2024-09-22 16:00', auth: '账号密码' },
  { name: 'FTP文件服务器', type: 'FTP', conn: '文件传输', host: '10.10.5.30', port: '21', db: '/data/import', status: '未测试', tag: 'default', time: '2024-10-08 08:30', auth: '账号密码' },
  { name: 'PostgreSQL分析库', type: 'PostgreSQL', conn: '数据库直连', host: '10.10.1.120', port: '5432', db: 'analytics', status: '已连接', tag: 'success', time: '2024-10-10 13:45', auth: '账号密码' },
  { name: 'RocketMQ业务队列', type: 'RocketMQ', conn: '消息队列', host: '10.10.3.60', port: '9876', db: '5个Topic', status: '已连接', tag: 'success', time: '2024-10-12 10:10', auth: 'SASL 认证（可选）' },
  { name: '气象数据接口', type: 'HTTP API', conn: 'API 接口', host: 'api.qb.gov.cn', port: '443', db: '/v2/weather', status: '已连接', tag: 'success', time: '2024-10-15 09:40', auth: 'Token' }
];

/* 类型 → 接入方式 / 认证模式 映射（新增、编辑弹窗与筛选共用） */
var DSRC_TYPE_MAP = {
  'MySQL':      { conn: '数据库直连', mode: 'password' },
  'Oracle':     { conn: '数据库直连', mode: 'password' },
  'PostgreSQL': { conn: '数据库直连', mode: 'password' },
  '达梦':       { conn: '数据库直连', mode: 'password' },
  'Kafka':      { conn: '消息队列',   mode: 'optional' },
  'RocketMQ':   { conn: '消息队列',   mode: 'optional' },
  'S3':         { conn: '对象存储',   mode: 'key' },
  'FTP':        { conn: '文件传输',   mode: 'password' },
  'HTTP API':   { conn: 'API 接口',   mode: 'token' }
};

Pages.datasourceRowHtml = function(row) {
  return `
    <tr>
      <td><label class="checkbox"><input type="checkbox"><span class="checkbox-box"></span></label></td>
      <td class="font-medium">${row.name}</td>
      <td><span class="tag tag-default">${row.conn}</span></td>
      <td>
        <span class="tag tag-info">${row.type}</span>
        <div style="font-size: 12px; color: var(--dpp-muted); margin-top: 4px;">${row.auth}</div>
      </td>
      <td style="font-family: monospace; font-size: 13px;">${row.host}</td>
      <td>${row.port}</td>
      <td>${row.db}</td>
      <td><span class="tag tag-${row.tag}">${row.status}</span></td>
      <td style="color: var(--dpp-muted); font-size: 13px;">${row.time}</td>
      <td>
        <button class="btn btn-text btn-sm" onclick="Pages.datasourceModal('${row.name}', '${row.type}', '${row.host}', '${row.port}')">编辑</button>
        <button class="btn btn-text btn-sm" onclick="DPP.toast('「${row.name}」连接测试通过', 'success')">测试</button>
        <button class="btn btn-text btn-sm" style="color: var(--dpp-error);" onclick="DPP.confirm('删除数据源', '确定删除数据源「${row.name}」吗？', () => DPP.toast('数据源已删除', 'success'), { danger: true, confirmText: '删除', hint: '删除后引用该数据源的同步任务将暂停运行。' })">删除</button>
      </td>
    </tr>`;
};

Pages.datasourceFilter = function() {
  const conn = document.getElementById('ds-filter-conn').value;
  const kw = document.getElementById('ds-filter-name').value.trim();
  const status = document.getElementById('ds-filter-status').value;
  const list = DSRC_ROWS.filter(r =>
    (conn === '全部方式' || r.conn === conn) &&
    (!kw || r.name.indexOf(kw) !== -1) &&
    (status === '全部状态' || r.status === status)
  );
  const tbody = document.getElementById('ds-tbody');
  if (tbody) {
    tbody.innerHTML = list.length
      ? list.map(Pages.datasourceRowHtml).join('')
      : '<tr><td colspan="10" style="text-align: center; padding: 40px; color: var(--dpp-muted);">暂无符合条件的数据源</td></tr>';
  }
  const count = document.getElementById('ds-count');
  if (count) count.textContent = '共 ' + list.length + ' 条';
};

Pages.datasourceReset = function() {
  document.getElementById('ds-filter-conn').value = '全部方式';
  document.getElementById('ds-filter-name').value = '';
  document.getElementById('ds-filter-status').value = '全部状态';
  Pages.datasourceFilter();
};

Pages.datasource = function() {
    return `
    <div class="page-header">
      <div>
        <div class="page-title">数据源管理</div>
        <div class="page-subtitle">管理数据接入的源端和目标端数据源配置</div>
      </div>
      <div class="page-actions">
        <button class="btn" onclick="DPP.toast('正在批量测试连接…', 'info')">${DPP.icon('sync')} 测试连接</button>
        <button class="btn btn-primary" onclick="Pages.datasourceModal()">${DPP.icon('plus')} 新增数据源</button>
      </div>
    </div>

    <div class="card">
      <div class="filter-bar" style="padding-top: 20px;">
        <div class="filter-item">
          <div class="filter-label">接入方式</div>
          <select class="form-select" id="ds-filter-conn" onchange="Pages.datasourceFilter()">
            <option>全部方式</option>
            <option>数据库直连</option>
            <option>消息队列</option>
            <option>对象存储</option>
            <option>文件传输</option>
            <option>API 接口</option>
          </select>
        </div>
        <div class="filter-item">
          <div class="filter-label">数据源名称</div>
          <input type="text" class="form-input" id="ds-filter-name" placeholder="请输入数据源名称" oninput="Pages.datasourceFilter()">
        </div>
        <div class="filter-item">
          <div class="filter-label">状态</div>
          <select class="form-select" id="ds-filter-status" onchange="Pages.datasourceFilter()">
            <option>全部状态</option>
            <option>已连接</option>
            <option>连接失败</option>
            <option>未测试</option>
          </select>
        </div>
        <div class="filter-actions">
          <button class="btn" onclick="Pages.datasourceReset()">重置</button>
          <button class="btn btn-primary" onclick="Pages.datasourceFilter()">查询</button>
        </div>
      </div>

      <div class="table-wrap" style="margin-top: 16px;">
        <table class="table">
          <thead>
            <tr>
              <th style="width: 40px;"><label class="checkbox"><input type="checkbox"><span class="checkbox-box"></span></label></th>
              <th>数据源名称</th>
              <th>接入方式</th>
              <th>类型 / 认证</th>
              <th>主机地址</th>
              <th>端口</th>
              <th>数据库/主题</th>
              <th>连接状态</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody id="ds-tbody">
            ${DSRC_ROWS.map(Pages.datasourceRowHtml).join('')}
          </tbody>
        </table>
      </div>

      <div class="pagination">
        <span class="pagination-info" id="ds-count">共 ${DSRC_ROWS.length} 条</span>
        <button class="page-btn" disabled>‹</button>
        <button class="page-btn active">1</button>
        <button class="page-btn">2</button>
        <button class="page-btn">3</button>
        <button class="page-btn">4</button>
        <button class="page-btn">›</button>
        <select class="form-select" style="width: 100px; height: 32px; margin-left: 8px;">
          <option>10 条/页</option>
          <option>20 条/页</option>
          <option>50 条/页</option>
        </select>
      </div>
    </div>
    `;
}

Pages.datasourceTypeChange = function(sel) {
  const meta = DSRC_TYPE_MAP[sel.value] || { conn: '数据库直连', mode: 'password' };
  const connInput = document.getElementById('ds-conn-display');
  if (connInput) connInput.value = meta.conn;
  const blocks = { password: 'ds-auth-password', key: 'ds-auth-key', token: 'ds-auth-token' };
  Object.keys(blocks).forEach(mode => {
    const el = document.getElementById(blocks[mode]);
    if (el) el.style.display = (mode === meta.mode || (meta.mode === 'optional' && mode === 'password')) ? '' : 'none';
  });
  const userLabel = document.getElementById('ds-auth-user-label');
  const passLabel = document.getElementById('ds-auth-pass-label');
  const hint = document.getElementById('ds-auth-hint');
  if (userLabel) userLabel.classList.toggle('required', meta.mode !== 'optional');
  if (passLabel) passLabel.classList.toggle('required', meta.mode !== 'optional');
  if (hint) {
    hint.textContent = meta.mode === 'optional'
      ? '消息队列集群未启用 SASL 认证时可留空'
      : '该类型数据源需要输入账号密码，密码将加密存储';
  }
};

Pages.datasourceModal = function(name, type, host, port) {
  const isEdit = !!name;
  DPP.openModal(isEdit ? '编辑数据源' : '新增数据源', `
    <div class="form-item">
      <label class="form-label required">数据源名称</label>
      <input type="text" class="form-input" placeholder="请输入数据源名称" value="${name || ''}">
    </div>
    <div class="form-row">
      <div class="form-item">
        <label class="form-label required">数据源类型</label>
        <select class="form-select" onchange="Pages.datasourceTypeChange(this)">
          ${Object.keys(DSRC_TYPE_MAP).map(t => `<option ${t === type ? 'selected' : ''}>${t}</option>`).join('')}
        </select>
      </div>
      <div class="form-item">
        <label class="form-label">接入方式</label>
        <input type="text" class="form-input" id="ds-conn-display" value="${(DSRC_TYPE_MAP[type] || DSRC_TYPE_MAP['MySQL']).conn}" disabled>
      </div>
    </div>
    <div class="form-row">
      <div class="form-item">
        <label class="form-label required">主机地址</label>
        <input type="text" class="form-input" placeholder="例如 10.10.1.101" value="${host || ''}">
      </div>
      <div class="form-item">
        <label class="form-label required">端口</label>
        <input type="text" class="form-input" placeholder="例如 3306" value="${port || ''}">
      </div>
    </div>
    <div class="form-item">
      <label class="form-label">数据库 / 主题</label>
      <input type="text" class="form-input" placeholder="请输入数据库名或 Topic">
    </div>

    <div id="ds-auth-password">
      <div class="form-row" style="margin-bottom: 0;">
        <div class="form-item">
          <label class="form-label required" id="ds-auth-user-label">用户名</label>
          <input type="text" class="form-input" placeholder="请输入用户名">
        </div>
        <div class="form-item">
          <label class="form-label required" id="ds-auth-pass-label">密码</label>
          <input type="password" class="form-input" placeholder="请输入密码">
        </div>
      </div>
      <div id="ds-auth-hint" style="font-size: 12px; color: var(--dpp-muted); margin-top: 8px;">该类型数据源需要输入账号密码，密码将加密存储</div>
    </div>
    <div id="ds-auth-key" style="display: none;">
      <div class="form-row" style="margin-bottom: 0;">
        <div class="form-item">
          <label class="form-label required">AccessKey ID</label>
          <input type="text" class="form-input" placeholder="请输入 AccessKey ID">
        </div>
        <div class="form-item">
          <label class="form-label required">Secret AccessKey</label>
          <input type="password" class="form-input" placeholder="请输入 Secret AccessKey">
        </div>
      </div>
      <div style="font-size: 12px; color: var(--dpp-muted); margin-top: 8px;">对象存储使用密钥对认证，Secret 将加密存储</div>
    </div>
    <div id="ds-auth-token" class="form-item" style="display: none; margin-bottom: 0;">
      <label class="form-label required">访问 Token</label>
      <input type="password" class="form-input" placeholder="请输入 API 访问令牌">
    </div>
  `, () => DPP.toast(isEdit ? '数据源配置已更新' : '数据源创建成功', 'success'), { confirmText: isEdit ? '保存' : '创建' });
  Pages.datasourceTypeChange(document.querySelector('#global-modal .form-select'));
};

  /* ========== Sync Task ========== */
Pages.syncTask = function() {
    return `
    <div class="page-header">
      <div>
        <div class="page-title">同步任务</div>
        <div class="page-subtitle">配置和管理数据同步任务，支持全量、增量、实时三种方式</div>
      </div>
      <div class="page-actions">
        <button class="btn" onclick="DPP.toast('已批量启动选中的同步任务', 'success')">${DPP.icon('sync')} 批量启动</button>
        <button class="btn btn-primary" onclick="Pages.syncTaskModal()">${DPP.icon('plus')} 新建任务</button>
      </div>
    </div>

    <div class="card">
      <div class="tabs" style="margin-bottom: 0;">
        <div class="tab-item active">全部任务</div>
        <div class="tab-item">运行中</div>
        <div class="tab-item">已停止</div>
        <div class="tab-item">异常</div>
      </div>

      <div class="filter-bar">
        <div class="filter-item">
          <div class="filter-label">任务名称</div>
          <input type="text" class="form-input" placeholder="请输入任务名称">
        </div>
        <div class="filter-item">
          <div class="filter-label">同步方式</div>
          <select class="form-select">
            <option>全部</option><option>全量同步</option><option>增量同步</option><option>实时同步</option>
          </select>
        </div>
        <div class="filter-item">
          <div class="filter-label">触发方式</div>
          <select class="form-select">
            <option>全部</option><option>手动</option><option>定时</option><option>自动</option>
          </select>
        </div>
        <div class="filter-actions">
          <button class="btn">重置</button>
          <button class="btn btn-primary">查询</button>
        </div>
      </div>

      <div class="table-wrap" style="margin-top: 8px;">
        <table class="table">
          <thead>
            <tr>
              <th style="width: 40px;"><label class="checkbox"><input type="checkbox"><span class="checkbox-box"></span></label></th>
              <th>任务名称</th>
              <th>源端</th>
              <th>目标端</th>
              <th>同步方式</th>
              <th>触发方式</th>
              <th>状态</th>
              <th>最近执行</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            ${[
              { name: '政务用户数据同步', source: 'MySQL-政务库', target: 'GBase-主库', mode: '增量同步', trigger: '定时', status: '运行中', tag: 'success', time: '2024-10-22 02:00' },
              { name: '企业注册信息同步', source: 'Oracle-企业库', target: 'PostgreSQL-分析库', mode: '全量同步', trigger: '手动', status: '已完成', tag: 'info', time: '2024-10-21 15:30' },
              { name: '实时事件流同步', source: 'Kafka-事件Topic', target: 'Doris-明细层', mode: '实时同步', trigger: '自动', status: '运行中', tag: 'success', time: '持续运行中' },
              { name: '日志数据汇聚', source: 'RocketMQ-日志Topic', target: 'MongoDB-日志库', mode: '实时同步', trigger: '自动', status: '异常', tag: 'error', time: '2024-10-22 08:15' },
              { name: '历史档案迁移', source: '达梦-历史库', target: 'S3-归档桶', mode: '全量同步', trigger: '手动', status: '已停止', tag: 'default', time: '2024-10-20 18:00' },
              { name: '工单数据定时同步', source: 'MySQL-业务库', target: 'GBase-主库', mode: '增量同步', trigger: '定时', status: '待执行', tag: 'warning', time: '2024-10-22 23:00' }
            ].map(row => `
              <tr>
                <td><label class="checkbox"><input type="checkbox"><span class="checkbox-box"></span></label></td>
                <td class="font-medium">${row.name}</td>
                <td><span class="tag tag-default">${row.source}</span></td>
                <td><span class="tag tag-primary">${row.target}</span></td>
                <td>${row.mode}</td>
                <td>${row.trigger}</td>
                <td><span class="tag tag-${row.tag}">${row.status}</span></td>
                <td style="color: var(--dpp-muted); font-size: 13px;">${row.time}</td>
                <td>
                  <button class="btn btn-text btn-sm" onclick="DPP.openModal('任务详情', '<div class=&quot;desc-grid&quot; style=&quot;grid-template-columns: repeat(2, 1fr);&quot;><div class=&quot;desc-item&quot;><div class=&quot;desc-label&quot;>任务名称</div><div class=&quot;desc-value&quot;>${row.name}</div></div><div class=&quot;desc-item&quot;><div class=&quot;desc-label&quot;>同步方式</div><div class=&quot;desc-value&quot;>${row.mode}</div></div><div class=&quot;desc-item&quot;><div class=&quot;desc-label&quot;>源端</div><div class=&quot;desc-value&quot;>${row.source}</div></div><div class=&quot;desc-item&quot;><div class=&quot;desc-label&quot;>目标端</div><div class=&quot;desc-value&quot;>${row.target}</div></div><div class=&quot;desc-item&quot;><div class=&quot;desc-label&quot;>触发方式</div><div class=&quot;desc-value&quot;>${row.trigger}</div></div><div class=&quot;desc-item&quot;><div class=&quot;desc-label&quot;>当前状态</div><div class=&quot;desc-value&quot;>${row.status}</div></div></div>', null, { hideFooter: true })">详情</button>
                  <button class="btn btn-text btn-sm" onclick="DPP.openModal('执行日志', '<pre style=&quot;font-family: monospace; font-size: 12px; line-height: 1.8; color: var(--dpp-fg); background: var(--dpp-bg); padding: 16px; border-radius: 4px; white-space: pre-wrap;&quot;>[2024-10-22 08:15:02] 任务「${row.name}」开始执行\n[2024-10-22 08:15:03] 建立源端连接成功\n[2024-10-22 08:15:05] 拉取增量数据 1,024 条\n[2024-10-22 08:15:09] 写入目标端成功，耗时 4.2s\n[2024-10-22 08:15:09] 任务执行完成，状态：${row.status}</pre>', null, { hideFooter: true })">日志</button>
                  <button class="btn btn-text btn-sm" onclick="Pages.syncTaskModal('${row.name}')">配置</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="pagination">
        <span class="pagination-info">共 15 条</span>
        <button class="page-btn" disabled>‹</button>
        <button class="page-btn active">1</button>
        <button class="page-btn">2</button>
        <button class="page-btn">›</button>
      </div>
    </div>
    `;
}

  /* ========== Upload ========== */
Pages.syncTaskModal = function(name) {
  const isEdit = !!name;
  DPP.openModal(isEdit ? '任务配置' : '新建同步任务', `
    <div class="form-item">
      <label class="form-label required">任务名称</label>
      <input type="text" class="form-input" placeholder="请输入任务名称" value="${name || ''}">
    </div>
    <div class="form-row">
      <div class="form-item">
        <label class="form-label required">源端数据源</label>
        <select class="form-select">
          <option>青阳市政务库-主</option><option>企业数据汇聚库</option>
          <option>实时消息队列</option><option>对象存储桶</option>
        </select>
      </div>
      <div class="form-item">
        <label class="form-label required">目标端数据源</label>
        <select class="form-select">
          <option>GBase-主库</option><option>PostgreSQL分析库</option>
          <option>Doris-明细层</option><option>S3-归档桶</option>
        </select>
      </div>
    </div>
    <div class="form-row" style="margin-bottom: 0;">
      <div class="form-item">
        <label class="form-label required">同步方式</label>
        <select class="form-select">
          <option>全量同步</option><option>增量同步</option><option>实时同步</option>
        </select>
      </div>
      <div class="form-item">
        <label class="form-label required">触发方式</label>
        <select class="form-select">
          <option>手动</option><option>定时</option><option>自动</option>
        </select>
      </div>
    </div>
  `, () => DPP.toast(isEdit ? '任务配置已保存' : '同步任务创建成功', 'success'), { confirmText: isEdit ? '保存' : '创建' });
};

  /* ========== Upload ========== */
Pages.upload = function() {
    return `
    <div class="page-header">
      <div>
        <div class="page-title">数据上传</div>
        <div class="page-subtitle">支持本地上传、S3导入、FTP拉取等多种数据接入方式</div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 16px;">
      <div class="card">
        <div class="card-header">
          <div class="card-title">上传文件</div>
        </div>
        <div class="card-body">
          <div class="upload-area" onclick="DPP.toast('请选择要上传的文件（原型演示）', 'info')">
            <div class="upload-icon">↑</div>
            <div class="upload-text">点击或拖拽文件到此处上传</div>
            <div class="upload-hint">支持 CSV、JSON、JSONL、Parquet、图片（JPG/PNG）、音频（WAV/MP3）、视频（MP4）等格式，单个文件最大 2GB</div>
          </div>

          <div class="form-item mt-24">
            <label class="form-label required">数据用途</label>
            <select class="form-select">
              <option>请选择数据用途</option>
              <option>模型训练</option>
              <option>模型评估</option>
              <option>模型测试</option>
              <option>通用数据加工</option>
            </select>
          </div>

          <div class="form-row">
            <div class="form-item">
              <label class="form-label required">所属机构</label>
              <select class="form-select">
                <option>青阳市大数据中心</option>
                <option>青阳市政务服务管理局</option>
                <option>企业A</option>
                <option>企业B</option>
              </select>
            </div>
            <div class="form-item">
              <label class="form-label">数据分类</label>
              <select class="form-select">
                <option>请选择</option>
                <option>文本类</option>
                <option>图像类</option>
                <option>音频类</option>
                <option>视频类</option>
                <option>结构化数据</option>
              </select>
            </div>
          </div>

          <div class="form-item">
            <label class="form-label">备注说明</label>
            <textarea class="form-textarea" placeholder="请输入数据来源、用途等说明信息"></textarea>
          </div>

          <div class="od-row" style="gap: 8px; margin-top: 8px;">
            <button class="btn btn-primary" onclick="DPP.toast('上传任务已创建，可在同步任务中查看进度', 'success')">开始上传</button>
            <button class="btn" onclick="DPP.confirm('取消上传', '确定放弃当前填写的内容吗？', () => DPP.toast('已取消', 'info'), { danger: true, confirmText: '放弃' })">取消</button>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">其他接入方式</div>
        </div>
        <div class="card-body" style="display: flex; flex-direction: column; gap: 12px;">
          ${[
            { icon: '☁️', name: 'S3 对象存储', desc: '兼容 MinIO / OSS / S3', color: '#1890ff' },
            { icon: '📁', name: 'FTP / SFTP', desc: '从FTP服务器拉取文件', color: '#fa8c16' },
            { icon: '💾', name: 'NAS 挂载', desc: '网络附加存储只读访问', color: '#722ed1' },
            { icon: '🔌', name: 'JDBC 数据库', desc: 'MySQL / Oracle / 达梦 / GBase', color: '#13c2c2' },
            { icon: '📡', name: 'API 接口', desc: 'HTTP RESTful 接口拉取', color: '#eb2f96' },
            { icon: '📊', name: 'ETL 数据源', desc: 'Doris / Kafka / Pulsar', color: '#52c41a' }
          ].map(item => `
            <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid var(--dpp-border); border-radius: var(--dpp-radius-md); cursor: pointer; transition: all .2s;" onmouseover="this.style.borderColor='var(--dpp-accent)'" onmouseout="this.style.borderColor='var(--dpp-border)'">
              <div style="width: 36px; height: 36px; border-radius: var(--dpp-radius-md); background: ${item.color}22; display: flex; align-items: center; justify-content: center; font-size: 18px;">${item.icon}</div>
              <div style="flex: 1;">
                <div style="font-weight: 500; font-size: 14px;">${item.name}</div>
                <div style="font-size: 12px; color: var(--dpp-muted);">${item.desc}</div>
              </div>
              <span style="color: var(--dpp-muted);">${DPP.icon('arrow')}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    `;
}

  /* ========== Workorder ========== */
Pages.workorder = function() {
    return `
    <div class="page-header">
      <div>
        <div class="page-title">工单管理</div>
        <div class="page-subtitle">管理数据集加工全流程工单，跟踪各阶段进度</div>
      </div>
      <div class="page-actions">
        <button class="btn" onclick="DPP.toast('工单统计报表生成中，请稍候', 'info')">${DPP.icon('chart')} 统计报表</button>
        <button class="btn btn-primary" onclick="Pages.workorderModal()">${DPP.icon('plus')} 新建工单</button>
      </div>
    </div>

    <div class="card">
      <div class="tabs">
        <div class="tab-item active">全部工单</div>
        <div class="tab-item">待受理</div>
        <div class="tab-item">进行中</div>
        <div class="tab-item">待测评</div>
        <div class="tab-item">已完成</div>
      </div>

      <div class="filter-bar">
        <div class="filter-item">
          <div class="filter-label">工单号</div>
          <input type="text" class="form-input" placeholder="请输入工单号">
        </div>
        <div class="filter-item">
          <div class="filter-label">数据集名称</div>
          <input type="text" class="form-input" placeholder="请输入名称">
        </div>
        <div class="filter-item">
          <div class="filter-label">机构</div>
          <select class="form-select">
            <option>全部机构</option>
            <option>青阳市大数据中心</option>
            <option>政务服务管理局</option>
          </select>
        </div>
        <div class="filter-item">
          <div class="filter-label">创建时间</div>
          <input type="text" class="form-input" placeholder="开始日期 ~ 结束日期">
        </div>
        <div class="filter-actions">
          <button class="btn">重置</button>
          <button class="btn btn-primary">查询</button>
        </div>
      </div>

      <div class="table-wrap" style="margin-top: 8px;">
        <table class="table">
          <thead>
            <tr>
              <th>工单号</th>
              <th>数据集名称</th>
              <th>需求机构</th>
              <th>数据类型</th>
              <th>当前阶段</th>
              <th>负责人</th>
              <th>整体进度</th>
              <th>优先级</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            ${WO_ROWS.map(row => `
              <tr>
                <td><a href="javascript:void(0)" class="font-medium" onclick="Pages.openWorkorderDetail('${row.id}')">${row.id}</a></td>
                <td>${row.name}</td>
                <td>${row.org}</td>
                <td><span class="tag tag-info">${row.type}</span></td>
                <td><span class="tag tag-${row.stag}">${row.stage}</span></td>
                <td>${row.owner}</td>
                <td style="width: 140px;">
                  <div class="od-row" style="gap: 8px;">
                    <div class="progress" style="flex:1;"><div class="progress-bar" style="width:${row.progress}%;"></div></div>
                    <span style="font-size:12px; color: var(--dpp-muted); width: 36px;">${row.progress}%</span>
                  </div>
                </td>
                <td><span class="tag tag-${row.ptag}">${row.priority}</span></td>
                <td style="color: var(--dpp-muted); font-size: 13px;">${row.time}</td>
                <td>
                  <button class="btn btn-text btn-sm" onclick="Pages.openWorkorderDetail('${row.id}')">详情</button>
                  <button class="btn btn-text btn-sm" onclick="Pages.openWorkorderDetail('${row.id}')">流程</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="pagination">
        <span class="pagination-info">共 36 条</span>
        <button class="page-btn" disabled>‹</button>
        <button class="page-btn active">1</button>
        <button class="page-btn">2</button>
        <button class="page-btn">3</button>
        <button class="page-btn">4</button>
        <button class="page-btn">›</button>
      </div>
    </div>
    `;
  }

