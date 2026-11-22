# 校園二手書交換與失物協尋平台 (Campus Exchange & Lost-and-Found Platform)

專為大學校園設計的物品交流與失物協尋系統，讓師生能集中發布、搜尋二手書與失物拾獲資訊，提升校園物品找回與二手書流轉效率。

---

## 🌟 核心特色

1. **使用者身分與認證**：支援註冊與登入模擬，個人發布歷史管理。
2. **物品資訊發布**：提供表單快速刊登遺失、拾獲、二手書刊登等資訊。
3. **即時分類與關鍵字搜尋**：支援書本文具、3C電子、證件卡片、生活用品等多維度篩選。
4. **原型版本齊全**：
   - **標準版**：手機優先、現代扁平介面（`index.html`）。
   - **原型 v2**：清新綠色介面（`v2/index.html`）。
   - **原型 v3**：暗黑科技風格（`v3/index.html`）。
   - **原型 v4**：公佈欄便利貼風格（`v4/index.html`）。
   - **五子棋小遊戲**：休閒放鬆小彩蛋（`gomoku/index.html`）。

---

## 🚀 部署至 Render (Web Service)

本專案已配置具備部署到 [Render](https://render.com) 所需的所有設定檔案：

| 設定項目 | 設定值 | 說明 |
| :--- | :--- | :--- |
| **Runtime** | `Python 3` | 使用 Python 容器運行 |
| **Build Command** | `pip install -r requirements.txt` | 安裝 Flask 與 gunicorn |
| **Start Command** | `gunicorn app:app` | 以 Gunicorn WSGI 啟動 Flask 應用 |
| **Health Check Path** | `/health` | 提供系統健康度檢查端點 |

### 部署方式

1. 登入 [Render Dashboard](https://dashboard.render.com/)。
2. 點擊 **New +** 選擇 **Web Service**。
3. 連結此 GitHub Repository。
4. 檢查設定：
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
5. 點擊 **Create Web Service**，系統將自動建置並發布上線！

---

## 💻 本地端運行

### 1. 安裝相依套件

```bash
pip install -r requirements.txt
```

### 2. 本地啟動伺服器

```bash
python app.py
```

或使用 Gunicorn（Linux / macOS）：

```bash
gunicorn app:app
```

啟動後瀏覽器打開 `http://localhost:5000` 即可訪問。

---

## 📁 專案檔案結構

```text
├── app.py                      # Flask 伺服器入口點 (支援 Render 部署)
├── requirements.txt            # Python 相依套件 (Flask, gunicorn)
├── Procfile                    # Render / Heroku 程序定義檔
├── render.yaml                 # Render Blueprint 自動化部署配置檔
├── index.html                  # 平台首頁 (標準版)
├── auth.html                   # 登入與註冊頁面
├── post.html                   # 刊登與發布頁面
├── detail.html                 # 物品詳細資訊頁面
├── profile.html                # 個人資料與刊登管理
├── css/style.css               # 全站統一樣式表
├── js/app.js                   # 前端資料層與共用工具
├── v2/                         # 原型版本 2
├── v3/                         # 原型版本 3 (暗黑風格)
├── v4/                         # 原型版本 4 (公佈欄風格)
├── gomoku/                     # 五子棋小遊戲
└── README.md                   # 專案說明與部署文件
```
