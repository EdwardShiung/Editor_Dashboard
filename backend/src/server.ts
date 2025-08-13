// 最基本的套件
import express from 'express';  // 導入 Express 框架
import cors from 'cors';        // 處理跨域請求
import helmet from 'helmet';    // 提供安全 headers
import morgan from 'morgan';    // HTTP 請求日誌記錄
// 認證相關 imports
import session from 'express-session';
import passport from 'passport';
// 環境變數和資料庫
import dotenv from 'dotenv';    // 讀取 .env 環境變數
import { initializeDatabase } from './config/database'; // 料庫初始化函數

dotenv.config();

// 初始化配置
const app = express();                  // 建立 Express 應用程式實例
const PORT = process.env.PORT || 3001;  // 設定 port，優先使用環境變數，否則預設 3001

// 設置中間件
app.use(helmet());                      // Helmet 為應用程式添加安全 headers

app.use(cors({                          // https://youtu.be/pBYVpULIsY4
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true                   // 允許攜帶 cookies 和 headers
}));

app.use(morgan('combined'));                        // HTTP 請求日誌，'combined' 格式提供詳細的日誌資訊
app.use(express.json({ limit: '10mb' }));           // 解析 JSON 請求體，限制 10MB 大小
app.use(express.urlencoded({ extended: true }));    // 解析 URL 編碼的請求體

// Session 設定
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_session_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 24 小時
    }
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Inspection Server (提供一個簡單的健康檢查端點，用於監控服務狀態)
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timeStamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
});


// Error Handling Middleware (Client 端請求 已知 Router，並將錯誤進行返回)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!'
    });
});

// 404 handler (Client 端請求 未知 Router，並將錯誤進行返回)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Initialize database and start server
const startServer = async () => {
  try {
    await initializeDatabase();     // 任何錯誤都會被 catch 捕捉
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);                // 安全退出
  }
};

// Launch Server
startServer();