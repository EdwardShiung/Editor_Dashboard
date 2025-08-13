/*
命名慣例：

因為我們要為 Express.js 框架擴展類型定義，所以命名為 express.d.ts。

1. Module Augmentation (模組擴展)

這是 TypeScript 的模組擴展語法，讓我們可以：

- 擴展第三方庫的類型定義
- 不修改原始庫的程式碼
- 保持類型安全

2. 為什麼需要擴展 Express？

- Express.js 原本的 Request 物件沒有 user 屬性：
// Express 原始定義（簡化版）
    interface Request {
        params: any;
        query: any;
        body: any;
        headers: any;
        // 沒有 user 屬性
    }

總結：
express.d.ts 檔案的作用是：

1. 類型擴展 - 為 Express 框架添加我們需要的類型定義
2. 開發體驗 - 提供 IDE 智慧提示和類型檢查
3. 錯誤預防 - 編譯時就能發現類型錯誤
4. 程式碼可讀性 - 明確定義了我們在 Express 中使用的自訂屬性
*/
import type { User } from './index';

declare global {
  namespace Express {
    interface Request {
      user?: User;        // 擴展 Express Request 物件
    }
    
    interface User {      // 定義 Express User 類型
      id: string;
      email: string;
      name: string;
      avatar_url?: string;
      role: 'admin' | 'editor' | 'general';
      google_id: string;
      created_at: Date;
      updated_at: Date;
    }
  }
}