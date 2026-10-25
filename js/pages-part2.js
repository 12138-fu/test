/* DPP Pages - Part 2: Dataset, Preprocess, Annotation Task, Annotation Workbench */

/* 数据集数据（列表与详情页共用） */
var DS_ROWS = [
  { name: '政务问答语料数据集', type: '文本', ver: 'v2.1', samples: '128,560', labeled: '112,340', size: '256 MB', status: '已发布', tag: 'success', owner: '张明', time: '2024-10-22 10:30' },
  { name: '工业质检图像数据集', type: '图像', ver: 'v1.3', samples: '45,280', labeled: '32,150', size: '8.5 GB', status: '构建中', tag: 'primary', owner: '李伟', time: '2024-10-21 16:45' },
  { name: '客服语音识别语料', type: '音频', ver: 'v1.0', samples: '8,960', labeled: '8,960', size: '12.3 GB', status: '已发布', tag: 'success', owner: '王芳', time: '2024-10-20 09:15' },
  { name: '道路场景视频标注', type: '视频', ver: 'v2.0', samples: '2,340', labeled: '2,106', size: '45.2 GB', status: '已发布', tag: 'success', owner: '赵强', time: '2024-10-19 14:20' },
  { name: '医疗影像分割数据集', type: '图像', ver: 'v0.5', samples: '15,680', labeled: '4,520', size: '32.1 GB', status: '构建中', tag: 'primary', owner: '陈静', time: '2024-10-18 11:00' },
  { name: '政策法规结构化数据', type: '文本', ver: 'v1.2', samples: '56,800', labeled: '56,800', size: '128 MB', status: '已发布', tag: 'success', owner: '刘洋', time: '2024-10-17 16:30' },
  { name: '交通出行OD数据集', type: '结构化', ver: 'v1.0', samples: '2.1M', labeled: '-', size: '512 MB', status: '已发布', tag: 'success', owner: '孙磊', time: '2024-10-16 13:45' }
];

Pages.openDatasetDetail = function(name) {
  const row = DS_ROWS.find(r => r.name === name) || DS_ROWS[0];
  DPP.navigate('datasetDetail', row);
};

Pages.datasetModal = function() {
  DPP.openModal('新建数据集', `
    <div class="form-item">
      <label class="form-label required">数据集名称</label>
      <input type="text" class="form-input" placeholder="请输入数据集名称">
    </div>
    <div class="form-item">
      <label class="form-label required">原始数据</label>
      <div style="max-height: 172px; overflow-y: auto; border: 1px solid var(--dpp-border); border-radius: 2px; padding: 2px 12px;">
        ${RAW_SOURCES.map(r => `
          <label class="checkbox" style="display: flex; align-items: center; padding: 7px 0;">
            <input type="checkbox" value="${r.name}"><span class="checkbox-box"></span>
            <span style="flex: 1;">${r.name}</span>
            <span class="tag ${r.kind === 'sync' ? 'tag-primary' : 'tag-info'}" style="margin-left: 8px;">${r.kindName}</span>
            <span style="font-size: 12px; color: var(--dpp-muted); margin-left: 8px; width: 96px; text-align: right;">${r.volume}</span>
          </label>`).join('')}
      </div>
      <div style="font-size: 12px; color: var(--dpp-muted); margin-top: 6px;">从数据同步与上传接入的原始数据中勾选，创建时封装为数据集初始版本 v1.0</div>
    </div>
    <div class="form-row">
      <div class="form-item">
        <label class="form-label required">数据类型</label>
        <select class="form-select">
          <option>文本</option><option>图像</option><option>音频</option>
          <option>视频</option><option>结构化</option>
        </select>
      </div>
      <div class="form-item">
        <label class="form-label required">存储格式</label>
        <select class="form-select">
          <option>JSONL</option><option>JSON</option><option>CSV</option>
          <option>Parquet</option><option>COCO JSON</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-item">
        <label class="form-label required">所属机构</label>
        <select class="form-select">
          <option>青阳市大数据中心</option>
          <option>政务服务管理局</option>
          <option>交通运输局</option>
        </select>
      </div>
      <div class="form-item">
        <label class="form-label">脱敏级别</label>
        <select class="form-select">
          <option>L1 · 公开</option><option selected>L2 · 已脱敏</option><option>L3 · 敏感</option>
        </select>
      </div>
    </div>
    <div class="form-item" style="margin-bottom: 0;">
      <label class="form-label">数据集描述</label>
      <textarea class="form-textarea" placeholder="请描述数据来源、用途与字段说明"></textarea>
    </div>
  `, () => DPP.toast('数据集创建成功', 'success'), { confirmText: '创建' });
};

