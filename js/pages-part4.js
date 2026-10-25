/* DPP Pages - Part 4: Dataset Detail, Workorder Detail, Tenant Management */

/* ========== 数据集详情 ========== */
Pages.datasetDetail = function() {
  const p = DPP.pageParams || {};
  const ds = {
    name: p.name || '政务问答语料数据集',
    type: p.type || '文本',
    ver: p.ver || 'v2.1',
    samples: p.samples || '128,560',
    labeled: p.labeled || '112,340',
    size: p.size || '256 MB',
    status: p.status || '已发布',
    tag: p.tag || 'success',
    owner: p.owner || '张明',
    time: p.time || '2024-10-22 10:30'
  };

  const versions = [
    { ver: 'v2.1', samples: '128,560', labeled: '112,340', size: '256 MB', status: '已发布', tag: 'success', time: '2024-10-22 10:30', note: '补充 8,000 条政务服务问答语料' },
    { ver: 'v2.0', samples: '120,560', labeled: '104,200', size: '241 MB', status: '已归档', tag: 'default', time: '2024-09-28 16:20', note: '结构化字段规范升级' },
    { ver: 'v1.5', samples: '98,300', labeled: '80,120', size: '198 MB', status: '已归档', tag: 'default', time: '2024-08-15 11:00', note: '去除重复问句 3,200 条' },
    { ver: 'v1.0', samples: '60,000', labeled: '45,000', size: '120 MB', status: '已归档', tag: 'default', time: '2024-06-30 09:30', note: '首个正式发布版本' }
  ];

  const related = [
    { id: 'WO-QB-20241020-001', stage: '标注中', stag: 'primary', owner: '张明', progress: 68 },
    { id: 'WO-QB-20240912-008', stage: '已完成', stag: 'success', owner: '张明', progress: 100 }
  ];

  const samples = [
    { id: 'DS-128501', text: '问：如何办理居住证签注？答：持有效居住证及身份证明材料，至居住地派出所或通过政务服务网在线办理……', tags: ['政务问答', '已标注'] },
    { id: 'DS-128502', text: '问：异地就医备案需要哪些材料？答：需提供社保卡、身份证及异地居住证明，备案有效期为 12 个月……', tags: ['政务问答', '已标注'] },
    { id: 'DS-128503', text: '问：企业开办全程网办流程是什么？答：登录企业开办一窗通平台，完成名称申报、设立登记、印章刻制……', tags: ['政务问答', '已标注'] },
    { id: 'DS-128504', text: '问：住房公积金提取条件有哪些？答：购买自住住房、偿还购房贷款本息、租赁住房等情形可申请提取……', tags: ['政务问答', '待审核'] },
    { id: 'DS-128505', text: '问：新生儿落户需要什么手续？答：出生医学证明、父母双方户口簿、结婚证，至父母一方户籍地派出所办理……', tags: ['政务问答', '已标注'] },
    { id: 'DS-128506', text: '问：个体工商户如何注销登记？答：清税证明后，通过政务服务网提交注销申请，或至登记机关窗口办理……', tags: ['政务问答', '已标注'] }
  ];

  return `
  <div class="detail-back" onclick="DPP.navigate('dataset')" data-od-id="dataset-detail-back">
    ${DPP.icon('back')} 返回数据集列表
  </div>

  <div class="page-header">
    <div>
      <div class="page-title od-row" style="gap: 10px;">
        ${ds.name}
        <code style="font-size: 13px; background: var(--dpp-bg); padding: 2px 6px; border-radius: 2px;">${ds.ver}</code>
        <span class="tag tag-${ds.tag}">${ds.status}</span>
      </div>
      <div class="page-subtitle">${ds.type}类数据集 · 负责人 ${ds.owner} · 最近更新 ${ds.time}</div>
    </div>
    <div class="page-actions">
      <button class="btn" onclick="DPP.navigate('evaluate')">${DPP.icon('chart')} 发起测评</button>
      <button class="btn" onclick="DPP.navigate('package')">${DPP.icon('package')} 封装交付</button>
      <button class="btn btn-primary" onclick="DPP.toast('已开始下载 ${ds.name} ${ds.ver}，请稍候', 'info')">${DPP.icon('upload')} 下载数据集</button>
    </div>
  </div>

  <div class="stat-grid" data-od-id="dataset-detail-stats">
    <div class="stat-card">
      <div class="stat-label">总样本量</div>
      <div class="stat-value">${ds.samples}</div>
      <div class="stat-trend up">↑ 较上版本 +8,000</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">已标注样本</div>
      <div class="stat-value">${ds.labeled}</div>
      <div class="stat-trend">标注率 87.4%</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">数据大小</div>
      <div class="stat-value">${ds.size}</div>
      <div class="stat-trend">JSONL · UTF-8</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">测评得分</div>
      <div class="stat-value">92.7</div>
      <div class="stat-trend up">三维均 ≥90，已通过</div>
    </div>
  </div>

  <div class="card" data-od-id="dataset-detail-info">
    <div class="card-header"><div class="card-title">基本信息</div></div>
    <div class="card-body">
      <div class="desc-grid">
        <div class="desc-item"><div class="desc-label">数据集编号</div><div class="desc-value" style="font-family: monospace;">DS-QB-2024-0086</div></div>
        <div class="desc-item"><div class="desc-label">数据类型</div><div class="desc-value">${ds.type}</div></div>
        <div class="desc-item"><div class="desc-label">当前版本</div><div class="desc-value">${ds.ver}</div></div>
        <div class="desc-item"><div class="desc-label">存储格式</div><div class="desc-value">JSONL</div></div>
        <div class="desc-item"><div class="desc-label">所属机构</div><div class="desc-value">青阳市大数据中心</div></div>
        <div class="desc-item"><div class="desc-label">数据来源</div><div class="desc-value">政务服务管理局 · 同步任务接入</div></div>
        <div class="desc-item"><div class="desc-label">负责人</div><div class="desc-value">${ds.owner}</div></div>
        <div class="desc-item"><div class="desc-label">创建时间</div><div class="desc-value">2024-06-30 09:30</div></div>
        <div class="desc-item"><div class="desc-label">授权方式</div><div class="desc-value">机构授权</div></div>
        <div class="desc-item"><div class="desc-label">脱敏级别</div><div class="desc-value">L2 · 已脱敏</div></div>
        <div class="desc-item"><div class="desc-label">质检合格率</div><div class="desc-value">96.5%</div></div>
        <div class="desc-item"><div class="desc-label">最近更新</div><div class="desc-value">${ds.time}</div></div>
      </div>
    </div>
  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px;">
    <div class="card" data-od-id="dataset-detail-samples">
      <div class="card-header">
        <div class="card-title">样本预览</div>
        <span class="tag tag-info">展示 6 / ${ds.samples} 条</span>
      </div>
      <div class="card-body">
        <div class="sample-grid" style="grid-template-columns: 1fr;">
          ${samples.map(s => `
            <div class="sample-card">
              <div class="sample-id">${s.id}</div>
              <div class="sample-text od-clamp-2">${s.text}</div>
              <div class="sample-tags">${s.tags.map((t, i) => `<span class="tag ${i === 1 ? (t === '已标注' ? 'tag-success' : 'tag-warning') : 'tag-default'}">${t}</span>`).join('')}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div>
      <div class="card" data-od-id="dataset-detail-versions">
        <div class="card-header"><div class="card-title">版本历史</div></div>
        <div class="table-wrap">
          <table class="table">
            <thead>
              <tr><th>版本</th><th>样本量</th><th>大小</th><th>状态</th><th>发布时间</th><th>操作</th></tr>
            </thead>
            <tbody>
              ${versions.map(v => `
                <tr>
                  <td><code style="font-size: 13px; background: var(--dpp-bg); padding: 2px 6px; border-radius: 2px;">${v.ver}</code></td>
                  <td>${v.samples}</td>
                  <td>${v.size}</td>
                  <td><span class="tag tag-${v.tag}">${v.status}</span></td>
                  <td style="color: var(--dpp-muted); font-size: 13px;">${v.time}</td>
                  <td><button class="btn btn-text btn-sm" onclick="DPP.toast('版本说明：${v.note}', 'info')">说明</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="card" style="margin-top: 16px;" data-od-id="dataset-detail-workorders">
        <div class="card-header"><div class="card-title">关联工单</div></div>
        <div class="table-wrap">
          <table class="table">
            <thead>
              <tr><th>工单号</th><th>当前阶段</th><th>负责人</th><th>进度</th></tr>
            </thead>
            <tbody>
              ${related.map(r => `
                <tr>
                  <td><a href="javascript:void(0)" onclick="DPP.navigate('workorderDetail', { id: '${r.id}', name: '${ds.name}' })">${r.id}</a></td>
                  <td><span class="tag tag-${r.stag}">${r.stage}</span></td>
                  <td>${r.owner}</td>
                  <td style="width: 120px;">
                    <div class="od-row" style="gap: 8px;">
                      <div class="progress" style="flex:1;"><div class="progress-bar" style="width:${r.progress}%;"></div></div>
                      <span style="font-size:12px; color: var(--dpp-muted); width: 36px;">${r.progress}%</span>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  `;
};

/* ========== 工单详情（流程时间线） ========== */
Pages.workorderDetail = function() {
  const p = DPP.pageParams || {};
  const wo = {
    id: p.id || 'WO-QB-20241020-001',
    name: p.name || '政务问答语料数据集 v2',
    org: p.org || '政务服务管理局',
    type: p.type || '文本',
    stage: p.stage || '标注中',
    stag: p.stag || 'primary',
    owner: p.owner || '张明',
    progress: p.progress != null ? p.progress : 68,
    priority: p.priority || '高',
    ptag: p.ptag || 'error',
    time: p.time || '2024-10-20 09:30'
  };

  const stageIndex = { '待受理': 0, '预处理': 2, '标注中': 3, '测评中': 5, '封装中': 6, '已交付': 7, '已完成': 7 };
  const activeIdx = stageIndex[wo.stage] != null ? stageIndex[wo.stage] : 3;

  const flow = [
    { name: '需求提交', desc: `${wo.org} 提交加工需求，期望交付 30 万条高质量${wo.type}样本`, time: wo.time, user: '需求方接口人' },
    { name: '工单受理', desc: '平台审核需求合规性与数据可得性，分配项目负责人', time: '2024-10-20 14:00', user: '平台管理员' },
    { name: '数据接入', desc: '从源端数据源同步原始数据，完成入库与格式校验', time: '2024-10-21 09:20', user: '李伟' },
    { name: '预处理', desc: '清洗、去重、切分，产出标准化加工底稿', time: '2024-10-21 18:40', user: '预处理引擎' },
    { name: '标注作业', desc: '按标注规范分配任务，多轮标注与交叉校对', time: wo.progress >= 60 ? '进行中' : '待开始', user: wo.owner },
    { name: '质量校验', desc: '抽样质检 + 全量规则校验，合格率门槛 95%', time: '待开始', user: '待分配' },
    { name: '数据集测评', desc: '说明文档 / 数据质量 / 模型应用三维评估', time: '待开始', user: '待分配' },
    { name: '封装交付', desc: '封装版本、签署授权协议并交付需求方', time: '待开始', user: '待分配' }
  ];

  const records = [
    { t: '2024-10-22 10:15', u: wo.owner, c: `完成第 12 批标注任务，累计进度 ${wo.progress}%` },
    { t: '2024-10-21 18:40', u: '预处理引擎', c: '预处理完成：150,000 → 128,560 条，耗时 12分30秒' },
    { t: '2024-10-21 09:20', u: '李伟', c: '数据接入完成，入库校验通过' },
    { t: '2024-10-20 14:00', u: '平台管理员', c: `工单受理通过，指派负责人 ${wo.owner}` },
    { t: wo.time, u: '需求方接口人', c: '提交加工需求并上传需求说明书' }
  ];

  return `
  <div class="detail-back" onclick="DPP.navigate('workorder')" data-od-id="workorder-detail-back">
    ${DPP.icon('back')} 返回工单管理
  </div>

  <div class="page-header">
    <div>
      <div class="page-title od-row" style="gap: 10px;">
        ${wo.name}
        <span class="tag tag-${wo.stag}">${wo.stage}</span>
        <span class="tag tag-${wo.ptag}">优先级 ${wo.priority}</span>
      </div>
      <div class="page-subtitle">工单号 <span style="font-family: monospace;">${wo.id}</span> · 需求机构 ${wo.org} · 创建于 ${wo.time}</div>
    </div>
    <div class="page-actions">
      <button class="btn" onclick="DPP.confirm('转派工单', '将工单「${wo.id}」转派给其他负责人？转派后原负责人将收到通知。', () => DPP.toast('工单已提交转派审批', 'success'))">转派</button>
      <button class="btn btn-primary" onclick="DPP.confirm('催办工单', '向当前阶段负责人「${wo.owner}」发送催办提醒？', () => DPP.toast('催办提醒已发送', 'success'))">催办</button>
    </div>
  </div>

  <div class="card" data-od-id="workorder-detail-overview">
    <div class="card-body">
      <div class="od-row" style="gap: 32px; flex-wrap: wrap;">
        <div style="min-width: 240px; flex: 1;">
          <div class="od-row" style="justify-content: space-between; margin-bottom: 8px;">
            <span class="text-sm text-muted">整体进度</span>
            <span class="font-medium" style="color: var(--dpp-accent);">${wo.progress}%</span>
          </div>
          <div class="progress" style="height: 10px;"><div class="progress-bar" style="width:${wo.progress}%;"></div></div>
          <div class="text-sm text-muted mt-8">当前阶段：${wo.stage} · 负责人：${wo.owner} · 期望交付：2024-11-15</div>
        </div>
        <div class="kpi-row" style="flex: 2;">
          <div class="kpi-item"><div class="kpi-value">150,000</div><div class="kpi-label">接入样本</div></div>
          <div class="kpi-item"><div class="kpi-value">128,560</div><div class="kpi-label">预处理后</div></div>
          <div class="kpi-item"><div class="kpi-value">96.5%</div><div class="kpi-label">质检合格率</div></div>
        </div>
      </div>
    </div>
  </div>

  <div style="display: grid; grid-template-columns: 5fr 7fr; gap: 16px; margin-top: 16px;">
    <div class="card" data-od-id="workorder-detail-timeline">
      <div class="card-header">
        <div class="card-title">流程时间线</div>
        <span class="tag tag-primary">${activeIdx + 1} / ${flow.length} 阶段</span>
      </div>
      <div class="card-body">
        <div class="timeline">
          ${flow.map((node, i) => {
            const state = i < activeIdx ? 'done' : (i === activeIdx ? 'active' : '');
            const statusTag = i < activeIdx
              ? '<span class="tag tag-success">已完成</span>'
              : (i === activeIdx ? '<span class="tag tag-primary">进行中</span>' : '<span class="tag tag-default">未开始</span>');
            return `
            <div class="timeline-item ${state}">
              <span class="timeline-dot"></span>
              <div class="timeline-title">${node.name} ${statusTag}</div>
              <div class="timeline-meta">${node.time !== '待开始' && node.time !== '进行中' ? node.time + ' · ' : ''}${node.user}</div>
              ${i <= activeIdx ? `<div class="timeline-desc">${node.desc}</div>` : ''}
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>

    <div>
      <div class="card" data-od-id="workorder-detail-info">
        <div class="card-header"><div class="card-title">工单信息</div></div>
        <div class="card-body">
          <div class="desc-grid" style="grid-template-columns: repeat(3, 1fr);">
            <div class="desc-item"><div class="desc-label">工单号</div><div class="desc-value" style="font-family: monospace;">${wo.id}</div></div>
            <div class="desc-item"><div class="desc-label">数据类型</div><div class="desc-value">${wo.type}</div></div>
            <div class="desc-item"><div class="desc-label">需求机构</div><div class="desc-value">${wo.org}</div></div>
            <div class="desc-item"><div class="desc-label">负责人</div><div class="desc-value">${wo.owner}</div></div>
            <div class="desc-item"><div class="desc-label">优先级</div><div class="desc-value">${wo.priority}</div></div>
            <div class="desc-item"><div class="desc-label">创建时间</div><div class="desc-value">${wo.time}</div></div>
            <div class="desc-item"><div class="desc-label">关联数据集</div><div class="desc-value"><a href="javascript:void(0)" onclick="DPP.navigate('datasetDetail', { name: '${wo.name.replace(/ v\d+$/, '')}' })">${wo.name.replace(/ v\d+$/, '')}</a></div></div>
            <div class="desc-item" style="grid-column: 1 / -1;"><div class="desc-label">关联数据源</div><div class="desc-value">${(wo.dsrc || []).map(s => `<span class="tag tag-info" style="margin-right: 6px;">${s}</span>`).join('') || '-'}</div></div>
            <div class="desc-item"><div class="desc-label">标注规范</div><div class="desc-value">《${wo.type}标注规范 v3.2》</div></div>
            <div class="desc-item"><div class="desc-label">保密级别</div><div class="desc-value">内部 · L2</div></div>
          </div>
        </div>
      </div>

      <div class="card" style="margin-top: 16px;" data-od-id="workorder-detail-records">
        <div class="card-header"><div class="card-title">操作记录</div></div>
        <div class="card-body" style="padding-top: 8px;">
          ${records.map(r => `
            <div class="list-item">
              <div class="user-avatar" style="width:28px;height:28px;font-size:12px;flex-shrink:0;">${r.u.charAt(0)}</div>
              <div style="flex: 1; min-width: 0;">
                <div style="font-size: 14px;">${r.c}</div>
                <div class="text-sm text-muted">${r.u} · ${r.t}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  </div>
  `;
};

/* ========== 租户管理 ========== */
Pages.tenant = function() {
  const rows = DPP.tenants;
  const active = rows.filter(t => t.status === '运行中').length;
  return `
  <div class="page-header">
    <div>
      <div class="page-title">租户管理</div>
      <div class="page-subtitle">管理平台租户空间，支持新增、编辑与启停用</div>
    </div>
    <div class="page-actions">
      <button class="btn btn-primary" onclick="Pages.tenantModal()">${DPP.icon('plus')} 新增租户</button>
    </div>
  </div>

  <div class="stat-grid">
    <div class="stat-card">
      <div class="stat-label">租户总数</div>
      <div class="stat-value">${rows.length}</div>
      <div class="stat-trend">运行中 ${active} 个</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">用户总数</div>
      <div class="stat-value">${rows.reduce((s, t) => s + t.users, 0)}</div>
      <div class="stat-trend up">↑ 本月新增 12 人</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">数据集总数</div>
      <div class="stat-value">${rows.reduce((s, t) => s + t.datasets, 0)}</div>
      <div class="stat-trend">跨租户共享 8 个</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">存储总量</div>
      <div class="stat-value">1.7 TB</div>
      <div class="stat-trend up">↑ 180 GB 本月</div>
    </div>
  </div>

  <div class="card">
    <div class="filter-bar" style="padding-top: 20px;">
      <div class="filter-item">
        <div class="filter-label">租户名称</div>
        <input type="text" class="form-input" placeholder="请输入租户名称">
      </div>
      <div class="filter-item">
        <div class="filter-label">状态</div>
        <select class="form-select">
          <option>全部状态</option><option>运行中</option><option>已停用</option>
        </select>
      </div>
      <div class="filter-actions">
        <button class="btn">重置</button>
        <button class="btn btn-primary">查询</button>
      </div>
    </div>

    <div class="table-wrap" style="margin-top: 16px;">
      <table class="table">
        <thead>
          <tr>
            <th>租户名称</th><th>租户编码</th><th>联系人</th><th>联系电话</th>
            <th>用户数</th><th>数据集</th><th>存储使用</th><th>状态</th>
            <th>创建时间</th><th>操作</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(t => `
            <tr>
              <td>
                <div class="od-row" style="gap: 10px;">
                  <div class="tenant-logo" style="width:28px;height:28px;border-radius:var(--dpp-radius-sm);background:${t.id === DPP.currentTenant.id ? 'var(--dpp-accent)' : 'var(--dpp-accent-secondary)'};color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;">${t.logo}</div>
                  <div>
                    <div class="font-medium">${t.name}</div>
                    ${t.id === DPP.currentTenant.id ? '<span class="tag tag-primary" style="margin-top:2px;">当前租户</span>' : ''}
                  </div>
                </div>
              </td>
              <td style="font-family: monospace; font-size: 13px;">${t.code}</td>
              <td>${t.contact}</td>
              <td style="font-size: 13px;">${t.phone}</td>
              <td>${t.users}</td>
              <td>${t.datasets}</td>
              <td>${t.storage}</td>
              <td><span class="tag tag-${t.tag}">${t.status}</span></td>
              <td style="color: var(--dpp-muted); font-size: 13px;">${t.created}</td>
              <td>
                ${t.id !== DPP.currentTenant.id && t.status === '运行中'
                  ? `<button class="btn btn-text btn-sm" onclick="DPP.switchTenant('${t.id}')">切换</button>`
                  : ''}
                <button class="btn btn-text btn-sm" onclick="Pages.tenantModal('${t.id}')">编辑</button>
                <button class="btn btn-text btn-sm" style="color: var(--dpp-error);"
                  onclick="DPP.confirm('${t.status === '运行中' ? '停用租户' : '启用租户'}', '确定${t.status === '运行中' ? '停用' : '启用'}租户「${t.name}」吗？', () => DPP.toast('租户状态已更新', 'success'), { danger: ${t.status === '运行中'}, hint: '${t.status === '运行中' ? '停用后该租户下所有用户将无法登录平台。' : '启用后该租户用户可正常登录平台。' })">${t.status === '运行中' ? '停用' : '启用'}</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>
  `;
};

Pages.tenantModal = function(tenantId) {
  const t = tenantId ? DPP.tenants.find(x => x.id === tenantId) : null;
  DPP.openModal(t ? '编辑租户' : '新增租户', `
    <div class="form-item">
      <label class="form-label required">租户名称</label>
      <input type="text" class="form-input" placeholder="请输入租户名称" value="${t ? t.name : ''}">
    </div>
    <div class="form-row">
      <div class="form-item">
        <label class="form-label required">联系人</label>
        <input type="text" class="form-input" placeholder="请输入联系人" value="${t ? t.contact : ''}">
      </div>
      <div class="form-item">
        <label class="form-label required">联系电话</label>
        <input type="text" class="form-input" placeholder="请输入联系电话" value="${t ? t.phone : ''}">
      </div>
    </div>
    <div class="form-row">
      <div class="form-item">
        <label class="form-label">存储配额</label>
        <select class="form-select">
          <option>100 GB</option><option>500 GB</option><option selected>1 TB</option><option>5 TB</option>
        </select>
      </div>
      <div class="form-item">
        <label class="form-label">用户配额</label>
        <select class="form-select">
          <option>50 人</option><option selected>200 人</option><option>500 人</option><option>不限</option>
        </select>
      </div>
    </div>
    <div class="form-item" style="margin-bottom: 0;">
      <label class="form-label">备注说明</label>
      <textarea class="form-textarea" placeholder="选填，租户用途等说明"></textarea>
    </div>
  `, () => DPP.toast(t ? '租户信息已更新' : '租户创建成功', 'success'), { confirmText: t ? '保存' : '创建' });
};

/* ========== 系统设置 ========== */
Pages.settings = function() {
  return `
  <div class="page-header" data-od-id="settings-page">
    <div>
      <div class="page-title">系统设置</div>
      <div class="page-subtitle">配置系统品牌标识、名称与登录页外观，保存后全平台生效</div>
    </div>
    <div class="page-actions">
      <button class="btn btn-primary" onclick="Pages.settingsSave()">保存设置</button>
    </div>
  </div>

  <div class="settings-grid">
    <div class="card">
      <div class="card-header"><div class="card-title">基本信息</div></div>
      <div style="padding: 4px 24px 20px;">
        <div class="form-item">
          <label class="form-label required">系统名称</label>
          <input type="text" class="form-input" id="set-sysname" value="数据集加工平台" placeholder="展示在页面头部的系统名称">
        </div>
        <div class="form-item">
          <label class="form-label required">浏览器 Tab 标注</label>
          <input type="text" class="form-input" id="set-tabtitle" value="数据集加工平台 - Data Processing Platform" placeholder="浏览器标签页显示的标题">
        </div>
        <div class="form-item">
          <label class="form-label">系统简称</label>
          <input type="text" class="form-input" id="set-shortname" value="DPP" placeholder="用于 Logo 图标等紧凑场景">
        </div>
        <div class="form-item" style="margin-bottom: 0;">
          <label class="form-label">系统描述</label>
          <textarea class="form-textarea" id="set-sysdesc" placeholder="选填，登录页与关于页面展示">面向政务数据的可信加工与交付平台，覆盖数据接入、预处理、标注、质检、测评与封装交付全流程。</textarea>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header"><div class="card-title">品牌标识</div></div>
      <div style="padding: 4px 24px 20px;">
        <div class="form-item">
          <label class="form-label">系统 Logo</label>
          <div class="upload-field">
            <div class="logo-preview" id="logo-preview">
              <span class="logo-preview-text">D</span>
            </div>
            <div>
              <input type="file" id="logo-file" accept="image/png,image/jpeg,image/svg+xml" style="display:none;" onchange="Pages.settingsLogoPreview(this)">
              <button class="btn btn-sm" onclick="document.getElementById('logo-file').click()">${DPP.icon('upload')} 上传 Logo</button>
              <div class="upload-hint">支持 PNG / JPG / SVG，建议尺寸 144×144，<br>大小不超过 200 KB，展示于页面头部与登录页</div>
            </div>
          </div>
        </div>
        <div class="form-item" style="margin-bottom: 0;">
          <label class="form-label">登录页图片</label>
          <div class="banner-preview" id="banner-preview">尚未上传登录页图片，默认使用纯色背景</div>
          <div class="upload-field" style="margin-top: 12px; align-items: center;">
            <input type="file" id="banner-file" accept="image/png,image/jpeg" style="display:none;" onchange="Pages.settingsBannerPreview(this)">
            <button class="btn btn-sm" onclick="document.getElementById('banner-file').click()">${DPP.icon('upload')} 上传图片</button>
            <div class="upload-hint" style="margin-top: 0;">建议尺寸 1920×1080，大小不超过 2 MB</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
};

Pages.settingsLogoPreview = function(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    document.getElementById('logo-preview').innerHTML = `<img src="${e.target.result}" alt="系统 Logo 预览">`;
    DPP.pendingLogo = e.target.result;
    DPP.toast('Logo 已读取，保存后生效', 'info');
  };
  reader.readAsDataURL(file);
};

Pages.settingsBannerPreview = function(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    document.getElementById('banner-preview').innerHTML = `<img src="${e.target.result}" alt="登录页图片预览">`;
    DPP.toast('登录页图片已读取，保存后生效', 'info');
  };
  reader.readAsDataURL(file);
};

Pages.settingsSave = function() {
  const name = document.getElementById('set-sysname').value.trim();
  const tab = document.getElementById('set-tabtitle').value.trim();
  if (!name || !tab) {
    DPP.toast('请填写系统名称与浏览器 Tab 标注', 'error');
    return;
  }
  document.title = tab;
  const brand = document.querySelector('.header-logo-text');
  if (brand) brand.textContent = name;
  if (DPP.pendingLogo) {
    const icon = document.querySelector('.header-logo-icon');
    if (icon) icon.innerHTML = `<img src="${DPP.pendingLogo}" alt="${name}" style="width:100%;height:100%;object-fit:contain;border-radius:inherit;">`;
  }
  DPP.toast('系统设置已保存并生效', 'success');
};

/* ========== 菜单管理 ========== */
Pages.menuExpanded = true;

Pages.MENU_TREE = [
  { id: 'm-dash', name: '工作台', type: '菜单', icon: 'dashboard', route: '/dashboard', perm: '', order: 1, status: '启用', visible: '显示', children: [] },
  { id: 'm-access', name: '数据接入', type: '目录', icon: 'database', route: '', perm: '', order: 2, status: '启用', visible: '显示', children: [
    { id: 'm-ds', name: '数据源管理', type: '菜单', icon: 'database', route: '/access/datasource', perm: 'access:datasource:list', order: 1, status: '启用', visible: '显示', children: [
      { id: 'm-ds-add', name: '新增数据源', type: '按钮', icon: '', route: '', perm: 'access:datasource:add', order: 1, status: '启用', visible: '显示', children: [] },
      { id: 'm-ds-edit', name: '编辑数据源', type: '按钮', icon: '', route: '', perm: 'access:datasource:edit', order: 2, status: '启用', visible: '显示', children: [] },
      { id: 'm-ds-del', name: '删除数据源', type: '按钮', icon: '', route: '', perm: 'access:datasource:remove', order: 3, status: '启用', visible: '显示', children: [] },
      { id: 'm-ds-test', name: '测试连接', type: '按钮', icon: '', route: '', perm: 'access:datasource:test', order: 4, status: '启用', visible: '显示', children: [] }
    ]},
    { id: 'm-sync', name: '同步任务', type: '菜单', icon: 'sync', route: '/access/sync-task', perm: 'access:sync:list', order: 2, status: '启用', visible: '显示', children: [
      { id: 'm-sync-add', name: '新建同步任务', type: '按钮', icon: '', route: '', perm: 'access:sync:add', order: 1, status: '启用', visible: '显示', children: [] },
      { id: 'm-sync-run', name: '手动执行', type: '按钮', icon: '', route: '', perm: 'access:sync:run', order: 2, status: '启用', visible: '显示', children: [] }
    ]},
    { id: 'm-upload', name: '数据上传', type: '菜单', icon: 'upload', route: '/access/upload', perm: 'access:upload:list', order: 3, status: '启用', visible: '显示', children: [] }
  ]},
  { id: 'm-dataset', name: '数据集管理', type: '目录', icon: 'folder', route: '', perm: '', order: 3, status: '启用', visible: '显示', children: [
    { id: 'm-wo', name: '工单管理', type: '菜单', icon: 'ticket', route: '/dataset/workorder', perm: 'dataset:workorder:list', order: 1, status: '启用', visible: '显示', children: [] },
    { id: 'm-dslist', name: '数据集列表', type: '菜单', icon: 'folder', route: '/dataset/list', perm: 'dataset:list', order: 2, status: '启用', visible: '显示', children: [
      { id: 'm-dslist-add', name: '新建数据集', type: '按钮', icon: '', route: '', perm: 'dataset:add', order: 1, status: '启用', visible: '显示', children: [] },
      { id: 'm-dslist-eval', name: '发起测评', type: '按钮', icon: '', route: '', perm: 'dataset:evaluate', order: 2, status: '启用', visible: '显示', children: [] }
    ]},
    { id: 'm-pre', name: '预处理任务', type: '菜单', icon: 'filter', route: '/dataset/preprocess', perm: 'dataset:preprocess:list', order: 3, status: '启用', visible: '显示', children: [] }
  ]},
  { id: 'm-anno', name: '标注中心', type: '目录', icon: 'edit', route: '', perm: '', order: 4, status: '启用', visible: '显示', children: [
    { id: 'm-annotask', name: '标注任务', type: '菜单', icon: 'edit', route: '/annotation/task', perm: 'annotation:task:list', order: 1, status: '启用', visible: '显示', children: [] },
    { id: 'm-annowork', name: '标注工作台', type: '菜单', icon: 'tool', route: '/annotation/workbench', perm: 'annotation:workbench', order: 2, status: '启用', visible: '显示', children: [] },
    { id: 'm-quality', name: '质量校验', type: '菜单', icon: 'check', route: '/annotation/quality', perm: 'annotation:quality:list', order: 3, status: '启用', visible: '显示', children: [] }
  ]},
  { id: 'm-eval', name: '测评与交付', type: '目录', icon: 'chart', route: '', perm: '', order: 5, status: '启用', visible: '显示', children: [
    { id: 'm-evalpage', name: '数据集测评', type: '菜单', icon: 'chart', route: '/deliver/evaluate', perm: 'deliver:evaluate:list', order: 1, status: '启用', visible: '显示', children: [] },
    { id: 'm-pkg', name: '封装交付', type: '菜单', icon: 'package', route: '/deliver/package', perm: 'deliver:package:list', order: 2, status: '启用', visible: '显示', children: [
      { id: 'm-pkg-add', name: '新建封装', type: '按钮', icon: '', route: '', perm: 'deliver:package:add', order: 1, status: '启用', visible: '显示', children: [] },
      { id: 'm-pkg-dl', name: '下载交付包', type: '按钮', icon: '', route: '', perm: 'deliver:package:download', order: 2, status: '启用', visible: '显示', children: [] }
    ]}
  ]},
  { id: 'm-sys', name: '系统管理', type: '目录', icon: 'setting', route: '', perm: '', order: 6, status: '启用', visible: '显示', children: [
    { id: 'm-user', name: '用户管理', type: '菜单', icon: 'user', route: '/system/user', perm: 'system:user:list', order: 1, status: '启用', visible: '显示', children: [
      { id: 'm-user-add', name: '新增用户', type: '按钮', icon: '', route: '', perm: 'system:user:add', order: 1, status: '启用', visible: '显示', children: [] },
      { id: 'm-user-edit', name: '编辑用户', type: '按钮', icon: '', route: '', perm: 'system:user:edit', order: 2, status: '启用', visible: '显示', children: [] },
      { id: 'm-user-reset', name: '重置密码', type: '按钮', icon: '', route: '', perm: 'system:user:resetPwd', order: 3, status: '启用', visible: '显示', children: [] }
    ]},
    { id: 'm-role', name: '角色权限', type: '菜单', icon: 'shield', route: '/system/role', perm: 'system:role:list', order: 2, status: '启用', visible: '显示', children: [] },
    { id: 'm-org', name: '组织架构', type: '菜单', icon: 'org', route: '/system/org', perm: 'system:org:list', order: 3, status: '启用', visible: '显示', children: [] },
    { id: 'm-tenant', name: '租户管理', type: '菜单', icon: 'tenant', route: '/system/tenant', perm: 'system:tenant:list', order: 4, status: '启用', visible: '显示', children: [] },
    { id: 'm-menu', name: '菜单管理', type: '菜单', icon: 'menu', route: '/system/menu', perm: 'system:menu:list', order: 5, status: '启用', visible: '显示', children: [
      { id: 'm-menu-add', name: '新增菜单', type: '按钮', icon: '', route: '', perm: 'system:menu:add', order: 1, status: '启用', visible: '显示', children: [] },
      { id: 'm-menu-edit', name: '编辑菜单', type: '按钮', icon: '', route: '', perm: 'system:menu:edit', order: 2, status: '启用', visible: '显示', children: [] },
      { id: 'm-menu-del', name: '删除菜单', type: '按钮', icon: '', route: '', perm: 'system:menu:remove', order: 3, status: '启用', visible: '显示', children: [] }
    ]},
    { id: 'm-settings', name: '系统设置', type: '菜单', icon: 'setting', route: '/system/settings', perm: 'system:settings', order: 6, status: '启用', visible: '显示', children: [] },
    { id: 'm-loginlog', name: '登录日志', type: '菜单', icon: 'key', route: '/system/login-logs', perm: 'system:loginlog:list', order: 7, status: '启用', visible: '显示', children: [] },
    { id: 'm-oplog', name: '操作日志', type: '菜单', icon: 'log', route: '/system/logs', perm: 'system:oplog:list', order: 8, status: '启用', visible: '显示', children: [] }
  ]}
];

Pages.menuRow = function(node, level) {
  const typeTag = node.type === '目录' ? 'warning' : (node.type === '菜单' ? 'primary' : 'info');
  const hasChildren = node.children && node.children.length > 0;
  const indent = 8 + level * 24;
  let html = `
    <tr class="menu-row" data-mid="${node.id}" data-level="${level}">
      <td>
        <div class="menu-tree-name" style="padding-left:${indent}px;">
          ${hasChildren
            ? `<span class="menu-tree-toggle" onclick="Pages.menuToggle('${node.id}', this)">${Pages.menuExpanded ? '▼' : '▶'}</span>`
            : '<span class="menu-tree-toggle" style="visibility:hidden;">•</span>'}
          ${node.icon ? `<span class="menu-tree-icon">${DPP.icon(node.icon)}</span>` : ''}
          <span class="font-medium">${node.name}</span>
        </div>
      </td>
      <td><span class="tag tag-${typeTag}">${node.type}</span></td>
      <td style="font-family:monospace;font-size:13px;">${node.route || '-'}</td>
      <td style="font-family:monospace;font-size:13px;">${node.perm || '-'}</td>
      <td>${node.order}</td>
      <td><span class="tag tag-${node.status === '启用' ? 'success' : 'default'}">${node.status}</span></td>
      <td><span class="tag tag-${node.visible === '显示' ? 'success' : 'default'}">${node.visible}</span></td>
      <td>
        ${node.type !== '按钮' ? `<button class="btn btn-text btn-sm" onclick="Pages.menuModal(null, '${node.id}')">新增</button>` : ''}
        <button class="btn btn-text btn-sm" onclick="Pages.menuModal('${node.id}')">编辑</button>
        <button class="btn btn-text btn-sm" style="color: var(--dpp-error);" onclick="Pages.menuDelete('${node.id}', '${node.name}')">删除</button>
      </td>
    </tr>
  `;
  if (hasChildren) {
    node.children.forEach(c => { html += Pages.menuRow(c, level + 1); });
  }
  return html;
};

Pages.menuManage = function() {
  return `
  <div class="page-header" data-od-id="menu-page">
    <div>
      <div class="page-title">菜单管理</div>
      <div class="page-subtitle">维护系统导航结构、路由与权限标识，支持目录、菜单、按钮三种类型</div>
    </div>
    <div class="page-actions">
      <button class="btn" onclick="Pages.menuToggleAll(this)">收起全部</button>
      <button class="btn btn-primary" onclick="Pages.menuModal()">${DPP.icon('plus')} 新增菜单</button>
    </div>
  </div>

  <div class="card">
    <div class="filter-bar">
      <div class="filter-item">
        <div class="filter-label">菜单名称</div>
        <input type="text" class="form-input" placeholder="请输入菜单名称">
      </div>
      <div class="filter-item">
        <div class="filter-label">菜单类型</div>
        <select class="form-select">
          <option>全部类型</option><option>目录</option><option>菜单</option><option>按钮</option>
        </select>
      </div>
      <div class="filter-item">
        <div class="filter-label">状态</div>
        <select class="form-select">
          <option>全部状态</option><option>启用</option><option>停用</option>
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
            <th style="min-width:220px;">菜单名称</th><th>类型</th><th>路由地址</th>
            <th>权限标识</th><th style="width:64px;">顺序</th><th>状态</th>
            <th>是否显示</th><th style="width:180px;">操作</th>
          </tr>
        </thead>
        <tbody id="menu-tbody">
          ${Pages.MENU_TREE.map(n => Pages.menuRow(n, 0)).join('')}
        </tbody>
      </table>
    </div>
  </div>
  `;
};

Pages.menuFindNode = function(id, list) {
  list = list || Pages.MENU_TREE;
  for (const n of list) {
    if (n.id === id) return n;
    if (n.children) {
      const found = Pages.menuFindNode(id, n.children);
      if (found) return found;
    }
  }
  return null;
};

Pages.menuToggle = function(id, el) {
  const collapsed = el.textContent.trim() === '▼';
  el.textContent = collapsed ? '▶' : '▼';
  const hide = node => {
    node.children.forEach(c => {
      const row = document.querySelector(`tr[data-mid="${c.id}"]`);
      if (row) row.style.display = collapsed ? 'none' : '';
      if (c.children && c.children.length) {
        if (!collapsed) {
          const t = row && row.querySelector('.menu-tree-toggle');
          if (t && t.textContent.trim() === '▶') return;
        }
        hide(c);
      }
    });
  };
  const node = Pages.menuFindNode(id);
  if (node) hide(node);
};

Pages.menuToggleAll = function(btn) {
  Pages.menuExpanded = !Pages.menuExpanded;
  btn.textContent = Pages.menuExpanded ? '收起全部' : '展开全部';
  document.querySelectorAll('#menu-tbody tr').forEach(row => {
    row.style.display = (Pages.menuExpanded || row.dataset.level === '0') ? '' : 'none';
    const t = row.querySelector('.menu-tree-toggle');
    if (t && t.style.visibility !== 'hidden') t.textContent = Pages.menuExpanded ? '▼' : '▶';
  });
};

Pages.menuTypeChange = function(val) {
  const iconRow = document.getElementById('menu-f-icon');
  const routeRow = document.getElementById('menu-f-route');
  const permLabel = document.getElementById('menu-f-perm-label');
  if (iconRow) iconRow.style.display = val === '按钮' ? 'none' : '';
  if (routeRow) routeRow.style.display = val === '菜单' ? '' : 'none';
  if (permLabel) permLabel.textContent = val === '目录' ? '权限标识' : '权限标识';
};

Pages.menuModal = function(editId, parentId) {
  const node = editId ? Pages.menuFindNode(editId) : null;
  const parent = parentId ? Pages.menuFindNode(parentId) : null;
  const type = node ? node.type : '菜单';
  const parentOptions = (list, level) => list.map(n => {
    let s = n.type !== '按钮' ? `<option value="${n.id}" ${(parent && parent.id === n.id) || (node && Pages.menuParentOf(node.id) === n.id) ? 'selected' : ''}>${'　'.repeat(level)}${n.name}</option>` : '';
    if (n.children && n.children.length) s += parentOptions(n.children, level + 1);
    return s;
  }).join('');
  DPP.openModal(node ? `编辑菜单「${node.name}」` : '新增菜单', `
    <div class="form-item">
      <label class="form-label required">上级菜单</label>
      <select class="form-select" id="menu-f-parent">
        <option value="">根目录</option>
        ${parentOptions(Pages.MENU_TREE, 0)}
      </select>
    </div>
    <div class="form-item">
      <label class="form-label required">菜单类型</label>
      <div class="menu-type-group">
        ${['目录', '菜单', '按钮'].map(t => `
          <label class="menu-type-option"><input type="radio" name="menu-type" value="${t}" ${t === type ? 'checked' : ''} onchange="Pages.menuTypeChange('${t}')">${t}</label>
        `).join('')}
      </div>
    </div>
    <div class="form-row">
      <div class="form-item">
        <label class="form-label required">菜单名称</label>
        <input type="text" class="form-input" placeholder="请输入菜单名称" value="${node ? node.name : ''}">
      </div>
      <div class="form-item" id="menu-f-icon" style="display:${type === '按钮' ? 'none' : ''};">
        <label class="form-label">菜单图标</label>
        <select class="form-select">
          <option value="">无图标</option>
          ${['dashboard','database','sync','upload','ticket','folder','filter','edit','tool','check','chart','package','user','shield','org','tenant','menu','setting','key','log'].map(ic => `<option ${node && node.icon === ic ? 'selected' : ''}>${ic}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-item" id="menu-f-route" style="display:${type === '菜单' ? '' : 'none'};">
        <label class="form-label required">路由地址</label>
        <input type="text" class="form-input" placeholder="例如 /system/menu" value="${node ? node.route : ''}">
      </div>
      <div class="form-item">
        <label class="form-label" id="menu-f-perm-label">权限标识</label>
        <input type="text" class="form-input" placeholder="例如 system:menu:list" value="${node ? node.perm : ''}">
      </div>
    </div>
    <div class="form-row">
      <div class="form-item">
        <label class="form-label required">显示顺序</label>
        <input type="number" class="form-input" min="0" value="${node ? node.order : 1}">
      </div>
      <div class="form-item">
        <label class="form-label required">菜单状态</label>
        <div class="menu-type-group" style="height:36px;">
          <label class="menu-type-option"><input type="radio" name="menu-status" ${!node || node.status === '启用' ? 'checked' : ''}>启用</label>
          <label class="menu-type-option"><input type="radio" name="menu-status" ${node && node.status === '停用' ? 'checked' : ''}>停用</label>
        </div>
      </div>
      <div class="form-item">
        <label class="form-label required">是否显示</label>
        <div class="menu-type-group" style="height:36px;">
          <label class="menu-type-option"><input type="radio" name="menu-visible" ${!node || node.visible === '显示' ? 'checked' : ''}>显示</label>
          <label class="menu-type-option"><input type="radio" name="menu-visible" ${node && node.visible === '隐藏' ? 'checked' : ''}>隐藏</label>
        </div>
      </div>
    </div>
  `, () => DPP.toast(node ? '菜单已更新' : '菜单创建成功', 'success'), { confirmText: node ? '保存' : '创建' });
};

Pages.menuParentOf = function(id, list, parent) {
  list = list || Pages.MENU_TREE;
  for (const n of list) {
    if (n.id === id) return parent ? parent.id : '';
    if (n.children) {
      const r = Pages.menuParentOf(id, n.children, n);
      if (r !== null) return r;
    }
  }
  return null;
};

Pages.menuDelete = function(id, name) {
  const node = Pages.menuFindNode(id);
  const hasChildren = node && node.children && node.children.length > 0;
  DPP.confirm('删除菜单', `确定删除「${name}」吗？`, () => DPP.toast('菜单已删除', 'success'), {
    danger: true,
    confirmText: '删除',
    hint: hasChildren ? '该菜单包含子级菜单，删除后子级将一并移除。' : '删除后相关角色将失去该菜单的访问权限。'
  });
};
