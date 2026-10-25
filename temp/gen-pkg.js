const fs = require('fs');

let pkg = `
Pages.packagePage = function() {
  return \`
  <div class="page-header">
    <div>
      <div class="page-title">封装交付</div>
      <div class="page-subtitle">数据集封装、版本管理、授权与下载</div>
    </div>
    <div class="page-actions">
      <button class="btn">\${DPP.icon('package')} 封装记录</button>
      <button class="btn btn-primary">\${DPP.icon('plus')} 新建封装</button>
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
      <div class="filter-item"><div class="filter-label">封装格式</div><select class="form-select"><option>全部格式</option><option>JSON</option><option>JSONL</option><option>CSV</option><option>Parquet</option></select></div>
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
          \${[
            { n: '政务问答语料数据集', v: 'seal_v2.1', f: 'JSONL', c: '128,560', s: '256 MB', a: '公开授权', st: '已发布', t: 'success', tm: '2024-10-22 10:30' },
            { n: '工业质检图像数据集', v: 'seal_v1.0', f: 'JSON + 原图', c: '30,000', s: '8.5 GB', a: '机构授权', st: '封装中', t: 'primary', tm: '2024-10-22 09:00' },
            { n: '客服语音识别语料', v: 'seal_v1.0', f: 'CSV + WAV', c: '8,960', s: '12.3 GB', a: '协议签署', st: '已发布', t: 'success', tm: '2024-10-20 14:20' },
            { n: '道路场景视频标注', v: 'seal_v2.0', f: 'COCO JSON', c: '2,340', s: '45.2 GB', a: '机构授权', st: '已发布', t: 'success', tm: '2024-10-19 16:00' },
            { n: '政策法规结构化数据', v: 'seal_v1.2', f: 'Parquet', c: '56,800', s: '128 MB', a: '公开授权', st: '已发布', t: 'success', tm: '2024-10-18 11:30' },
            { n: '交通出行OD数据集', v: 'seal_v1.0', f: 'CSV', c: '2.1M', s: '512 MB', a: '公开授权', st: '已发布', t: 'success', tm: '2024-10-17 09:45' }
          ].map(r => \`
            <tr>
              <td class="font-medium">\${r.n}</td>
              <td><code style="font-size:13px;background:#f5f5f5;padding:2px 6px;border-radius:2px;">\${r.v}</code></td>
              <td><span class="tag tag-info">\${r.f}</span></td>
              <td>\${r.c}</td>
              <td>\${r.s}</td>
              <td><span class="tag tag-default">\${r.a}</span></td>
              <td><span class="tag tag-\${r.t}">\${r.st}</span></td>
              <td style="color:var(--dpp-muted);font-size:13px;">\${r.tm}</td>
              <td>
                <button class="btn btn-text btn-sm">详情</button>
                <button class="btn btn-text btn-sm">下载</button>
                <button class="btn btn-text btn-sm">授权</button>
              </td>
            </tr>
          \`).join('')}
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
  \`;
};
`;

fs.appendFileSync('js/pages-part3.js', pkg, 'utf8');
console.log('Package page added. Size:', fs.statSync('js/pages-part3.js').size);
