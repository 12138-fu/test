const fs = require('fs');

// User page
let userPage = `
Pages.user = function() {
  return \`
  <div class="page-header">
    <div>
      <div class="page-title">用户管理</div>
      <div class="page-subtitle">管理平台用户账号，支持增删改查与状态管控</div>
    </div>
    <div class="page-actions">
      <button class="btn">\${DPP.icon('upload')} 批量导入</button>
      <button class="btn btn-primary">\${DPP.icon('plus')} 新增用户</button>
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
          \${[
            { u: 'admin', n: '系统管理员', p: '138****0001', e: 'admin@dpp.local', o: '平台管理', r: '平台管理员', s: '启用', t: 'success', l: '2024-10-22 09:00' },
            { u: 'zhangming', n: '张明', p: '139****1234', e: 'zhangming@qb.gov.cn', o: '大数据中心', r: '项目负责人', s: '启用', t: 'success', l: '2024-10-22 08:45' },
            { u: 'liwei', n: '李伟', p: '138****5678', e: 'liwei@qb.gov.cn', o: '大数据中心', r: '数据加工', s: '启用', t: 'success', l: '2024-10-22 08:30' },
            { u: 'wangfang', n: '王芳', p: '137****9012', e: 'wangfang@qb.gov.cn', o: '12345热线', r: '标注员', s: '启用', t: 'success', l: '2024-10-21 17:20' },
            { u: 'zhaoqiang', n: '赵强', p: '136****3456', e: 'zhaoqiang@qb.gov.cn', o: '交通运输局', r: '审核员', s: '启用', t: 'success', l: '2024-10-21 16:00' },
            { u: 'chenjing', n: '陈静', p: '135****7890', e: 'chenjing@qb.gov.cn', o: '卫健局', r: '标注员', s: '启用', t: 'success', l: '2024-10-21 14:30' },
            { u: 'liuyang', n: '刘洋', p: '134****2345', e: 'liuyang@qb.gov.cn', o: '司法局', r: '测评员', s: '启用', t: 'success', l: '2024-10-20 10:15' },
            { u: 'sunlei', n: '孙磊', p: '133****6789', e: 'sunlei@qb.gov.cn', o: '交通运输局', r: '加工需求方', s: '禁用', t: 'default', l: '2024-10-15 09:00' },
            { u: 'zhouting', n: '周婷', p: '132****0123', e: 'zhouting@qb.gov.cn', o: '大数据中心', r: '标注员', s: '启用', t: 'success', l: '2024-10-22 08:50' }
          ].map(row => \`
            <tr>
              <td><label class="checkbox"><input type="checkbox"><span class="checkbox-box"></span></label></td>
              <td class="font-medium">\${row.u}</td>
              <td>
                <div class="od-row" style="gap: 8px;">
                  <div class="user-avatar" style="width:28px;height:28px;font-size:12px;">\${row.n.charAt(0)}</div>
                  \${row.n}
                </div>
              </td>
              <td>\${row.p}</td>
              <td style="font-size:13px;">\${row.e}</td>
              <td>\${row.o}</td>
              <td><span class="tag tag-primary">\${row.r}</span></td>
              <td><span class="tag tag-\${row.t}">\${row.s}</span></td>
              <td style="color:var(--dpp-muted);font-size:13px;">\${row.l}</td>
              <td>
                <button class="btn btn-text btn-sm">编辑</button>
                <button class="btn btn-text btn-sm">重置密码</button>
                <button class="btn btn-text btn-sm" style="color:var(--dpp-error);">\${row.s === '启用' ? '禁用' : '启用'}</button>
              </td>
            </tr>
          \`).join('')}
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
  \`;
};
`;

fs.appendFileSync('js/pages-part3.js', userPage, 'utf8');
console.log('User page added');

