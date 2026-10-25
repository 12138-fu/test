/* DPP Pages - Part 3: Quality, Evaluate, Package, User, Role, Org, Logs */


Pages.quality = function() {
  return `
  <div class="page-header">
    <div>
      <div class="page-title">质量校验</div>
      <div class="page-subtitle">标注质量检查与审核，支持抽样质检和全量质检</div>
    </div>
    <div class="page-actions">
      <button class="btn" onclick="DPP.toast('质量报表生成中，请稍候', 'info')">${DPP.icon('chart')} 质量报表</button>
      <button class="btn btn-primary" onclick="Pages.qualityModal()">${DPP.icon('plus')} 创建质检任务</button>
    </div>
  </div>

  <div class="stat-grid">
    <div class="stat-card">
      <div class="stat-label">总合格率</div>
      <div class="stat-value">94.2%</div>
      <div class="stat-trend up">↑ 1.5% 较上周</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Kappa 系数</div>
      <div class="stat-value">0.87</div>
      <div class="stat-trend up">↑ 0.03 较高一致性</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">已质检样本</div>
      <div class="stat-value">45,280</div>
      <div class="stat-trend">抽样率 15%</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">待审核</div>
      <div class="stat-value">1,256</div>
      <div class="stat-trend down">↓ 234 待处理</div>
    </div>
  </div>

  <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 16px; margin-bottom: 16px;">
    <div class="card">
      <div class="card-header">
        <div class="card-title">质量趋势</div>
        <select class="form-select" style="width: 120px; height: 32px;">
          <option>近7天</option>
          <option>近30天</option>
          <option>近90天</option>
        </select>
      </div>
      <div class="card-body">
        <div class="chart-area">
          ${[92, 91, 93, 94, 92, 95, 94].map((v, i) => `
            <div class="chart-bar" style="height: ${v}%;">
              <div class="chart-bar-value">${v}%</div>
              <div class="chart-bar-label">${i+1}/10</div>
            </div>
          `).join('')}
        </div>
        <div style="height: 40px;"></div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">错误类型分布</div>
      </div>
      <div class="card-body">
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${[
            { name: '漏标', value: 35, color: 'var(--dpp-error)' },
            { name: '标签错误', value: 28, color: 'var(--dpp-warning)' },
            { name: '边界不准', value: 22, color: 'var(--dpp-accent)' },
            { name: '属性错误', value: 10, color: 'var(--dpp-accent-secondary)' },
            { name: '其他', value: 5, color: 'var(--dpp-muted)' }
          ].map(item => `
            <div>
              <div class="od-row" style="justify-content: space-between; margin-bottom: 4px;">
                <span style="font-size: 13px;">${item.name}</span>
                <span style="font-size: 13px; font-weight: 500;">${item.value}%</span>
              </div>
              <div class="progress" style="height: 6px;">
                <div class="progress-bar" style="width: ${item.value * 2}%; background: ${item.color};"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <div class="card-title">质检任务</div>
    </div>
    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th>任务名称</th>
            <th>关联项目</th>
            <th>质检方式</th>
            <th>抽样率</th>
            <th>样本量</th>
            <th>合格率</th>
            <th>质检人</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          ${[
            { name: '政务语料-第3轮质检', project: '政务问答语料标注', type: '全量质检', rate: '100%', count: '10,000', pass: '96.5%', person: '李审核', status: '已完成', tag: 'success' },
            { name: '工业图像-随机抽样质检', project: '工业质检缺陷标注', type: '抽样质检', rate: '20%', count: '6,000', pass: '91.2%', person: '王审核', status: '进行中', tag: 'primary' },
            { name: '语音标注-交叉质检', project: '客服语音转写标注', type: '交叉质检', rate: '30%', count: '2,688', pass: '97.8%', person: '张审核', status: '已完成', tag: 'success' },
            { name: '视频标注-专项质检', project: '道路目标检测标注', type: '抽样质检', rate: '15%', count: '351', pass: '-', person: '待分配', status: '待开始', tag: 'default' },
            { name: '医疗影像-疑难案例复核', project: '医疗影像分割标注', type: '专项质检', rate: '5%', count: '500', pass: '88.5%', person: '赵审核', status: '有异议', tag: 'warning' }
          ].map(row => `
            <tr>
              <td class="font-medium">${row.name}</td>
              <td>${row.project}</td>
              <td><span class="tag tag-info">${row.type}</span></td>
              <td>${row.rate}</td>
              <td>${row.count}</td>
              <td class="font-medium" style="color: ${row.pass === '-' ? 'var(--dpp-muted)' : (parseFloat(row.pass) >= 95 ? 'var(--dpp-success)' : parseFloat(row.pass) >= 90 ? 'var(--dpp-warning)' : 'var(--dpp-error)')};">${row.pass}</td>
              <td>${row.person}</td>
              <td><span class="tag tag-${row.tag}">${row.status}</span></td>
              <td>
                <button class="btn btn-text btn-sm" onclick="DPP.openModal('质检任务详情', '<div class=&quot;desc-grid&quot; style=&quot;grid-template-columns: repeat(2, 1fr);&quot;><div class=&quot;desc-item&quot;><div class=&quot;desc-label&quot;>任务名称</div><div class=&quot;desc-value&quot;>${row.name}</div></div><div class=&quot;desc-item&quot;><div class=&quot;desc-label&quot;>关联项目</div><div class=&quot;desc-value&quot;>${row.project}</div></div><div class=&quot;desc-item&quot;><div class=&quot;desc-label&quot;>质检方式</div><div class=&quot;desc-value&quot;>${row.type}</div></div><div class=&quot;desc-item&quot;><div class=&quot;desc-label&quot;>抽样率</div><div class=&quot;desc-value&quot;>${row.rate}</div></div><div class=&quot;desc-item&quot;><div class=&quot;desc-label&quot;>样本量</div><div class=&quot;desc-value&quot;>${row.count}</div></div><div class=&quot;desc-item&quot;><div class=&quot;desc-label&quot;>质检人</div><div class=&quot;desc-value&quot;>${row.person}</div></div></div>', null, { hideFooter: true })">详情</button>
                <button class="btn btn-text btn-sm" onclick="DPP.toast('合格率 ${row.pass} · 质检结果已导出', 'success')">结果</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>
  `;
};

Pages.qualityModal = function() {
  DPP.openModal('创建质检任务', `
    <div class="form-item">
      <label class="form-label required">任务名称</label>
      <input type="text" class="form-input" placeholder="请输入任务名称">
    </div>
    <div class="form-row">
      <div class="form-item">
        <label class="form-label required">关联项目</label>
        <select class="form-select">
          <option>政务问答语料标注-第2期</option>
          <option>工业质检缺陷标注</option>
          <option>道路目标检测标注</option>
          <option>医疗影像分割标注</option>
        </select>
      </div>
      <div class="form-item">
        <label class="form-label required">质检方式</label>
        <select class="form-select">
          <option>抽样质检</option><option>全量质检</option>
          <option>交叉质检</option><option>专项质检</option>
        </select>
      </div>
    </div>
    <div class="form-row" style="margin-bottom: 0;">
      <div class="form-item">
        <label class="form-label required">抽样率</label>
        <input type="text" class="form-input" value="15%">
      </div>
      <div class="form-item">
        <label class="form-label required">质检人</label>
        <select class="form-select">
          <option>李审核</option><option>王审核</option>
          <option>张审核</option><option>赵审核</option>
        </select>
      </div>
    </div>
  `, () => DPP.toast('质检任务创建成功', 'success'), { confirmText: '创建' });
};

Pages.evaluate = function() {
  return `
  <div class="page-header">
    <div>
      <div class="page-title">数据集测评</div>
      <div class="page-subtitle">从说明文档、数据质量、模型应用三维度评估数据集</div>
    </div>
    <div class="page-actions">
      <button class="btn" onclick="DPP.toast('测评报告汇总生成中，请稍候', 'info')">${DPP.icon('chart')} 测评报告</button>
      <button class="btn btn-primary" onclick="Pages.evaluateModal()">${DPP.icon('plus')} 发起测评</button>
    </div>
  </div>

  <div class="stat-grid">
    <div class="stat-card">
      <div class="stat-label">已测评数据集</div>
      <div class="stat-value">42</div>
      <div class="stat-trend up">↑ 本月 8 个</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">合格率</div>
      <div class="stat-value">85.7%</div>
      <div class="stat-trend">36/42 通过</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">平均分</div>
      <div class="stat-value">92.3</div>
      <div class="stat-trend up">↑ 1.8 分</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">待测评</div>
      <div class="stat-value">6</div>
      <div class="stat-trend down">↓ 2 待处理</div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <div class="card-title">测评指标体系</div>
      <span class="tag tag-primary">三维均 ≥90 且无否决 = PASS</span>
    </div>
    <div class="card-body">
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
        <div style="text-align: center; padding: 20px; background: rgba(63,128,255,.05); border-radius: var(--dpp-radius-lg); border: 1px solid rgba(63,128,255,.2);">
          <div style="font-size: 36px; margin-bottom: 8px;">📄</div>
          <div class="font-medium text-lg">说明文档</div>
          <div class="text-sm text-muted mt-8">完整性 · 规范性 · 可追溯性</div>
          <div style="font-size: 24px; font-weight: 500; color: var(--dpp-accent); margin-top: 12px;">94.5 分</div>
        </div>
        <div style="text-align: center; padding: 20px; background: rgba(82,196,26,.05); border-radius: var(--dpp-radius-lg); border: 1px solid rgba(82,196,26,.2);">
          <div style="font-size: 36px; margin-bottom: 8px;">📊</div>
          <div class="font-medium text-lg">数据质量</div>
          <div class="text-sm text-muted mt-8">准确性 · 完整性 · 一致性</div>
          <div style="font-size: 24px; font-weight: 500; color: var(--dpp-success); margin-top: 12px;">91.2 分</div>
        </div>
        <div style="text-align: center; padding: 20px; background: rgba(114,46,209,.05); border-radius: var(--dpp-radius-lg); border: 1px solid rgba(114,46,209,.2);">
          <div style="font-size: 36px; margin-bottom: 8px;">🤖</div>
          <div class="font-medium text-lg">模型应用</div>
          <div class="text-sm text-muted mt-8">有效性 · 泛化性 · 安全性</div>
          <div style="font-size: 24px; font-weight: 500; color: #722ed1; margin-top: 12px;">89.8 分</div>
        </div>
      </div>
    </div>
  </div>

  <div class="card" style="margin-top: 16px;">
    <div class="card-header">
      <div class="card-title">测评任务列表</div>
    </div>
    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th>测评编号</th>
            <th>数据集名称</th>
            <th>说明文档</th>
            <th>数据质量</th>
            <th>模型应用</th>
            <th>综合得分</th>
            <th>结果</th>
            <th>测评人</th>
            <th>测评时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          ${[
            { id: 'EV-20241020-001', name: '政务问答语料 v2', doc: 95, dq: 92, model: 91, total: 92.7, result: '通过', tag: 'success', person: '测评-张工', time: '2024-10-20 15:30' },
            { id: 'EV-20241019-002', name: '工业质检图像数据集', doc: 88, dq: 90, model: 85, total: 87.7, result: '未通过', tag: 'error', person: '测评-李工', time: '2024-10-19 14:00' },
            { id: 'EV-20241018-003', name: '客服语音识别语料', doc: 96, dq: 94, model: 93, total: 94.3, result: '通过', tag: 'success', person: '测评-王工', time: '2024-10-18 10:20' },
            { id: 'EV-20241017-004', name: '道路场景视频标注', doc: 92, dq: 88, model: 90, total: 90.0, result: '通过', tag: 'success', person: '测评-赵工', time: '2024-10-17 16:45' },
            { id: 'EV-20241016-005', name: '政策法规结构化数据', doc: 98, dq: 96, model: 95, total: 96.3, result: '通过', tag: 'success', person: '测评-张工', time: '2024-10-16 11:30' },
            { id: 'EV-20241022-006', name: '医疗影像分割数据集', doc: 85, dq: '-', model: '-', total: '-', result: '测评中', tag: 'warning', person: '测评-陈工', time: '进行中' }
          ].map(row => `
            <tr>
              <td><a href="javascript:void(0)" class="font-medium" onclick="Pages.openDatasetDetail('${row.name.replace(/ v\d+$/, '')}')">${row.id}</a></td>
              <td>${row.name}</td>
              <td>${row.doc}${row.doc !== '-' ? '分' : ''}</td>
              <td>${row.dq}${row.dq !== '-' ? '分' : ''}</td>
              <td>${row.model}${row.model !== '-' ? '分' : ''}</td>
              <td class="font-medium" style="color: ${row.total === '-' ? 'var(--dpp-muted)' : (parseFloat(row.total) >= 90 ? 'var(--dpp-success)' : 'var(--dpp-error)')};">${row.total === '-' ? '-' : row.total + ' 分'}</td>
              <td><span class="tag tag-${row.tag}">${row.result}</span></td>
              <td>${row.person}</td>
              <td style="color: var(--dpp-muted); font-size: 13px;">${row.time}</td>
              <td>
                <button class="btn btn-text btn-sm" onclick="Pages.openDatasetDetail('${row.name.replace(/ v\d+$/, '')}')">详情</button>
                <button class="btn btn-text btn-sm" onclick="DPP.toast('测评报告 ${row.id} 导出成功', 'success')">报告</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>
  `;
};

Pages.evaluateModal = function() {
  DPP.openModal('发起数据集测评', `
    <div class="form-item">
      <label class="form-label required">测评数据集</label>
      <select class="form-select">
        <option>政务问答语料数据集</option>
        <option>工业质检图像数据集</option>
        <option>客服语音识别语料</option>
        <option>道路场景视频标注</option>
        <option>医疗影像分割数据集</option>
      </select>
    </div>
    <div class="form-row">
      <div class="form-item">
        <label class="form-label required">测评维度</label>
        <select class="form-select">
          <option>三维全量测评</option>
          <option>仅说明文档</option>
          <option>仅数据质量</option>
          <option>仅模型应用</option>
        </select>
      </div>
      <div class="form-item">
        <label class="form-label required">测评人</label>
        <select class="form-select">
          <option>测评-张工</option><option>测评-李工</option>
          <option>测评-王工</option><option>测评-赵工</option>
        </select>
      </div>
    </div>
    <div class="form-item" style="margin-bottom: 0;">
      <label class="form-label">备注</label>
      <textarea class="form-textarea" placeholder="选填，测评关注点说明"></textarea>
    </div>
  `, () => DPP.toast('测评任务已发起', 'success'), { confirmText: '发起' });
};

Pages.user = function() {
  return `
  <div class="page-header">
    <div>
      <div class="page-title">用户管理</div>
      <div class="page-subtitle">管理平台用户账号，支持增删改查与状态管控</div>
    </div>
    <div class="page-actions">
      <button class="btn" onclick="DPP.toast('请下载模板后批量导入用户（原型演示）', 'info')">${DPP.icon('upload')} 批量导入</button>
      <button class="btn btn-primary" onclick="Pages.userModal()">${DPP.icon('plus')} 新增用户</button>
    </div>
  </div>

  <div class="card">
    <div class="filter-bar">
      <div class="filter-item">
        <div class="filter-label">用户名</div>
        <input type="text" class="form-input" placeholder="请输入用户名">
      </div>
      <div class="filter-item">
        <div class="filter-label">姓名</div>
        <input type="text" class="form-input" placeholder="请输入姓名">
      </div>
      <div class="filter-item">
        <div class="filter-label">所属机构</div>
        <select class="form-select">
          <option>全部机构</option>
          <option>青阳市大数据中心</option>
          <option>政务服务管理局</option>
        </select>
      </div>
      <div class="filter-item">
        <div class="filter-label">状态</div>
        <select class="form-select">
          <option>全部状态</option>
          <option>启用</option>
          <option>禁用</option>
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
            <th>用户名</th><th>姓名</th><th>手机号</th><th>邮箱</th>
            <th>所属机构</th><th>角色</th><th>状态</th><th>最后登录</th><th>操作</th>
          </tr>
        </thead>
        <tbody>
          ${[
            { u: 'admin', n: '系统管理员', p: '138****0001', e: 'admin@dpp.local', o: '平台管理', r: '平台管理员', s: '启用', t: 'success', l: '2024-10-22 09:00' },
            { u: 'zhangming', n: '张明', p: '139****1234', e: 'zhangming@qb.gov.cn', o: '大数据中心', r: '项目负责人', s: '启用', t: 'success', l: '2024-10-22 08:45' },
            { u: 'liwei', n: '李伟', p: '138****5678', e: 'liwei@qb.gov.cn', o: '大数据中心', r: '数据加工', s: '启用', t: 'success', l: '2024-10-22 08:30' },
            { u: 'wangfang', n: '王芳', p: '137****9012', e: 'wangfang@qb.gov.cn', o: '12345热线', r: '标注员', s: '启用', t: 'success', l: '2024-10-21 17:20' },
            { u: 'zhaoqiang', n: '赵强', p: '136****3456', e: 'zhaoqiang@qb.gov.cn', o: '交通运输局', r: '审核员', s: '启用', t: 'success', l: '2024-10-21 16:00' },
            { u: 'chenjing', n: '陈静', p: '135****7890', e: 'chenjing@qb.gov.cn', o: '卫健局', r: '标注员', s: '启用', t: 'success', l: '2024-10-21 14:30' },
            { u: 'liuyang', n: '刘洋', p: '134****2345', e: 'liuyang@qb.gov.cn', o: '司法局', r: '测评员', s: '启用', t: 'success', l: '2024-10-20 10:15' },
            { u: 'sunlei', n: '孙磊', p: '133****6789', e: 'sunlei@qb.gov.cn', o: '交通运输局', r: '加工需求方', s: '禁用', t: 'default', l: '2024-10-15 09:00' },
            { u: 'zhouting', n: '周婷', p: '132****0123', e: 'zhouting@qb.gov.cn', o: '大数据中心', r: '标注员', s: '启用', t: 'success', l: '2024-10-22 08:50' }
          ].map(row => `
            <tr>
              <td><label class="checkbox"><input type="checkbox"><span class="checkbox-box"></span></label></td>
              <td class="font-medium">${row.u}</td>
              <td>
                <div class="od-row" style="gap: 8px;">
                  <div class="user-avatar" style="width:28px;height:28px;font-size:12px;">${row.n.charAt(0)}</div>
                  ${row.n}
                </div>
              </td>
              <td>${row.p}</td>
              <td style="font-size:13px;">${row.e}</td>
              <td>${row.o}</td>
              <td><span class="tag tag-primary">${row.r}</span></td>
              <td><span class="tag tag-${row.t}">${row.s}</span></td>
              <td style="color:var(--dpp-muted);font-size:13px;">${row.l}</td>
              <td>
                <button class="btn btn-text btn-sm" onclick="Pages.userModal('${row.u}', '${row.n}', '${row.o}', '${row.r}')">编辑</button>
                <button class="btn btn-text btn-sm" onclick="DPP.confirm('重置密码', '确定重置用户「${row.n}（${row.u}）」的登录密码吗？', () => DPP.toast('密码已重置，新密码已发送至用户邮箱', 'success'), { confirmText: '重置' })">重置密码</button>
                <button class="btn btn-text btn-sm" style="color:var(--dpp-error);" onclick="DPP.confirm('${row.s === '启用' ? '禁用' : '启用'}用户', '确定${row.s === '启用' ? '禁用' : '启用'}用户「${row.n}」吗？', () => DPP.toast('用户状态已更新', 'success'), { danger: ${row.s === '启用'}, confirmText: '${row.s === '启用' ? '禁用' : '启用'}' })">${row.s === '启用' ? '禁用' : '启用'}</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <span class="pagination-info">共 128 条</span>
      <button class="page-btn" disabled>‹</button>
      <button class="page-btn active">1</button>
      <button class="page-btn">2</button>
      <button class="page-btn">3</button>
      <button class="page-btn">4</button>
      <button class="page-btn">5</button>
      <button class="page-btn">›</button>
    </div>
  </div>
  `;
};

Pages.userModal = function(username, name, org, role) {
  const isEdit = !!username;
  DPP.openModal(isEdit ? '编辑用户' : '新增用户', `
    <div class="form-row">
      <div class="form-item">
        <label class="form-label required">用户名</label>
        <input type="text" class="form-input" placeholder="请输入用户名" value="${username || ''}" ${isEdit ? 'disabled' : ''}>
      </div>
      <div class="form-item">
        <label class="form-label required">姓名</label>
        <input type="text" class="form-input" placeholder="请输入姓名" value="${name || ''}">
      </div>
    </div>
    <div class="form-row">
      <div class="form-item">
        <label class="form-label required">手机号</label>
        <input type="text" class="form-input" placeholder="请输入手机号">
      </div>
      <div class="form-item">
        <label class="form-label">邮箱</label>
        <input type="text" class="form-input" placeholder="请输入邮箱">
      </div>
    </div>
    <div class="form-row" style="margin-bottom: 0;">
      <div class="form-item">
        <label class="form-label required">所属机构</label>
        <select class="form-select">
          ${['平台管理', '大数据中心', '12345热线', '交通运输局', '卫健局', '司法局'].map(o => `<option ${o === org ? 'selected' : ''}>${o}</option>`).join('')}
        </select>
      </div>
      <div class="form-item">
        <label class="form-label required">角色</label>
        <select class="form-select">
          ${['平台管理员', '加工需求方', '项目负责人', '数据加工', '标注员', '审核员', '测评员'].map(r => `<option ${r === role ? 'selected' : ''}>${r}</option>`).join('')}
        </select>
      </div>
    </div>
  `, () => DPP.toast(isEdit ? '用户信息已更新' : '用户创建成功', 'success'), { confirmText: isEdit ? '保存' : '创建' });
};

Pages.role = function() {
  return `
  <div class="page-header">
    <div>
      <div class="page-title">角色权限</div>
      <div class="page-subtitle">管理系统角色与权限配置，支持角色全生命周期管理</div>
    </div>
    <div class="page-actions">
      <button class="btn btn-primary" onclick="Pages.roleModal()">${DPP.icon('plus')} 新增角色</button>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:280px 1fr;gap:16px;">
    <div class="card">
      <div class="card-header"><div class="card-title">角色列表</div></div>
      <div class="tree">
        ${[
          { n: 'RA-01 平台管理员', c: 2, a: true },
          { n: 'RA-02 加工需求方', c: 15 },
          { n: 'RA-03 项目负责人', c: 8 },
          { n: 'RA-07 数据加工', c: 12 },
          { n: 'RA-04 标注员', c: 28 },
          { n: 'RA-05 审核员', c: 6 },
          { n: 'RA-06 测评员', c: 4 },
          { n: '自定义角色-质检组长', c: 3 },
          { n: '自定义角色-数据分析师', c: 2 }
        ].map(r => `
          <div class="tree-node ${r.a ? 'selected' : ''}" onclick="Pages.selectRole(this)">
            <span style="flex:1;">${r.n}</span>
            <span style="font-size:12px;color:var(--dpp-muted);">${r.c}人</span>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">权限配置 - RA-01 平台管理员</div>
        <div class="od-row" style="gap:8px;">
          <button class="btn btn-sm" onclick="DPP.toast('已复制角色，请修改名称后保存', 'success')">复制角色</button>
          <button class="btn btn-primary btn-sm" onclick="DPP.toast('权限配置已保存', 'success')">保存修改</button>
        </div>
      </div>
      <div style="padding:16px 24px;">
        ${[
          { m: '工作台', p: ['查看工作台', '数据概览', '快捷操作'] },
          { m: '数据接入', p: ['数据源管理', '同步任务管理', '数据上传', '接入配置'] },
          { m: '数据集管理', p: ['工单管理', '数据集列表', '预处理任务', '版本管理'] },
          { m: '标注中心', p: ['标注项目管理', '标注工作台', '任务分配', '质量校验', '标注统计'] },
          { m: '测评与交付', p: ['数据集测评', '封装交付', '授权管理', '下载管理'] },
          { m: '系统管理', p: ['用户管理', '角色权限', '组织架构', '租户管理', '菜单管理', '系统设置', '登录日志', '操作日志'] }
        ].map(g => `
          <div style="margin-bottom:20px;">
            <div class="od-row" style="gap:8px;margin-bottom:12px;">
              <label class="checkbox"><input type="checkbox" checked><span class="checkbox-box"></span></label>
              <span class="font-medium">${g.m}</span>
            </div>
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding-left:28px;">
              ${g.p.map(p => `
                <label class="checkbox"><input type="checkbox" checked><span class="checkbox-box"></span>${p}</label>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
  `;
};

Pages.roleModal = function() {
  DPP.openModal('新增角色', `
    <div class="form-item">
      <label class="form-label required">角色名称</label>
      <input type="text" class="form-input" placeholder="请输入角色名称">
    </div>
    <div class="form-item">
      <label class="form-label required">角色编码</label>
      <input type="text" class="form-input" placeholder="例如 RA-08">
    </div>
    <div class="form-item" style="margin-bottom: 0;">
      <label class="form-label">角色描述</label>
      <textarea class="form-textarea" placeholder="请描述该角色的职责与权限范围"></textarea>
    </div>
  `, () => DPP.toast('角色创建成功，请配置权限', 'success'), { confirmText: '创建' });
};

Pages.selectRole = function(el) {
  document.querySelectorAll('.tree .tree-node').forEach(n => n.classList.remove('selected'));
  el.classList.add('selected');
};

Pages.org = function() {
  return `
  <div class="page-header">
    <div>
      <div class="page-title">组织架构</div>
      <div class="page-subtitle">管理组织机构分级与分组，支持角色与组织关联配置</div>
    </div>
    <div class="page-actions">
      <button class="btn btn-primary" onclick="Pages.orgModal()">${DPP.icon('plus')} 新增机构</button>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:300px 1fr;gap:16px;">
    <div class="card">
      <div class="card-header"><div class="card-title">组织树</div></div>
      <div class="tree" style="padding:8px 12px;">
        <div class="tree-node font-medium"><span>▼</span><span>青阳市大数据中心</span></div>
        <div class="tree-children">
          <div class="tree-node"><span>▼</span><span>综合管理部</span></div>
          <div class="tree-children" style="padding-left:18px;">
            <div class="tree-node"><span>•</span><span>行政组</span></div>
            <div class="tree-node"><span>•</span><span>财务组</span></div>
          </div>
          <div class="tree-node selected"><span>▼</span><span>数据加工部</span></div>
          <div class="tree-children" style="padding-left:18px;">
            <div class="tree-node"><span>•</span><span>数据接入组</span></div>
            <div class="tree-node"><span>•</span><span>标注审核组</span></div>
            <div class="tree-node"><span>•</span><span>质量测评组</span></div>
          </div>
          <div class="tree-node"><span>▶</span><span>技术运维部</span></div>
          <div class="tree-node"><span>▶</span><span>安全合规部</span></div>
        </div>
        <div class="tree-node mt-8"><span>▶</span><span>政务服务管理局</span></div>
        <div class="tree-node"><span>▶</span><span>交通运输局</span></div>
        <div class="tree-node"><span>▶</span><span>卫生健康局</span></div>
        <div class="tree-node"><span>▶</span><span>司法局</span></div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">数据加工部 - 成员列表</div>
        <div class="od-row" style="gap:8px;">
          <button class="btn btn-sm" onclick="DPP.toast('组织调整面板打开中（原型演示）', 'info')">调整组织</button>
          <button class="btn btn-primary btn-sm" onclick="DPP.toast('成员添加面板打开中（原型演示）', 'info')">${DPP.icon('plus')} 添加成员</button>
        </div>
      </div>
      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th>姓名</th><th>用户名</th><th>职位</th><th>角色</th>
              <th>手机号</th><th>邮箱</th><th>状态</th><th>操作</th>
            </tr>
          </thead>
          <tbody>
            ${[
              { n: '张明', u: 'zhangming', p: '部门负责人', r: '项目负责人', ph: '139****1234', e: 'zhangming@qb.gov.cn', s: '启用', t: 'success' },
              { n: '李伟', u: 'liwei', p: '高级工程师', r: '数据加工', ph: '138****5678', e: 'liwei@qb.gov.cn', s: '启用', t: 'success' },
              { n: '王芳', u: 'wangfang', p: '标注组长', r: '标注员', ph: '137****9012', e: 'wangfang@qb.gov.cn', s: '启用', t: 'success' },
              { n: '赵强', u: 'zhaoqiang', p: '审核组长', r: '审核员', ph: '136****3456', e: 'zhaoqiang@qb.gov.cn', s: '启用', t: 'success' },
              { n: '刘洋', u: 'liuyang', p: '测评工程师', r: '测评员', ph: '134****2345', e: 'liuyang@qb.gov.cn', s: '启用', t: 'success' },
              { n: '周婷', u: 'zhouting', p: '标注员', r: '标注员', ph: '132****0123', e: 'zhouting@qb.gov.cn', s: '启用', t: 'success' }
            ].map(row => `
              <tr>
                <td>
                  <div class="od-row" style="gap:8px;">
                    <div class="user-avatar" style="width:28px;height:28px;font-size:12px;">${row.n.charAt(0)}</div>
                    <span class="font-medium">${row.n}</span>
                  </div>
                </td>
                <td>${row.u}</td>
                <td>${row.p}</td>
                <td><span class="tag tag-primary">${row.r}</span></td>
                <td>${row.ph}</td>
                <td style="font-size:13px;">${row.e}</td>
                <td><span class="tag tag-${row.t}">${row.s}</span></td>
                <td>
                  <button class="btn btn-text btn-sm" onclick="DPP.toast('编辑成员「${row.n}」（原型演示）', 'info')">编辑</button>
                  <button class="btn btn-text btn-sm" style="color: var(--dpp-error);" onclick="DPP.confirm('移除成员', '确定将「${row.n}」从数据加工部移除吗？', () => DPP.toast('成员已移除', 'success'), { danger: true, confirmText: '移除' })">移除</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  `;
};

Pages.orgModal = function() {
  DPP.openModal('新增机构', `
    <div class="form-item">
      <label class="form-label required">机构名称</label>
      <input type="text" class="form-input" placeholder="请输入机构名称">
    </div>
    <div class="form-item">
      <label class="form-label required">上级机构</label>
      <select class="form-select">
        <option>青阳市大数据中心</option>
        <option>综合管理部</option>
        <option>数据加工部</option>
        <option>技术运维部</option>
        <option>安全合规部</option>
      </select>
    </div>
    <div class="form-item" style="margin-bottom: 0;">
      <label class="form-label">机构说明</label>
      <textarea class="form-textarea" placeholder="选填，机构职能说明"></textarea>
    </div>
  `, () => DPP.toast('机构创建成功', 'success'), { confirmText: '创建' });
};

Pages.logs = function() {
  return `
  <div class="page-header">
    <div>
      <div class="page-title">操作日志</div>
      <div class="page-subtitle">完整记录所有用户操作日志，支持筛选与导出</div>
    </div>
    <div class="page-actions">
      <button class="btn" onclick="DPP.toast('操作日志导出任务已创建', 'success')">${DPP.icon('upload')} 导出日志</button>
    </div>
  </div>

  <div class="card">
    <div class="filter-bar">
      <div class="filter-item">
        <div class="filter-label">操作用户</div>
        <input type="text" class="form-input" placeholder="请输入用户名">
      </div>
      <div class="filter-item">
        <div class="filter-label">操作类型</div>
        <select class="form-select">
          <option>全部类型</option><option>新增</option><option>修改</option>
          <option>删除</option><option>查询</option><option>导出</option>
        </select>
      </div>
      <div class="filter-item">
        <div class="filter-label">操作模块</div>
        <select class="form-select">
          <option>全部模块</option><option>用户管理</option><option>角色权限</option>
          <option>数据集</option><option>标注任务</option>
        </select>
      </div>
      <div class="filter-item">
        <div class="filter-label">操作时间</div>
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
            <th style="width:50px;">序号</th><th>操作时间</th><th>操作用户</th>
            <th>所属机构</th><th>操作类型</th><th>操作模块</th>
            <th>操作内容</th><th>IP地址</th><th>操作结果</th>
          </tr>
        </thead>
        <tbody>
          ${[
            { t: '2024-10-22 10:32:15', u: 'admin', o: '平台管理', ty: '修改', m: '用户管理', c: '修改用户 zhangming 的角色为「项目负责人」', ip: '10.10.1.100', r: '成功', tag: 'success' },
            { t: '2024-10-22 10:28:42', u: 'zhangming', o: '大数据中心', ty: '新增', m: '标注任务', c: '创建标注项目「工业质检缺陷标注」', ip: '10.10.1.105', r: '成功', tag: 'success' },
            { t: '2024-10-22 10:15:30', u: 'liwei', o: '大数据中心', ty: '导出', m: '数据集', c: '导出数据集「政务问答语料 v2」元数据', ip: '10.10.1.106', r: '成功', tag: 'success' },
            { t: '2024-10-22 09:58:47', u: 'zhaoqiang', o: '交通运输局', ty: '修改', m: '质量校验', c: '更新质检任务「视频标注-专项质检」配置', ip: '10.10.3.20', r: '成功', tag: 'success' },
            { t: '2024-10-22 09:30:00', u: 'admin', o: '平台管理', ty: '新增', m: '角色权限', c: '新增自定义角色「质检组长」', ip: '10.10.1.100', r: '成功', tag: 'success' },
            { t: '2024-10-22 09:15:33', u: 'chenjing', o: '卫健局', ty: '查询', m: '数据集', c: '查看数据集「医疗影像分割」详情', ip: '10.10.4.30', r: '成功', tag: 'success' },
            { t: '2024-10-22 08:58:12', u: 'wangfang', o: '12345热线', ty: '删除', m: '预处理任务', c: '删除预处理任务「热线录音转写-清洗」', ip: '10.10.2.50', r: '成功', tag: 'success' },
            { t: '2024-10-22 08:40:05', u: 'liuyang', o: '大数据中心', ty: '修改', m: '封装交付', c: '重新发起封装任务「政务问答语料-交付包」', ip: '10.10.1.108', r: '失败', tag: 'error' },
            { t: '2024-10-22 08:22:41', u: 'admin', o: '平台管理', ty: '修改', m: '菜单管理', c: '调整菜单「质量校验」显示顺序为 3', ip: '10.10.1.100', r: '成功', tag: 'success' },
            { t: '2024-10-22 08:10:36', u: 'zhaoqiang', o: '交通运输局', ty: '导出', m: '操作日志', c: '导出 2024-10 操作日志报表', ip: '10.10.3.20', r: '成功', tag: 'success' }
          ].map((row, i) => `
            <tr>
              <td style="color:var(--dpp-muted);">${i + 1}</td>
              <td style="font-family:monospace;font-size:13px;">${row.t}</td>
              <td class="font-medium">${row.u}</td>
              <td>${row.o}</td>
              <td><span class="tag tag-info">${row.ty}</span></td>
              <td>${row.m}</td>
              <td style="max-width:300px;" class="od-truncate">${row.c}</td>
              <td style="font-family:monospace;font-size:13px;">${row.ip}</td>
              <td><span class="tag tag-${row.tag}">${row.r}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <span class="pagination-info">共 2,856 条</span>
      <button class="page-btn" disabled>‹</button>
      <button class="page-btn active">1</button>
      <button class="page-btn">2</button>
      <button class="page-btn">3</button>
      <button class="page-btn">4</button>
      <button class="page-btn">5</button>
      <span style="margin:0 8px;color:var(--dpp-muted);">...</span>
      <button class="page-btn">286</button>
      <button class="page-btn">›</button>
    </div>
  </div>
  `;
};

Pages.loginLogs = function() {
  return `
  <div class="page-header">
    <div>
      <div class="page-title">登录日志</div>
      <div class="page-subtitle">记录所有账号的登录与登出行为，异常登录自动标记</div>
    </div>
    <div class="page-actions">
      <button class="btn" onclick="DPP.toast('登录日志导出任务已创建', 'success')">${DPP.icon('upload')} 导出日志</button>
    </div>
  </div>

  <div class="card">
    <div class="filter-bar">
      <div class="filter-item">
        <div class="filter-label">登录用户</div>
        <input type="text" class="form-input" placeholder="请输入用户名">
      </div>
      <div class="filter-item">
        <div class="filter-label">登录结果</div>
        <select class="form-select">
          <option>全部结果</option><option>成功</option><option>失败</option>
        </select>
      </div>
      <div class="filter-item">
        <div class="filter-label">登录IP</div>
        <input type="text" class="form-input" placeholder="请输入 IP 地址">
      </div>
      <div class="filter-item">
        <div class="filter-label">登录时间</div>
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
            <th style="width:50px;">序号</th><th>登录时间</th><th>登录用户</th>
            <th>所属机构</th><th>登录IP</th><th>登录地点</th>
            <th>浏览器</th><th>操作系统</th><th>登录结果</th><th>提示信息</th>
          </tr>
        </thead>
        <tbody>
          ${[
            { t: '2024-10-22 10:05:18', u: 'wangfang', o: '12345热线', ip: '10.10.2.50', loc: '山东 青岛', b: 'Chrome 126', os: 'Windows 11', r: '成功', tag: 'success', msg: '登录成功' },
            { t: '2024-10-22 09:45:22', u: 'unknown', o: '-', ip: '10.10.5.100', loc: '未知', b: 'Firefox 130', os: 'Linux', r: '失败', tag: 'error', msg: '密码错误（第 3 次）' },
            { t: '2024-10-22 09:00:08', u: 'admin', o: '平台管理', ip: '10.10.1.100', loc: '山东 青岛', b: 'Chrome 126', os: 'Windows 11', r: '成功', tag: 'success', msg: '登录成功' },
            { t: '2024-10-22 08:45:20', u: 'zhangming', o: '大数据中心', ip: '10.10.1.105', loc: '山东 青岛', b: 'Edge 126', os: 'Windows 10', r: '成功', tag: 'success', msg: '登录成功' },
            { t: '2024-10-22 08:31:02', u: 'chenjing', o: '卫健局', ip: '10.10.4.30', loc: '山东 青岛', b: 'Chrome 125', os: 'macOS 14', r: '成功', tag: 'success', msg: '登录成功' },
            { t: '2024-10-22 08:12:47', u: 'liwei', o: '大数据中心', ip: '10.10.1.106', loc: '山东 青岛', b: 'Chrome 126', os: 'Windows 11', r: '成功', tag: 'success', msg: '登录成功' },
            { t: '2024-10-21 22:40:15', u: 'zhaoqiang', o: '交通运输局', ip: '10.10.6.88', loc: '异地登录', b: 'Safari 17', os: 'iOS 17', r: '失败', tag: 'error', msg: '非常用设备，已拦截' },
            { t: '2024-10-21 18:05:33', u: 'liuyang', o: '大数据中心', ip: '10.10.1.108', loc: '山东 青岛', b: 'Chrome 126', os: 'Windows 11', r: '成功', tag: 'success', msg: '登出系统' },
            { t: '2024-10-21 17:52:10', u: 'wangfang', o: '12345热线', ip: '10.10.2.50', loc: '山东 青岛', b: 'Chrome 126', os: 'Windows 11', r: '成功', tag: 'success', msg: '登出系统' },
            { t: '2024-10-21 09:20:41', u: 'admin', o: '平台管理', ip: '10.10.1.100', loc: '山东 青岛', b: 'Chrome 126', os: 'Windows 11', r: '成功', tag: 'success', msg: '登录成功' }
          ].map((row, i) => `
            <tr>
              <td style="color:var(--dpp-muted);">${i + 1}</td>
              <td style="font-family:monospace;font-size:13px;">${row.t}</td>
              <td class="font-medium">${row.u}</td>
              <td>${row.o}</td>
              <td style="font-family:monospace;font-size:13px;">${row.ip}</td>
              <td>${row.loc}</td>
              <td style="font-size:13px;">${row.b}</td>
              <td style="font-size:13px;">${row.os}</td>
              <td><span class="tag tag-${row.tag}">${row.r}</span></td>
              <td style="max-width:200px;" class="od-truncate">${row.msg}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <span class="pagination-info">共 1,024 条</span>
      <button class="page-btn" disabled>‹</button>
      <button class="page-btn active">1</button>
      <button class="page-btn">2</button>
      <button class="page-btn">3</button>
      <span style="margin:0 8px;color:var(--dpp-muted);">...</span>
      <button class="page-btn">103</button>
      <button class="page-btn">›</button>
    </div>
  </div>
  `;
};

/* 封装交付支持的导出格式，与标注工作台导出能力对齐 */
const PKG_FORMATS = [
  { v: 'JSON', desc: '原始 JSON 格式条目列表，存储于单个 JSON 文件，同时导出数据与标注结果，即 Label Studio 通用格式' },
  { v: 'JSON-MIN', desc: '仅导出原始 JSON 中 from_name、to_name 字段的取值，仅包含标注结果' },
  { v: 'CSV', desc: '以逗号分隔存储结果，列名由 from_name 与 to_name 字段值指定' },
  { v: 'TSV', desc: '以制表符分隔的表格文件，列名由 from_name 与 to_name 字段值指定' },
  { v: 'COCO', tags: ['图像分割', '目标检测', '关键点'], desc: 'COCO 数据集常用的机器学习格式，适用于多边形与矩形框的目标检测、图像分割任务' },
  { v: 'COCO 含图片', tags: ['图像分割', '目标检测', '关键点'], desc: 'COCO 格式，同时打包下载图片文件' },
  { v: 'YOLO', tags: ['图像分割', '目标检测', '关键点'], desc: '为每张图片生成对应 TXT 文件，包含目标类别、目标坐标、高度与宽度' },
  { v: 'YOLO 含图片', tags: ['图像分割', '目标检测', '关键点'], desc: 'YOLO 格式，同时打包下载图片文件' },
  { v: 'YOLOv8 OBB', tags: ['图像分割', '目标检测'], desc: '为每张图片生成对应 TXT 文件，旋转框以四个角点 0-1 归一化坐标表示，支持旋转目标导出' },
  { v: 'YOLOv8 OBB 含图片', tags: ['图像分割', '目标检测'], desc: 'YOLOv8 OBB 格式，同时打包下载图片文件' }
];

Pages.pkgFmtPick = function(el) {
  el.closest('.fmt-list').querySelectorAll('.fmt-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  el.querySelector('input').checked = true;
};

Pages.packageModal = function() {
  DPP.openModal('新建封装', `
    <div class="form-item">
      <label class="form-label required">选择数据集</label>
      <select class="form-select">
        ${DS_ROWS.map(d => `<option>${d.name}（${d.ver}）</option>`).join('')}
      </select>
    </div>
    <div class="form-item">
      <label class="form-label required">封装格式</label>
      <div class="fmt-list">
        ${PKG_FORMATS.map((f, i) => `
          <label class="fmt-option ${i === 0 ? 'selected' : ''}" onclick="Pages.pkgFmtPick(this)">
            <input type="radio" name="pkg-format" value="${f.v}" ${i === 0 ? 'checked' : ''} style="display:none;">
            <span class="fmt-radio"></span>
            <span style="flex:1;">
              <span class="fmt-name">${f.v}${(f.tags || []).map(t => `<span class="fmt-tag">${t}</span>`).join('')}</span>
              <span class="fmt-desc">${f.desc}</span>
            </span>
          </label>
        `).join('')}
      </div>
    </div>
    <div class="form-item">
      <label class="form-label required">授权方式</label>
      <select class="form-select">
        <option>公开授权</option><option>机构授权</option><option>协议签署</option>
      </select>
    </div>
    <div class="form-item" style="margin-bottom: 0;">
      <label class="form-label">封装说明</label>
      <textarea class="form-textarea" placeholder="选填，本次封装的内容说明"></textarea>
    </div>
  `, () => DPP.toast('封装任务已创建，正在后台执行', 'success'), { confirmText: '创建' });
};

Pages.packagePage = function() {
  return `
  <div class="page-header">
    <div>
      <div class="page-title">封装交付</div>
      <div class="page-subtitle">数据集封装、版本管理、授权与下载</div>
    </div>
    <div class="page-actions">
      <button class="btn" onclick="DPP.toast('封装记录加载中（原型演示）', 'info')">${DPP.icon('package')} 封装记录</button>
      <button class="btn btn-primary" onclick="Pages.packageModal()">${DPP.icon('plus')} 新建封装</button>
    </div>
  </div>

  <div class="stat-grid">
    <div class="stat-card"><div class="stat-label">已封装版本</div><div class="stat-value">54</div><div class="stat-trend up">↑ 本月 12 个</div></div>
    <div class="stat-card"><div class="stat-label">授权下载</div><div class="stat-value">128 次</div><div class="stat-trend up">↑ 28 次本月</div></div>
    <div class="stat-card"><div class="stat-label">存储总量</div><div class="stat-value">356 GB</div><div class="stat-trend">28 个封装包</div></div>
    <div class="stat-card"><div class="stat-label">协议签署</div><div class="stat-value">42 份</div><div class="stat-trend up">↑ 6 份本月</div></div>
  </div>

  <div class="card">
    <div class="tabs">
      <div class="tab-item active">封装包</div>
      <div class="tab-item">授权管理</div>
      <div class="tab-item">下载记录</div>
    </div>

    <div class="filter-bar">
      <div class="filter-item"><div class="filter-label">数据集名称</div><input type="text" class="form-input" placeholder="请输入名称"></div>
      <div class="filter-item"><div class="filter-label">封装格式</div><select class="form-select"><option>全部格式</option>${PKG_FORMATS.map(f => `<option>${f.v}</option>`).join('')}</select></div>
      <div class="filter-item"><div class="filter-label">状态</div><select class="form-select"><option>全部状态</option><option>封装中</option><option>已完成</option><option>已授权</option></select></div>
      <div class="filter-actions"><button class="btn">重置</button><button class="btn btn-primary">查询</button></div>
    </div>

    <div class="table-wrap" style="margin-top:8px;">
      <table class="table">
        <thead><tr>
          <th>封装包名称</th><th>版本</th><th>格式</th>
          <th>样本量</th><th>大小</th><th>授权方式</th>
          <th>状态</th><th>创建时间</th><th>操作</th>
        </tr></thead>
        <tbody>
          ${[
            { n: '政务问答语料数据集', v: 'seal_v2.1', f: 'JSON', c: '128,560', s: '256 MB', a: '公开授权', st: '已发布', t: 'success', tm: '2024-10-22 10:30' },
            { n: '工业质检图像数据集', v: 'seal_v1.0', f: 'COCO 含图片', c: '30,000', s: '8.5 GB', a: '机构授权', st: '封装中', t: 'primary', tm: '2024-10-22 09:00' },
            { n: '客服语音识别语料', v: 'seal_v1.0', f: 'CSV', c: '8,960', s: '12.3 GB', a: '协议签署', st: '已发布', t: 'success', tm: '2024-10-20 14:20' },
            { n: '道路场景视频标注', v: 'seal_v2.0', f: 'YOLOv8 OBB 含图片', c: '2,340', s: '45.2 GB', a: '机构授权', st: '已发布', t: 'success', tm: '2024-10-19 16:00' },
            { n: '政策法规结构化数据', v: 'seal_v1.2', f: 'JSON-MIN', c: '56,800', s: '128 MB', a: '公开授权', st: '已发布', t: 'success', tm: '2024-10-18 11:30' },
            { n: '交通出行OD数据集', v: 'seal_v1.0', f: 'TSV', c: '2.1M', s: '512 MB', a: '公开授权', st: '已发布', t: 'success', tm: '2024-10-17 09:45' }
          ].map(r => `
            <tr>
              <td class="font-medium">${r.n}</td>
              <td><code style="font-size:13px;background:var(--dpp-bg);padding:2px 6px;border-radius:2px;">${r.v}</code></td>
              <td><span class="tag tag-info">${r.f}</span></td>
              <td>${r.c}</td>
              <td>${r.s}</td>
              <td><span class="tag tag-default">${r.a}</span></td>
              <td><span class="tag tag-${r.t}">${r.st}</span></td>
              <td style="color:var(--dpp-muted);font-size:13px;">${r.tm}</td>
              <td>
                <button class="btn btn-text btn-sm" onclick="Pages.openDatasetDetail('${r.n}')">详情</button>
                <button class="btn btn-text btn-sm" onclick="DPP.toast('封装包 ${r.v} 开始下载', 'info')">下载</button>
                <button class="btn btn-text btn-sm" onclick="DPP.openModal('授权管理', '<div class=&quot;form-item&quot;><label class=&quot;form-label required&quot;>授权对象</label><select class=&quot;form-select&quot;><option>政务服务管理局</option><option>交通运输局</option><option>卫健局</option></select></div><div class=&quot;form-item&quot;><label class=&quot;form-label required&quot;>授权方式</label><select class=&quot;form-select&quot;><option>公开授权</option><option>机构授权</option><option>协议签署</option></select></div><div class=&quot;form-item&quot; style=&quot;margin-bottom: 0;&quot;><label class=&quot;form-label&quot;>有效期</label><input type=&quot;date&quot; class=&quot;form-input&quot;></div>', () => DPP.toast('授权已生效', 'success'), { confirmText: '授权' })">授权</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <span class="pagination-info">共 28 条</span>
      <button class="page-btn" disabled>‹</button>
      <button class="page-btn active">1</button>
      <button class="page-btn">2</button>
      <button class="page-btn">3</button>
      <button class="page-btn">›</button>
    </div>
  </div>
  `;
};
