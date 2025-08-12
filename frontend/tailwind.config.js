/** 
 * @type {import('tailwindcss').Config} 
 * 這是 TypeScript 類型註解，告訴編輯器這個配置物件的類型
 * 提供自動完成和類型檢查功能
 */
export default {
  // content: 告訴 Tailwind 在哪些檔案中尋找 CSS 類別名稱
  // 這樣 Tailwind 就知道要為哪些類別生成 CSS 程式碼
  content: [
    './index.html',                    // 掃描根目錄的 index.html
    './src/**/*.{js,ts,jsx,tsx}'      // 掃描 src 資料夾下所有的 JS/TS/JSX/TSX 檔案
  ],
  
  // theme: 自訂設計系統的配置
  theme: {
    // extend: 擴展預設的 Tailwind 主題，而不是覆蓋它
    // 在這裡可以添加自訂顏色、字體、間距等
    extend: {
      // 目前是空的，表示使用 Tailwind 的預設主題
      // 未來可以在這裡添加：
      // colors: { 'custom-blue': '#1e40af' },
      // fontFamily: { 'custom': ['Inter', 'sans-serif'] }
    },
  },
  
  // plugins: Tailwind CSS 外掛程式陣列
  // 可以添加官方或第三方外掛程式來擴展功能
  plugins: [
    // 目前是空的，未來可能會添加：
    // require('@tailwindcss/forms'),      // 表單樣式
    // require('@tailwindcss/typography'), // 文字排版
  ],
};


/**
 * 
 *  總結這兩個檔案的作用：
    tailwind.config.js - Tailwind CSS 的大腦
    告訴 Tailwind 去哪裡找類別名稱：content 陣列指定檔案路徑
    定義設計系統：theme 可以自訂顏色、字體、間距等
    擴展功能：plugins 可以添加額外的 utility classes
 * 
 */