// Role page
let rolePage = `
Pages.role = function() {
  return \`
  <div class="page-header">
    <div>
      <div class="page-title">角色权限</div>
      <div class="page-subtitle">管理系统角色与权限配置，支持角色全生命周期管理</div>
    </div>
    <div class="page-actions">
      <button class="btn btn-primary">\${DPP.icon('plus')} 新增角色</button>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:280px 1fr;gap:16px;">
    <div class="card">
      <div class="card-header"><div class="card-title">角色列表</div></div>
      <div class="tree">
        \${[
          { n: 'RA-01 平台管理员', c: 2, a: true },
          { n: 'RA-02 加工需求方', c: 15 },
          { n: 'RA-03 项目负责人', c: 8 },
          { n: 'RA-07 数据加工', c: 12 },
          { n: 'RA-04 标注员', c: 28 },
          { n: 'RA-05 审核员', c: 6 },
          { n: 'RA-06 测评员', c: 4 },
          { n: '自定义角色-质检组长', c: 3 },
          { n: '自定义角色-数据分析师', c: 2 }
        ].map(r => \`
          <div class="tree-node \${r.a ? 'selected' : ''}" onclick="Pages.selectRole(this)">
            <span style="flex:1;">\${r.n}</span>
            <span style="font-size:12px;color:var(--dpp-muted);">\${r.c}人</span>
          </div>
        \`).join('')}
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">权限配置 - RA-01 平台管理员</div>
        <div class="od-row" style="gap:8px;">
          <button class="btn btn-sm">复制角色</button>
          <button class="btn btn-primary btn-sm">保存修改</button>
        </div>
      </div>
      <div style="padding:16px 24px;">
        \${[
          { m: '工作台', p: ['查看工作台', '数据概览', '快捷操作'] },
          { m: '数据接入', p: ['数据源管理', '同步任务管理', '数据上传', '接入配置'] },
          { m: '数据集管理', p: ['工单管理', '数据集列表', '预处理任务', '版本管理'] },
          { m: '标注中心', p: ['标注项目管理', '标注工作台', '任务分配', '质量校验', '标注统计'] },
          { m: '测评与交付', p: ['数据集测评', '封装交付', '授权管理', '下载管理'] },
          { m: '系统管理', p: ['用户管理', '角色权限', '组织架构', '操作日志', '系统配置'] }
        ].map(g => \`
          <div style="margin-bottom:20px;">
            <div class="od-row" style="gap:8px;margin-bottom:12px;">
              <label class="checkbox"><input type="checkbox" checked><span class="checkbox-box"></span></label>
              <span class="font-medium">\${g.m}</span>
            </div>
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding-left:28px;">
              \${g.p.map(p => \`
                <label class="checkbox"><input type="checkbox" checked><span class="checkbox-box"></span>\${p}</label>
              \`).join('')}
            </div>
          </div>
        \`).join('')}
      </div>
    </div>
  </div>
  \`;
};

Pages.selectRole = function(el) {
  document.querySelectorAll('.tree .tree-node').forEach(n => n.classList.remove('selected'));
  el.classList.add('selected');
};
`;

fs.appendFileSync('js/pages-part3.js', rolePage, 'utf8');
console.log('Role page added');

// Org page
let orgPage = `
Pages.org = function() {
  return \`
  <div class="page-header">
    <div>
      <div class="page-title">组织架构</div>
      <div class="page-subtitle">管理组织机构分级与分组，支持角色与组织关联配置</div>
    </div>
    <div class="page-actions">
      <button class="btn btn-primary">\${DPP.icon('plus')} 新增机构</button>
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
          <button class="btn btn-sm">调整组织</button>
          <button class="btn btn-primary btn-sm">\${DPP.icon('plus')} 添加成员</button>
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
            \${[
              { n: '张明', u: 'zhangming', p: '部门负责人', r: '项目负责人', ph: '139****1234', e: 'zhangming@qb.gov.cn', s: '启用', t: 'success' },
              { n: '李伟', u: 'liwei', p: '高级工程师', r: '数据加工', ph: '138****5678', e: 'liwei@qb.gov.cn', s: '启用', t: 'success' },
              { n: '王芳', u: 'wangfang', p: '标注组长', r: '标注员', ph: '137****9012', e: 'wangfang@qb.gov.cn', s: '启用', t: 'success' },
              { n: '赵强', u: 'zhaoqiang', p: '审核组长', r: '审核员', ph: '136****3456', e: 'zhaoqiang@qb.gov.cn', s: '启用', t: 'success' },
              { n: '刘洋', u: 'liuyang', p: '测评工程师', r: '测评员', ph: '134****2345', e: 'liuyang@qb.gov.cn', s: '启用', t: 'success' },
              { n: '周婷', u: 'zhouting', p: '标注员', r: '标注员', ph: '132****0123', e: 'zhouting@qb.gov.cn', s: '启用', t: 'success' }
            ].map(row => \`
              <tr>
                <td>
                  <div class="od-row" style="gap:8px;">
                    <div class="user-avatar" style="width:28px;height:28px;font-size:12px;">\${row.n.charAt(0)}</div>
                    <span class="font-medium">\${row.n}</span>
                  </div>
                </td>
                <td>\${row.u}</td>
                <td>\${row.p}</td>
                <td><span class="tag tag-primary">\${row.r}</span></td>
                <td>\${row.ph}</td>
                <td style="font-size:13px;">\${row.e}</td>
                <td><span class="tag tag-\${row.t}">\${row.s}</span></td>
                <td>
                  <button class="btn btn-text btn-sm">编辑</button>
                  <button class="btn btn-text btn-sm">移除</button>
                </td>
              </tr>
            \`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  \`;
};
`;

