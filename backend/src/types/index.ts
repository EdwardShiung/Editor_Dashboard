import {Request} from 'express';

export interface User {
    id: string;
    email: string;
    name: string;
    avatar_url?: string;
    role: 'admin' | 'editor' | 'general';
    google_id: string;
    created_at: Date;
    updated_at: Date;
}

export interface Blog {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    author_id: string;
    status: 'draft' | 'published' | 'archived';
    likes_count: number;
    comments_count: number;
    created_at: Date;
    updated_at: Date;
}

export interface Comment {
    id: string;
    content: string;
    blog_id: string;
    author_id: string;
    created_at: Date;
    updated_at: Date;
}


/**
 * 為什麼用 type 而不是 interface？
 * 語義清楚：這是現有類型的別名，不是新的介面
 * 簡潔性： 直接重用 Express.Request
 * 
 * 主要是為了在 API Handler 裡操作 Request 時，能直接取得驗證後的使用者資訊。
 * 重點是API 處理階段的 Request 型別，方便你存取「已驗證的使用者物件」。
 * 
 */
export type AuthRequest = Request;

export interface JWTPayload {
    userId: string;
    email: string;
    role: string;
}

/**
 * 
 * JWT 設計分析：
 * 最小化資訊
 * 安全考量： JWT 可以被解碼，不放敏感資訊
 * 必要資訊： 只放認證和授權需要的欄位
 * role: string (不是聯合類型)
 * 靈活性： JWT 解碼後是字串，後續再驗證
 * 向後相容： 如果將來增加新角色，不需要修改這個介面
 * 實用性設計：
 * 
 * 用戶登入成功 → 後端用這個型別的資料生成 JWT
 * 前端帶著 JWT 發請求 → 後端解析 JWT → 拿到 JWTPayload
 * 後端根據 userId 查資料庫 → 生成完整的 User → 塞到 AuthRequest.user
 */

/**
 * 💡 串起來的流程
 * 登入：用戶提供帳密 → 後端查出 User → 從 User 取 userId/email/role → 生成 JWTPayload → 簽成 JWT

 * 存取 API：前端帶 JWT → Middleware 驗簽 → 解析出 JWTPayload → 用 userId 查資料庫 → 生成完整 User → 塞到 AuthRequest.user

 * 路由處理：在 Controller 裡用 req.user（型別是 User）進行業務邏輯
 * 
 */