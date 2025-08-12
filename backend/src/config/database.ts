import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'editor_dashboard',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};


export const pool = mysql.createPool(dbConfig);

// Initialize DB Table
export const initializeDatabase = async () => {
  try {
    // USER Table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        avatar_url TEXT,
        role ENUM('admin', 'editor', 'general') DEFAULT 'general',
        google_id VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // BLOG Table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS blogs (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        title VARCHAR(500) NOT NULL,
        content LONGTEXT NOT NULL,
        excerpt TEXT,
        author_id VARCHAR(36) NOT NULL,
        status ENUM('draft', 'published') DEFAULT 'draft',
        likes_count INT DEFAULT 0,
        comments_count INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // COMMENT Table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS comments (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        content TEXT NOT NULL,
        blog_id VARCHAR(36) NOT NULL,
        author_id VARCHAR(36) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    console.log('Database Initialized Successfully');
  } catch (error) {
    console.error('Database Initialized Error:', error);
    throw error;
  }
}