fs.appendFileSync('js/pages-part3.js', orgPage, 'utf8');
console.log('Org page added');

// Logs page
let logsPage = `
Pages.logs = function() {
  return \`
  <div class="page-header">
    <div>
      <div class="page-title">操作日志</div>
      <div class="page-subtitle">完整记录所有用户操作日志，支持筛选与导出</div>
    </div>
    <div class="page-actions">
      <button class="btn">\${DPP.icon('upload')} 导出日志</button>
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
          <option>删除</option><option>查询</option><option>登录</option><option>导出</option>
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
          \${[
            { t: '2024-10-22 10:32:15', u: 'admin', o: '平台管理', ty: '修改', m: '用户管理', c: '修改用户 zhangming 的角色为「项目负责人」', ip: '10.10.1.100', r: '成功', tag: 'success' },
            { t: '2024-10-22 10:28:42', u: 'zhangming', o: '大数据中心', ty: '新增', m: '标注任务', c: '创建标注项目「工业质检缺陷标注」', ip: '10.10.1.105', r: '成功', tag: 'success' },
            { t: '2024-10-22 10:15:30', u: 'liwei', o: '大数据中心', ty: '导出', m: '数据集', c: '导出数据集「政务问答语料 v2」元数据', ip: '10.10.1.106', r: '成功', tag: 'success' },
            { t: '2024-10-22 10:05:18', u: 'wangfang', o: '12345热线', ty: '登录', m: '系统', c: '用户登录系统', ip: '10.10.2.50', r: '成功', tag: 'success' },
            { t: '2024-10-22 09:58:47', u: 'zhaoqiang', o: '交通运输局', ty: '修改', m: '质量校验', c: '更新质检任务「视频标注-专项质检」配置', ip: '10.10.3.20', r: '成功', tag: 'success' },
            { t: '2024-10-22 09:45:22', u: 'unknown', o: '-', ty: '登录', m: '系统', c: '登录失败：密码错误', ip: '10.10.5.100', r: '失败', tag: 'error' },
            { t: '2024-10-22 09:30:00', u: 'admin', o: '平台管理', ty: '新增', m: '角色权限', c: '新增自定义角色「质检组长」', ip: '10.10.1.100', r: '成功', tag: 'success' },
            { t: '2024-10-22 09:15:33', u: 'chenjing', o: '卫健局', ty: '查询', m: '数据集', c: '查看数据集「医疗影像分割」详情', ip: '10.10.4.30', r: '成功', tag: 'success' },
            { t: '2024-10-22 09:00:08', u: 'admin', o: '平台管理', ty: '登录', m: '系统', c: '用户登录系统', ip: '10.10.1.100', r: '成功', tag: 'success' },
            { t: '2024-10-22 08:45:20', u: 'zhangming', o: '大数据中心', ty: '登录', m: '系统', c: '用户登录系统', ip: '10.10.1.105', r: '成功', tag: 'success' }
          ].map((row, i) => \`
            <tr>
              <td style="color:var(--dpp-muted);">\${i + 1}</td>
              <td style="font-family:monospace;font-size:13px;">\${row.t}</td>
              <td class="font-medium">\${row.u}</td>
              <td>\${row.o}</td>
              <td><span class="tag tag-info">\${row.ty}</span></td>
              <td>\${row.m}</td>
              <td style="max-width:300px;" class="od-truncate">\${row.c}</td>
              <td style="font-family:monospace;font-size:13px;">\${row.ip}</td>
              <td><span class="tag tag-\${row.tag}">\${row.r}</span></td>
            </tr>
          \`).join('')}
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
  \`;
};
`;

fs.appendFileSync('js/pages-part3.js', logsPage, 'utf8');
console.log('Logs page added');
console.log('Total pages-part3.js size:', fs.statSync('js/pages-part3.js').size);
