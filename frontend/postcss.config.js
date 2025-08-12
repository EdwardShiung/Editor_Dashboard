/**
 * PostCSS 配置檔案
 * PostCSS 是一個用 JavaScript 轉換 CSS 的工具
 * 它允許你使用各種外掛程式來處理 CSS
 */
export default {
  // plugins: 定義要使用的 PostCSS 外掛程式
  plugins: {
    // tailwindcss: 啟用 Tailwind CSS 外掛程式
    // 這個外掛程式會：
    // 1. 讀取 tailwind.config.js 配置
    // 2. 掃描指定的檔案尋找 Tailwind 類別
    // 3. 生成對應的 CSS 程式碼
    // 4. 移除未使用的 CSS（tree-shaking）
    tailwindcss: {},

    // autoprefixer: 自動添加 CSS 前綴
    // 這個外掛程式會：
    // 1. 根據 browserslist 配置自動添加瀏覽器前綴
    // 2. 例如：transform → -webkit-transform, -moz-transform, transform
    // 3. 確保 CSS 在不同瀏覽器中的相容性
    // 4. 你不需要手動寫 -webkit-, -moz- 等前綴
    autoprefixer: {},
  },
};

/**
 * 為什麼需要這個檔案？
 * 
 * 1. Vite 預設支援 PostCSS，會自動讀取這個配置檔案
 * 2. 當你寫 CSS 或在 JSX 中使用 Tailwind 類別時：
 *    - PostCSS 會處理你的 CSS
 *    - Tailwind 外掛程式生成對應的樣式
 *    - Autoprefixer 添加瀏覽器相容性前綴
 * 3. 這樣你就可以在專案中使用 Tailwind 的 utility classes
 * 
 * 處理流程：
 * 你的 CSS/JSX → PostCSS → Tailwind → Autoprefixer → 最終 CSS
 * 
 * 
 *  postcss.config.js - CSS 處理管道
    橋接 Vite 和 Tailwind：讓 Vite 知道要用哪些 CSS 處理工具
    自動化處理：Tailwind 生成 CSS + Autoprefixer 添加前綴
    最佳化：自動移除未使用的 CSS，減少檔案大小
 */
