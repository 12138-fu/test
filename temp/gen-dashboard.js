const fs = require('fs');

let content = `var Pages = (typeof Pages !== 'undefined') ? Pages : {};

/* DPP Pages - Part 1: Dashboard, DataSource, SyncTask, Upload, Workorder, Dataset, Preprocess */

Pages.dashboard = function() {
  return \\`
  <div class="page-header">
    <div>
      <div class="page-title">工作台</div>
      <div class="page-subtitle">欢迎使用数据集加工平台，以下是今日数据概览</div>
    </div>
    <div class="page-actions">
      <button class="btn">\\\${DPP.icon('plus')} 新建工单</button>
      <button class="btn btn-primary">\\\${DPP.icon('upload')} 上传数据</button>
    </div>
  </div>

  <div class="stat-grid">
    <div class="stat-card">
      <div class="od-row" style="justify-content:space-between;">
        <div>
          <div class="stat-label">数据集总数</div>
          <div class="stat-value">128</div>
        </div>
        <div class="stat-icon blue">\\\${DPP.icon('folder')}</div>
      </div>
      <div class="stat-trend up">↑ 12.5% 较上月</div>
    </div>
    <div class="stat-card">
      <div class="od-row" style="justify-content:space-between;">
        <div>
          <div class="stat-label">进行中工单</div>
          <div class="stat-value">36</div>
        </div>
        <div class="stat-icon green">\\\${DPP.icon('ticket')}</div>
      </div>
      <div class="stat-trend up">↑ 8 新增</div>
    </div>
    <div class="stat-card">
      <div class="od-row" style="justify-content:space-between;">
        <div>
          <div class="stat-label">待标注样本</div>
          <div class="stat-value">12,486</div>
        </div>
        <div class="stat-icon orange">\\\${DPP.icon('edit')}</div>
      </div>
      <div class="stat-trend down">↓ 3.2% 较上周</div>
    </div>
    <div class="stat-card">
      <div class="od-row" style="justify-content:space-between;">
        <div>
          <div class="stat-label">已交付封装</div>
          <div class="stat-value">54</div>
        </div>
        <div class="stat-icon purple">\\\${DPP.icon('package')}</div>
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
          \\\${[65, 78, 52, 91, 84, 110, 95].map((v, i) => \\`
            <div class="chart-bar" style="height: \\\${v}%;">
              <div class="chart-bar-value">\\\${v}%</div>
              <div class="chart-bar-label">周\\\${'一二三四五六日'[i]}</div>
            </div>
          \\`).join('')}
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
          \\\${[
            { name: '数据接入', value: 85, color: 'success' },
            { name: '预处理', value: 62, color: '' },
            { name: '标注作业', value: 43, color: '' },
            { name: '质量测评', value: 28, color: 'warning' },
            { name: '封装交付', value: 15, color: '' }
          ].map(item => \\`
            <div>
              <div class="od-row" style="justify-content: space-between; margin-bottom: 6px;">
                <span style="font-size: 13px;">\\\${item.name}</span>
                <span style="font-size: 13px; font-weight: 500;">\\\${item.value}%</span>
              </div>
              <div class="progress"><div class="progress-bar \\\${item.color}" style="width: \\\${item.value}%;"></div></div>
            </div>
          \\`).join('')}
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
          \\\${[
            { id: 'WO-QB-20241020-001', name: '政务问答语料数据集 v2', type: '文本标注', stage: '标注中', owner: '张工', progress: 68, time: '2024-10-20 09:30', tag: 'primary' },
            { id: 'WO-QB-20241019-003', name: '工业质检图像数据集', type: '图像标注', stage: '预处理', owner: '李工', progress: 45, time: '2024-10-19 14:20', tag: 'info' },
            { id: 'WO-QB-20241018-005', name: '客服语音识别语料', type: '音频标注', stage: '测评中', owner: '王工', progress: 82, time: '2024-10-18 11:00', tag: 'warning' },
            { id: 'WO-QB-20241017-002', name: '道路场景视频标注', type: '视频标注', stage: '已交付', owner: '赵工', progress: 100, time: '2024-10-17 16:45', tag: 'success' },
            { id: 'WO-QB-20241016-004', name: '医疗影像分割数据集', type: '图像标注', stage: '待受理', owner: '-', progress: 5, time: '2024-10-16 10:15', tag: 'default' }
          ].map(row => \\`
            <tr>
              <td><a href="javascript:void(0)" onclick="DPP.navigate('workorder')">\\\${row.id}</a></td>
              <td>\\\${row.name}</td>
              <td>\\\${row.type}</td>
              <td><span class="tag tag-\\\${row.tag}">\\\${row.stage}</span></td>
              <td>\\\${row.owner}</td>
              <td style="width: 120px;">
                <div class="od-row" style="gap: 8px;">
                  <div class="progress" style="flex:1;"><div class="progress-bar" style="width:\\\${row.progress}%;"></div></div>
                  <span style="font-size:12px; color: var(--dpp-muted); width: 36px;">\\\${row.progress}%</span>
                </div>
              </td>
              <td style="color: var(--dpp-muted); font-size: 13px;">\\\${row.time}</td>
              <td>
                <button class="btn btn-text btn-sm">详情</button>
              </td>
            </tr>
          \\`).join('')}
        </tbody>
      </table>
    </div>
  </div>
  \\`;
};
`;

fs.writeFileSync('js/pages-part1.js', content, 'utf8');
console.log('Dashboard written. Size:', fs.statSync('js/pages-part1.js').size);
