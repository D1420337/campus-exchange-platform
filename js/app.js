/**
 * app.js - 共用資料層與工具函式
 * 資料儲存於 localStorage，作為第一版 Demo 後端
 */

// ============================================================
// 資料層 (Data Layer)
// ============================================================

const DB = {
  // 取得當前登入使用者
  getCurrentUser() {
    const u = localStorage.getItem('lf_current_user');
    return u ? JSON.parse(u) : null;
  },

  // 儲存當前使用者
  setCurrentUser(user) {
    if (user) localStorage.setItem('lf_current_user', JSON.stringify(user));
    else localStorage.removeItem('lf_current_user');
  },

  // 取得所有使用者
  getUsers() {
    return JSON.parse(localStorage.getItem('lf_users') || '[]');
  },

  // 儲存使用者列表
  saveUsers(users) {
    localStorage.setItem('lf_users', JSON.stringify(users));
  },

  // 依 email 找使用者
  findUserByEmail(email) {
    return this.getUsers().find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  // 取得所有物品
  getItems() {
    return JSON.parse(localStorage.getItem('lf_items') || 'null') || this._seedItems();
  },

  // 儲存物品列表
  saveItems(items) {
    localStorage.setItem('lf_items', JSON.stringify(items));
  },

  // 新增物品
  addItem(item) {
    const items = this.getItems();
    item.id = 'item_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
    item.createdAt = new Date().toISOString();
    item.status = 'searching'; // 預設尋找中
    items.unshift(item);
    this.saveItems(items);
    return item;
  },

  // 依 ID 取得物品
  getItemById(id) {
    return this.getItems().find(i => i.id === id) || null;
  },

  // 更新物品
  updateItem(id, updates) {
    const items = this.getItems();
    const idx = items.findIndex(i => i.id === id);
    if (idx !== -1) {
      items[idx] = { ...items[idx], ...updates };
      this.saveItems(items);
      return items[idx];
    }
    return null;
  },

  // 刪除物品
  deleteItem(id) {
    const items = this.getItems().filter(i => i.id !== id);
    this.saveItems(items);
  },

  // 搜尋物品
  searchItems({ keyword = '', category = 'all', type = 'all' } = {}) {
    let items = this.getItems();
    if (type !== 'all') items = items.filter(i => i.type === type);
    if (category !== 'all') items = items.filter(i => i.category === category);
    if (keyword.trim()) {
      const kw = keyword.trim().toLowerCase();
      items = items.filter(i =>
        i.title.toLowerCase().includes(kw) ||
        (i.description || '').toLowerCase().includes(kw) ||
        i.location.toLowerCase().includes(kw)
      );
    }
    return items;
  },

  // 初始範例資料（第一次開啟時顯示）
  _seedItems() {
    const samples = [
      {
        id: 'sample_1', type: 'lost', title: '黑色 AirPods Pro',
        category: 'electronics', location: '圖書館 3 樓', date: '2026-03-24',
        description: '左耳掉了，有黑色保護殼，盒子上有貼名字', photo: null,
        status: 'searching', userId: 'demo', userName: '陳小明',
        userPhone: '0912-345-678', userEmail: 'demo@school.edu',
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'sample_2', type: 'found', title: '學生證',
        category: 'id_card', location: '學生餐廳', date: '2026-03-24',
        description: '在餐廳B棟撿到，已交給服務台', photo: null,
        status: 'searching', userId: 'demo2', userName: '王小華',
        userPhone: '0923-456-789', userEmail: 'demo2@school.edu',
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'sample_3', type: 'lost', title: '深藍色雨傘',
        category: 'umbrella', location: '工學院B棟走廊', date: '2026-03-23',
        description: '直傘、深藍色，把手有黃色貼紙', photo: null,
        status: 'searching', userId: 'demo', userName: '陳小明',
        userPhone: '0912-345-678', userEmail: 'demo@school.edu',
        createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'sample_4', type: 'found', title: '黑色水壺',
        category: 'others', location: '體育館', date: '2026-03-22',
        description: '350ml 黑色保溫壺，蓋子有小刮痕', photo: null,
        status: 'resolved', userId: 'demo2', userName: '王小華',
        userPhone: '0923-456-789', userEmail: 'demo2@school.edu',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'sample_5', type: 'lost', title: '計算機（全名牌）',
        category: 'stationery', location: '教學大樓301教室', date: '2026-03-22',
        description: 'CASIO fx-991ES PLUS，上面有我的學號貼紙', photo: null,
        status: 'searching', userId: 'demo3', userName: '林小玲',
        userPhone: '0934-567-890', userEmail: 'demo3@school.edu',
        createdAt: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
      },
    ];
    this.saveItems(samples);
    return samples;
  }
};

// ============================================================
// 分類設定
// ============================================================

const CATEGORIES = [
  { value: 'all',         label: '全部',     icon: '🔍' },
  { value: 'electronics', label: '電子產品', icon: '📱' },
  { value: 'id_card',     label: '證件',     icon: '🪪' },
  { value: 'stationery',  label: '文具',     icon: '✏️' },
  { value: 'clothing',    label: '衣物',     icon: '👕' },
  { value: 'umbrella',    label: '雨具',     icon: '☂️' },
  { value: 'bag',         label: '包包',     icon: '🎒' },
  { value: 'others',      label: '其他',     icon: '📦' },
];

function getCategoryLabel(value) {
  const c = CATEGORIES.find(c => c.value === value);
  return c ? c.label : value;
}

function getCategoryIcon(value) {
  const c = CATEGORIES.find(c => c.value === value);
  return c ? c.icon : '📦';
}

// ============================================================
// Auth 工具
// ============================================================

function requireAuth(redirectTo = 'auth.html') {
  const user = DB.getCurrentUser();
  if (!user) { window.location.href = redirectTo; return null; }
  return user;
}

function logout() {
  DB.setCurrentUser(null);
  window.location.href = 'auth.html';
}

// ============================================================
// UI 工具
// ============================================================

// 顯示 Toast 訊息
function showToast(msg, type = '') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = 'toast' + (type ? ' ' + type : '');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// 格式化相對時間
function timeAgo(isoString) {
  const diff = Math.floor((Date.now() - new Date(isoString)) / 1000);
  if (diff < 60) return '剛剛';
  if (diff < 3600) return Math.floor(diff / 60) + ' 分鐘前';
  if (diff < 86400) return Math.floor(diff / 3600) + ' 小時前';
  return Math.floor(diff / 86400) + ' 天前';
}

// 建立物品卡片 HTML（用於列表頁）
function buildItemCard(item) {
  const typeBadge = item.type === 'lost'
    ? '<span class="badge badge-lost">遺失</span>'
    : '<span class="badge badge-found">拾獲</span>';
  const statusBadge = item.status === 'resolved'
    ? '<span class="badge badge-resolved">已找到</span>'
    : '<span class="badge badge-searching">尋找中</span>';
  const imgContent = item.photo
    ? `<img src="${item.photo}" alt="物品照片" class="item-card-img" style="object-fit:cover">`
    : `<div class="item-card-img">${getCategoryIcon(item.category)}</div>`;

  return `
    <a class="item-card" href="detail.html?id=${item.id}">
      ${imgContent}
      <div class="item-card-info">
        <div class="item-card-top">
          <span class="item-card-name">${escapeHtml(item.title)}</span>
          ${typeBadge}
        </div>
        <div class="item-card-meta">
          <span>📍 ${escapeHtml(item.location)}</span>
          <span>🕐 ${timeAgo(item.createdAt)}</span>
        </div>
        <div class="mt-1">${statusBadge}</div>
      </div>
    </a>`;
}

// HTML 轉義，防止 XSS
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
            .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

// 更新 Topbar 右側顯示
function renderTopbarUser(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const user = DB.getCurrentUser();
  if (user) {
    el.innerHTML = `
      <a href="profile.html" class="btn btn-ghost btn-sm">👤 ${escapeHtml(user.name || user.email.split('@')[0])}</a>
      <button class="btn btn-outline btn-sm" onclick="logout()">登出</button>`;
  } else {
    el.innerHTML = `<a href="auth.html" class="btn btn-primary btn-sm">登入 / 註冊</a>`;
  }
}