Pages.dataset = function() {
  return `
  <div class="page-header">
    <div>
      <div class="page-title">数据集列表</div>
      <div class="page-subtitle">管理平台内所有数据集，支持版本管理和统计分析</div>
    </div>
    <div class="page-actions">
      <button class="btn" onclick="DPP.toast('统计分析报告生成中，请稍候', 'info')">${DPP.icon('chart')} 统计分析</button>
      <button class="btn btn-primary" onclick="Pages.datasetModal()">${DPP.icon('plus')} 新建数据集</button>
    </div>
  </div>

  <div class="stat-grid">
    <div class="stat-card">
      <div class="stat-label">数据集总数</div>
      <div class="stat-value">128</div>
      <div class="stat-trend up">↑ 本月新增 15 个</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">总样本量</div>
      <div class="stat-value">2.4M</div>
      <div class="stat-trend up">↑ 8.3% 较上月</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">已标注</div>
      <div class="stat-value">1.8M</div>
      <div class="stat-trend">标注率 75%</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">存储使用</div>
      <div class="stat-value">1.2 TB</div>
      <div class="stat-trend up">↑ 120 GB 本月</div>
    </div>
  </div>

  <div class="card">
    <div class="tabs">
      <div class="tab-item active">全部数据集</div>
      <div class="tab-item">我的数据集</div>
      <div class="tab-item">共享数据集</div>
      <div class="tab-item">已归档</div>
    </div>

    <div class="filter-bar">
      <div class="filter-item">
        <div class="filter-label">数据集名称</div>
        <input type="text" class="form-input" placeholder="请输入名称关键字">
      </div>
      <div class="filter-item">
        <div class="filter-label">数据类型</div>
        <select class="form-select">
          <option>全部类型</option>
          <option>文本</option><option>图像</option><option>音频</option>
          <option>视频</option><option>结构化</option>
        </select>
      </div>
      <div class="filter-item">
        <div class="filter-label">状态</div>
        <select class="form-select">
          <option>全部状态</option>
          <option>构建中</option><option>已发布</option><option>已归档</option>
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
            <th>数据集名称</th>
            <th>类型</th>
            <th>版本</th>
            <th>样本量</th>
            <th>标注量</th>
            <th>大小</th>
            <th>状态</th>
            <th>负责人</th>
            <th>更新时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          ${DS_ROWS.map(row => `
            <tr>
              <td><label class="checkbox"><input type="checkbox"><span class="checkbox-box"></span></label></td>
              <td class="font-medium"><a href="javascript:void(0)" onclick="Pages.openDatasetDetail('${row.name}')">${row.name}</a></td>
              <td><span class="tag tag-info">${row.type}</span></td>
              <td><code style="font-size: 13px; background: var(--dpp-bg); padding: 2px 6px; border-radius: 2px;">${row.ver}</code></td>
              <td>${row.samples}</td>
              <td>${row.labeled}</td>
              <td>${row.size}</td>
              <td><span class="tag tag-${row.tag}">${row.status}</span></td>
              <td>${row.owner}</td>
              <td style="color: var(--dpp-muted); font-size: 13px;">${row.time}</td>
              <td>
                <button class="btn btn-text btn-sm" onclick="Pages.openDatasetDetail('${row.name}')">详情</button>
                <button class="btn btn-text btn-sm" onclick="Pages.openDatasetDetail('${row.name}')">版本</button>
                <button class="btn btn-text btn-sm" onclick="DPP.toast('已开始下载「${row.name}」${row.ver}', 'info')">下载</button>
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

/* 原始数据池：来自同步任务产出与数据上传，新建数据集时从这里勾选封装 */
var RAW_SOURCES = [
  { name: '政务问答原始语料', kind: 'sync', kindName: '数据同步', ref: '政务用户数据同步', format: '结构化表', volume: '150,000 条', size: '312 MB', time: '2024-10-22 02:10', status: '已处理', tag: 'success' },
  { name: '工业质检原始图像', kind: 'sync', kindName: '数据同步', ref: '企业注册信息同步', format: 'JPG/PNG', volume: '40,000 张', size: '7.6 GB', time: '2024-10-21 15:40', status: '处理中', tag: 'primary' },
  { name: '客服通话录音', kind: 'upload', kindName: '数据上传', ref: '本地上传', format: 'WAV', volume: '1,200 段', size: '11.8 GB', time: '2024-10-21 10:05', status: '已处理', tag: 'success' },
  { name: '道路监控视频流', kind: 'sync', kindName: '数据同步', ref: '实时事件流同步', format: 'MP4', volume: '240 段', size: '52.4 GB', time: '2024-10-22 08:00', status: '处理中', tag: 'primary' },
  { name: '交通OD原始数据', kind: 'upload', kindName: '数据上传', ref: 'FTP 拉取', format: 'CSV', volume: '2.5M 条', size: '586 MB', time: '2024-10-20 16:30', status: '已处理', tag: 'success' },
  { name: '政务服务问答-1022.jsonl', kind: 'upload', kindName: '数据上传', ref: '本地上传', format: 'JSONL', volume: '85,400 条', size: '2.3 GB', time: '2024-10-22 11:20', status: '待处理', tag: 'warning' },
  { name: '门诊影像归档包', kind: 'upload', kindName: '数据上传', ref: 'S3 导入', format: 'DICOM', volume: '15,680 例', size: '33.6 GB', time: '2024-10-19 14:50', status: '待处理', tag: 'warning' },
  { name: '政策法规原文库', kind: 'sync', kindName: '数据同步', ref: '历史档案迁移', format: '结构化表', volume: '62,300 条', size: '148 MB', time: '2024-10-18 09:30', status: '已处理', tag: 'success' }
];

/* 预处理任务：ds 指向已封装的数据集 */
var PP_ROWS = [
  { name: '政务语料清洗去重', ds: '政务问答语料数据集', ops: '清洗 · 去重 · 切分', count: '150,000 → 128,560', status: '已完成', tag: 'success', progress: 100, cost: '12分30秒', time: '2024-10-22 09:00' },
  { name: '工业图像数据增强', ds: '工业质检图像数据集', ops: '裁剪 · 增强 · 格式转换', count: '40,000 → 45,280', status: '处理中', tag: 'primary', progress: 68, cost: '进行中', time: '2024-10-22 10:30' },
  { name: '语音片段切分', ds: '客服语音识别语料', ops: '静音检测 · 切片 · 归一化', count: '1,200 → 8,960', status: '已完成', tag: 'success', progress: 100, cost: '45分12秒', time: '2024-10-21 14:00' },
  { name: '视频帧提取', ds: '道路场景视频标注', ops: '抽帧 · 去模糊 · 缩放', count: '240 → 15,680', status: '处理中', tag: 'primary', progress: 42, cost: '进行中', time: '2024-10-22 08:15' },
  { name: '结构化数据清洗', ds: '交通出行OD数据集', ops: '去空 · 去重 · 类型转换', count: '2.5M → 2.1M', status: '已完成', tag: 'success', progress: 100, cost: '8分45秒', time: '2024-10-20 16:30' }
];

Pages.preprocess = function() {
  return `
  <div class="page-header">
    <div>
      <div class="page-title">预处理任务</div>
      <div class="page-subtitle">选择已封装的数据集执行清洗、去重、切分等预处理操作，产出数据集新版本</div>
    </div>
    <div class="page-actions">
      <button class="btn" onclick="DPP.toast('预处理模板库打开中（原型演示）', 'info')">${DPP.icon('filter')} 预处理模板</button>
      <button class="btn btn-primary" onclick="Pages.preprocessModal()">${DPP.icon('plus')} 新建任务</button>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <div class="card-title">预处理流水线</div>
      <span class="tag tag-info">V1 算子</span>
    </div>
    <div class="card-body">
      <div class="workflow">
        ${[
          { name: '数据集', icon: 'folder', done: true },
          { name: '数据清洗', icon: 'filter', done: true },
          { name: '去重过滤', icon: 'check', done: true },
          { name: '格式转换', icon: 'sync', done: true },
          { name: '数据切分', icon: 'edit', active: true },
          { name: '质量评估', icon: 'chart', next: true },
          { name: '新版本数据集', icon: 'database', next: true }
        ].map((node, i, arr) => `
          <div class="workflow-node ${node.done ? 'done' : ''} ${node.active ? 'active' : ''}">
            <div class="workflow-node-icon">${DPP.icon(node.icon)}</div>
            <div class="workflow-node-label">${node.name}</div>
          </div>
          ${i < arr.length - 1 ? `<div class="workflow-arrow ${node.done ? 'done' : ''}">→</div>` : ''}
        `).join('')}
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px;">
        <div style="padding: 16px; background: var(--dpp-bg); border-radius: var(--dpp-radius-md);">
          <div class="text-sm text-muted">训练集比例</div>
          <div class="text-xl font-medium mt-8">70%</div>
        </div>
        <div style="padding: 16px; background: var(--dpp-bg); border-radius: var(--dpp-radius-md);">
          <div class="text-sm text-muted">验证集比例</div>
          <div class="text-xl font-medium mt-8">15%</div>
        </div>
        <div style="padding: 16px; background: var(--dpp-bg); border-radius: var(--dpp-radius-md);">
          <div class="text-sm text-muted">测试集比例</div>
          <div class="text-xl font-medium mt-8">15%</div>
        </div>
      </div>
    </div>
  </div>

  <div class="card" style="margin-top: 16px;">
    <div class="card-header">
      <div class="card-title">任务列表</div>
    </div>
    <div class="filter-bar">
      <div class="filter-item">
        <div class="filter-label">任务名称</div>
        <input type="text" class="form-input" id="pp-filter-name" placeholder="请输入任务名称" oninput="Pages.preprocessFilter()">
      </div>
      <div class="filter-item">
        <div class="filter-label">数据集</div>
        <select class="form-select" id="pp-filter-ds" onchange="Pages.preprocessFilter()">
          <option value="">全部数据集</option>
          ${DS_ROWS.map(d => `<option>${d.name}</option>`).join('')}
        </select>
      </div>
      <div class="filter-item">
        <div class="filter-label">状态</div>
        <select class="form-select" id="pp-filter-status" onchange="Pages.preprocessFilter()">
          <option value="">全部状态</option>
          <option>处理中</option>
          <option>已完成</option>
        </select>
      </div>
      <div class="filter-actions">
        <button class="btn" onclick="Pages.preprocessReset()">重置</button>
      </div>
    </div>
    <div class="table-wrap" style="margin-top: 8px;">
      <table class="table">
        <thead>
          <tr>
            <th>任务名称</th>
            <th>关联数据集</th>
            <th>处理算子</th>
            <th>处理量</th>
            <th>状态</th>
            <th>进度</th>
            <th>耗时</th>
            <th>开始时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody id="pp-tbody">
          ${PP_ROWS.map(Pages.preprocessRowHtml).join('')}
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <span class="pagination-info" id="pp-count">共 ${PP_ROWS.length} 条</span>
      <button class="page-btn" disabled>‹</button>
      <button class="page-btn active">1</button>
      <button class="page-btn">›</button>
    </div>
  </div>
  `;
};

Pages.preprocessRowHtml = function(row) {
  return `
    <tr>
      <td class="font-medium">${row.name}</td>
      <td><a href="javascript:void(0)" onclick="Pages.openDatasetDetail('${row.ds}')">${row.ds}</a></td>
      <td><span class="tag tag-info">${row.ops}</span></td>
      <td style="font-size: 13px;">${row.count}</td>
      <td><span class="tag tag-${row.tag}">${row.status}</span></td>
      <td style="width: 140px;">
        <div class="od-row" style="gap: 8px;">
          <div class="progress" style="flex:1;"><div class="progress-bar" style="width:${row.progress}%;"></div></div>
          <span style="font-size:12px; color: var(--dpp-muted); width: 36px;">${row.progress}%</span>
        </div>
      </td>
      <td style="font-size: 13px;">${row.cost}</td>
      <td style="color: var(--dpp-muted); font-size: 13px;">${row.time}</td>
      <td>
        <button class="btn btn-text btn-sm" onclick="DPP.openModal('预处理任务详情', '<div class=&quot;desc-grid&quot; style=&quot;grid-template-columns: repeat(2, 1fr);&quot;><div class=&quot;desc-item&quot;><div class=&quot;desc-label&quot;>任务名称</div><div class=&quot;desc-value&quot;>${row.name}</div></div><div class=&quot;desc-item&quot;><div class=&quot;desc-label&quot;>关联数据集</div><div class=&quot;desc-value&quot;>${row.ds}</div></div><div class=&quot;desc-item&quot;><div class=&quot;desc-label&quot;>处理算子</div><div class=&quot;desc-value&quot;>${row.ops}</div></div><div class=&quot;desc-item&quot;><div class=&quot;desc-label&quot;>处理量</div><div class=&quot;desc-value&quot;>${row.count}</div></div><div class=&quot;desc-item&quot;><div class=&quot;desc-label&quot;>状态</div><div class=&quot;desc-value&quot;>${row.status}</div></div><div class=&quot;desc-item&quot;><div class=&quot;desc-label&quot;>开始时间</div><div class=&quot;desc-value&quot;>${row.time}</div></div></div>', null, { hideFooter: true })">详情</button>
        <button class="btn btn-text btn-sm" onclick="DPP.toast('正在加载任务日志…', 'info')">日志</button>
      </td>
    </tr>`;
};

Pages.preprocessFilter = function() {
  const kw = document.getElementById('pp-filter-name').value.trim();
  const ds = document.getElementById('pp-filter-ds').value;
  const status = document.getElementById('pp-filter-status').value;
  const list = PP_ROWS.filter(r =>
    (!kw || r.name.indexOf(kw) !== -1) &&
    (!ds || r.ds === ds) &&
    (!status || r.status === status)
  );
  document.getElementById('pp-tbody').innerHTML = list.length
    ? list.map(Pages.preprocessRowHtml).join('')
    : '<tr><td colspan="9" style="text-align: center; padding: 40px; color: var(--dpp-muted);">暂无符合条件的任务</td></tr>';
  document.getElementById('pp-count').textContent = '共 ' + list.length + ' 条';
};

Pages.preprocessReset = function() {
  document.getElementById('pp-filter-name').value = '';
  document.getElementById('pp-filter-ds').value = '';
  document.getElementById('pp-filter-status').value = '';
  Pages.preprocessFilter();
};

Pages.preprocessModal = function() {
  DPP.openModal('新建预处理任务', `
    <div class="form-item">
      <label class="form-label required">任务名称</label>
      <input type="text" class="form-input" placeholder="请输入任务名称">
    </div>
    <div class="form-item">
      <label class="form-label required">选择数据集</label>
      <select class="form-select">
        ${DS_ROWS.map(d => `<option>${d.name}</option>`).join('')}
      </select>
      <div style="font-size: 12px; color: var(--dpp-muted); margin-top: 6px;">预处理结果将生成该数据集的新版本</div>
    </div>
    <div class="form-item">
      <label class="form-label required">处理算子</label>
      <div class="od-cluster" style="gap: 12px;">
        ${['清洗', '去重', '格式转换', '切分', '增强', '脱敏'].map((op, i) => `
          <label class="checkbox"><input type="checkbox" ${i < 3 ? 'checked' : ''}><span class="checkbox-box"></span>${op}</label>
        `).join('')}
      </div>
    </div>
    <div class="form-row" style="margin-bottom: 0;">
      <div class="form-item">
        <label class="form-label">训练集比例</label>
        <input type="text" class="form-input" value="70%">
      </div>
      <div class="form-item">
        <label class="form-label">验证 / 测试比例</label>
        <input type="text" class="form-input" value="15% / 15%">
      </div>
    </div>
  `, () => DPP.toast('预处理任务创建成功', 'success'), { confirmText: '创建' });
};

Pages.annotationTask = function() {
  return `
  <div class="page-header">
    <div>
      <div class="page-title">标注任务</div>
      <div class="page-subtitle">管理标注项目，分配任务，跟踪进度和质量</div>
    </div>
    <div class="page-actions">
      <button class="btn" onclick="DPP.toast('标注统计报表生成中，请稍候', 'info')">${DPP.icon('chart')} 统计报表</button>
      <button class="btn btn-primary" onclick="Pages.annotationTaskModal()">${DPP.icon('plus')} 创建项目</button>
    </div>
  </div>

  <div class="stat-grid">
    <div class="stat-card">
      <div class="stat-label">进行中项目</div>
      <div class="stat-value">12</div>
      <div class="stat-trend up">↑ 3 个本周新增</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">待标注样本</div>
      <div class="stat-value">12,486</div>
      <div class="stat-trend">今日新增 256</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">标注人员</div>
      <div class="stat-value">28 人</div>
      <div class="stat-trend">活跃 22 人</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">平均通过率</div>
      <div class="stat-value">94.2%</div>
      <div class="stat-trend up">↑ 1.5% 较上周</div>
    </div>
  </div>

  <div class="card">
    <div class="tabs">
      <div class="tab-item active">全部项目</div>
      <div class="tab-item">我负责的</div>
      <div class="tab-item">我参与的</div>
      <div class="tab-item">已完成</div>
    </div>

    <div class="filter-bar">
      <div class="filter-item">
        <div class="filter-label">项目名称</div>
        <input type="text" class="form-input" placeholder="请输入项目名称">
      </div>
      <div class="filter-item">
        <div class="filter-label">标注类型</div>
        <select class="form-select">
          <option>全部类型</option>
          <option>文本标注</option><option>图像标注</option>
          <option>音频标注</option><option>视频标注</option>
        </select>
      </div>
      <div class="filter-item">
        <div class="filter-label">状态</div>
        <select class="form-select">
          <option>全部状态</option>
          <option>待开始</option><option>进行中</option>
          <option>审核中</option><option>已完成</option>
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
            <th>项目名称</th>
            <th>标注类型</th>
            <th>关联数据集</th>
            <th>总样本</th>
            <th>已标注</th>
            <th>进度</th>
            <th>负责人</th>
            <th>状态</th>
            <th>截止日期</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          ${[
            { name: '政务问答语料标注-第2期', type: '文本标注', ds: '政务问答语料 v2', total: '50,000', done: '34,000', progress: 68, owner: '张明', status: '进行中', tag: 'primary', deadline: '2024-11-15' },
            { name: '工业质检缺陷标注', type: '图像标注', ds: '工业质检图像', total: '30,000', done: '22,500', progress: 75, owner: '李伟', status: '进行中', tag: 'primary', deadline: '2024-11-10' },
            { name: '客服语音转写标注', type: '音频标注', ds: '客服语音识别语料', total: '8,960', done: '8,960', progress: 100, owner: '王芳', status: '已完成', tag: 'success', deadline: '2024-10-20' },
            { name: '道路目标检测标注', type: '视频标注', ds: '道路场景视频', total: '2,340', done: '1,521', progress: 65, owner: '赵强', status: '进行中', tag: 'primary', deadline: '2024-11-20' },
            { name: '医疗影像分割标注', type: '图像标注', ds: '医疗影像分割', total: '10,000', done: '3,200', progress: 32, owner: '陈静', status: '进行中', tag: 'warning', deadline: '2024-12-05' },
            { name: '政策法规实体抽取', type: '文本标注', ds: '政策法规结构化', total: '20,000', done: '20,000', progress: 100, owner: '刘洋', status: '审核中', tag: 'warning', deadline: '2024-10-25' },
            { name: '语音情感标注项目', type: '音频标注', ds: '客服语音情感', total: '5,000', done: '0', progress: 0, owner: '周婷', status: '待开始', tag: 'default', deadline: '2024-11-30' }
          ].map(row => `
            <tr>
              <td class="font-medium"><a href="javascript:void(0)" onclick="DPP.navigate('annotation-work')">${row.name}</a></td>
              <td><span class="tag tag-info">${row.type}</span></td>
              <td>${row.ds}</td>
              <td>${row.total}</td>
              <td>${row.done}</td>
              <td style="width: 160px;">
                <div class="od-row" style="gap: 8px;">
                  <div class="progress" style="flex:1;"><div class="progress-bar" style="width:${row.progress}%;"></div></div>
                  <span style="font-size:12px; color: var(--dpp-muted); width: 36px;">${row.progress}%</span>
                </div>
              </td>
              <td>${row.owner}</td>
              <td><span class="tag tag-${row.tag}">${row.status}</span></td>
              <td style="font-size: 13px; color: ${row.tag === 'warning' ? 'var(--dpp-error)' : 'var(--dpp-muted)'};">${row.deadline}</td>
              <td>
                <button class="btn btn-text btn-sm" onclick="DPP.navigate('annotation-work')">进入</button>
                <button class="btn btn-text btn-sm" onclick="DPP.openModal('标注项目详情', '<div class=&quot;desc-grid&quot; style=&quot;grid-template-columns: repeat(2, 1fr);&quot;><div class=&quot;desc-item&quot;><div class=&quot;desc-label&quot;>项目名称</div><div class=&quot;desc-value&quot;>${row.name}</div></div><div class=&quot;desc-item&quot;><div class=&quot;desc-label&quot;>标注类型</div><div class=&quot;desc-value&quot;>${row.type}</div></div><div class=&quot;desc-item&quot;><div class=&quot;desc-label&quot;>关联数据集</div><div class=&quot;desc-value&quot;>${row.ds}</div></div><div class=&quot;desc-item&quot;><div class=&quot;desc-label&quot;>负责人</div><div class=&quot;desc-value&quot;>${row.owner}</div></div><div class=&quot;desc-item&quot;><div class=&quot;desc-label&quot;>标注进度</div><div class=&quot;desc-value&quot;>${row.done} / ${row.total}（${row.progress}%）</div></div><div class=&quot;desc-item&quot;><div class=&quot;desc-label&quot;>截止日期</div><div class=&quot;desc-value&quot;>${row.deadline}</div></div></div>', null, { hideFooter: true })">详情</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <span class="pagination-info">共 18 条</span>
      <button class="page-btn" disabled>‹</button>
      <button class="page-btn active">1</button>
      <button class="page-btn">2</button>
      <button class="page-btn">›</button>
    </div>
  </div>
  `;
};

Pages.annotationTaskModal = function() {
  DPP.openModal('创建标注项目', `
    <div class="form-item">
      <label class="form-label required">项目名称</label>
      <input type="text" class="form-input" placeholder="请输入项目名称">
    </div>
    <div class="form-row">
      <div class="form-item">
        <label class="form-label required">标注类型</label>
        <select class="form-select">
          <option>文本标注</option><option>图像标注</option>
          <option>音频标注</option><option>视频标注</option>
        </select>
      </div>
      <div class="form-item">
        <label class="form-label required">关联数据集</label>
        <select class="form-select">
          ${DS_ROWS.map(d => `<option>${d.name}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-item">
        <label class="form-label required">负责人</label>
        <select class="form-select">
          <option>张明</option><option>李伟</option><option>王芳</option>
          <option>赵强</option><option>陈静</option>
        </select>
      </div>
      <div class="form-item">
        <label class="form-label required">截止日期</label>
        <input type="date" class="form-input">
      </div>
    </div>
    <div class="form-item" style="margin-bottom: 0;">
      <label class="form-label">标注规范说明</label>
      <textarea class="form-textarea" placeholder="请填写标注规范要点或引用规范文档"></textarea>
    </div>
  `, () => DPP.toast('标注项目创建成功', 'success'), { confirmText: '创建' });
};

Pages.annotationWork = function() {
  return `
  <div style="display: flex; height: calc(100vh - 108px); margin: -16px -24px -24px;">
    <!-- Left: label panel -->
    <div class="annotation-side">
      <div class="annotation-side-header">
        <div class="od-row" style="justify-content: space-between;">
          <span>标签列表</span>
          <button class="btn btn-text btn-sm">设置</button>
        </div>
      </div>
      <div class="label-list">
        ${[
          { name: '人物', color: '#52c41a', count: 128 },
          { name: '车辆', color: '#1890ff', count: 256 },
          { name: '道路', color: '#faad14', count: 64 },
          { name: '建筑', color: '#722ed1', count: 89 },
          { name: '交通标志', color: '#eb2f96', count: 45 },
          { name: '路灯', color: '#13c2c2', count: 32 },
          { name: '行人', color: '#f5222d', count: 156 },
          { name: '自行车', color: '#fa8c16', count: 78 },
          { name: '树木', color: '#a0d911', count: 210 },
          { name: '天空', color: '#2f54eb', count: 1 }
        ].map((label, i) => `
          <div class="label-item ${i === 0 ? 'active' : ''}" onclick="Pages.selectLabel(this)">
            <span class="label-color" style="background: ${label.color};"></span>
            <span style="flex: 1;">${label.name}</span>
            <span style="font-size: 12px; color: var(--dpp-muted);">${label.count}</span>
          </div>
        `).join('')}
      </div>
      <div style="padding: 12px 16px; border-top: 1px solid var(--dpp-border);">
        <button class="btn w-full" style="width: 100%;">${DPP.icon('plus')} 新建标签</button>
      </div>
    </div>

    <!-- Center: canvas -->
    <div style="flex: 1; display: flex; flex-direction: column; background: #1a1a2e;">
      <div class="annotation-toolbar">
        <button class="annotation-tool active" title="选择">↖</button>
        <button class="annotation-tool" title="矩形框">▢</button>
        <button class="annotation-tool" title="多边形">⬡</button>
        <button class="annotation-tool" title="多边形">◯</button>
        <button class="annotation-tool" title="关键点">●</button>
        <button class="annotation-tool" title="线条">╱</button>
        <div style="width: 1px; height: 20px; background: rgba(255,255,255,.1); margin: 0 8px;"></div>
        <button class="annotation-tool" title="撤销">↶</button>
        <button class="annotation-tool" title="重做">↷</button>
        <div style="width: 1px; height: 20px; background: rgba(255,255,255,.1); margin: 0 8px;"></div>
        <button class="annotation-tool" title="放大">+</button>
        <button class="annotation-tool" title="缩小">−</button>
        <button class="annotation-tool" title="适应">⤢</button>
        <div style="flex: 1;"></div>
        <span style="color: rgba(255,255,255,.6); font-size: 12px;">100%</span>
      </div>
      <div style="flex: 1; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden;">
        <!-- Simulated annotation canvas -->
        <div style="position: relative; width: 640px; height: 400px; background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%); border: 1px solid rgba(255,255,255,.1); border-radius: 4px;">
          <!-- Simulated street scene with bboxes -->
          <svg width="640" height="400" style="display: block;">
            <rect x="0" y="250" width="640" height="150" fill="#3d4852"/>
            <rect x="0" y="0" width="640" height="250" fill="#4a5568"/>
            <rect x="50" y="120" width="100" height="130" fill="#5a6778"/>
            <rect x="180" y="80" width="80" height="170" fill="#4a5868"/>
            <rect x="290" y="150" width="120" height="100" fill="#5a6778"/>
            <rect x="440" y="100" width="100" height="150" fill="#4a5868"/>
            <rect x="570" y="140" width="60" height="110" fill="#5a6778"/>
            <rect x="0" y="260" width="640" height="4" fill="#718096"/>
            <line x1="0" y1="280" x2="640" y2="280" stroke="#a0aec0" stroke-dasharray="20,15" stroke-width="2"/>
            <rect x="120" y="265" width="80" height="40" fill="#2d3748" stroke="#e53e3e" stroke-width="2"/>
            <text x="124" y="260" fill="#e53e3e" font-size="11">车辆</text>
            <rect x="320" y="268" width="60" height="32" fill="#2d3748" stroke="#38a169" stroke-width="2"/>
            <text x="324" y="263" fill="#38a169" font-size="11">行人</text>
            <rect x="480" y="270" width="50" height="25" fill="#2d3748" stroke="#3182ce" stroke-width="2"/>
            <text x="484" y="265" fill="#3182ce" font-size="11">车辆</text>
            <circle cx="200" cy="230" r="15" fill="none" stroke="#d69e2e" stroke-width="2"/>
            <text x="220" y="225" fill="#d69e2e" font-size="11">交通标志</text>
            <polygon points="50,250 80,250 100,220 70,220" fill="none" stroke="#9f7aea" stroke-width="2"/>
            <text x="105" y="235" fill="#9f7aea" font-size="11">建筑</text>
          </svg>
        </div>
      </div>

      <!-- Bottom: sample navigator -->
      <div style="padding: 12px 20px; background: #2a2a3e; border-top: 1px solid rgba(255,255,255,.1); display: flex; align-items: center; gap: 16px;">
        <button class="btn btn-sm" style="background: rgba(255,255,255,.1); color: #fff; border-color: rgba(255,255,255,.2);">← 上一张</button>
        <div style="flex: 1; text-align: center; color: rgba(255,255,255,.8);">
          <span style="font-size: 14px;">第 128 / 5000 张</span>
          <span style="margin-left: 16px; font-size: 12px; color: rgba(255,255,255,.5);">road_scene_0128.jpg · 1920×1080</span>
        </div>
        <button class="btn btn-sm" style="background: rgba(255,255,255,.1); color: #fff; border-color: rgba(255,255,255,.2);">下一张 →</button>
        <button class="btn btn-primary btn-sm">保存并下一张</button>
      </div>
    </div>

    <!-- Right: attributes panel -->
    <div class="annotation-side">
      <div class="annotation-side-header">
        <span>标注属性</span>
      </div>
      <div style="padding: 16px; flex: 1; overflow-y: auto;">
        <div class="form-item">
          <label class="form-label">当前标签</label>
          <div class="od-row" style="gap: 8px;">
            <span class="label-color" style="width: 14px; height: 14px; background: #52c41a; border-radius: 3px; flex-shrink: 0;"></span>
            <span class="font-medium">车辆</span>
          </div>
        </div>

        <div class="form-item">
          <label class="form-label">车辆类型</label>
          <select class="form-select">
            <option>请选择</option>
            <option>轿车</option>
            <option>SUV</option>
            <option>货车</option>
            <option>公交车</option>
            <option>自行车</option>
            <option>摩托车</option>
          </select>
        </div>

        <div class="form-item">
          <label class="form-label">颜色</label>
          <select class="form-select">
            <option>请选择</option>
            <option>白色</option>
            <option>黑色</option>
            <option>银色</option>
            <option>红色</option>
            <option>蓝色</option>
            <option>其他</option>
          </select>
        </div>

        <div class="form-item">
          <label class="form-label">朝向</label>
          <select class="form-select">
            <option>请选择</option>
            <option>正向</option>
            <option>背向</option>
            <option>左侧</option>
            <option>右侧</option>
          </select>
        </div>

        <div class="form-item">
          <label class="form-label">遮挡程度</label>
          <select class="form-select">
            <option>无遮挡</option>
            <option>轻度遮挡</option>
            <option>中度遮挡</option>
            <option>重度遮挡</option>
          </select>
        </div>

        <div class="form-item">
          <label class="form-label">截断</label>
          <label class="checkbox"><input type="checkbox" checked><span class="checkbox-box"></span>未截断</label>
        </div>

        <div class="form-item">
          <label class="form-label">困难样本</label>
          <label class="checkbox"><input type="checkbox"><span class="checkbox-box"></span>标记为困难</label>
        </div>

        <div class="form-item">
          <label class="form-label">备注</label>
          <textarea class="form-textarea" placeholder="选填备注信息" style="min-height: 60px;"></textarea>
        </div>
      </div>
      <div style="padding: 12px 16px; border-top: 1px solid var(--dpp-border); display: flex; gap: 8px;">
        <button class="btn btn-text" style="color: var(--dpp-error); flex: 1;">删除标注</button>
        <button class="btn btn-primary" style="flex: 1;">应用属性</button>
      </div>
    </div>
  </div>
  `;
};

Pages.selectLabel = function(el) {
  document.querySelectorAll('.label-item').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
};
