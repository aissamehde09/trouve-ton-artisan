const fs = require('fs');
const path = require('path');
const { sequelize } = require('../models');

/**
 * Reads a SQL file and splits it into individual statements,
 * filtering out empty lines and comment-only lines.
 */
function parseSqlFile(filePath) {
  const sql = fs.readFileSync(filePath, 'utf8');
  return sql
    .split(';')
    .map((stmt) => stmt.trim())
    .filter((stmt) => stmt.length > 0 && !stmt.startsWith('--'));
}

/**
 * Executes all statements from a SQL file sequentially.
 */
async function executeSqlFile(filePath) {
  const statements = parseSqlFile(filePath);
  for (const statement of statements) {
    await sequelize.query(statement + ';');
  }
}

/**
 * Initializes the database by running create_database.sql and
 * seed_database.sql if the `artisans` table does not yet exist.
 * Errors are logged but will not crash the server.
 */
async function initializeDatabase() {
  try {
    // Check whether the artisans table already exists
    const [rows] = await sequelize.query(
      `SELECT COUNT(*) AS count
       FROM information_schema.tables
       WHERE table_schema = DATABASE()
         AND table_name = 'artisans';`
    );

    const tableExists = rows[0].count > 0;

    if (tableExists) {
      console.log('ℹ️  Tables already exist — skipping database initialization.');
      return;
    }

    console.log('🛠️  Tables not found — running database initialization...');

    const createSqlPath = path.join(__dirname, '..', 'create_database.sql');
    const seedSqlPath = path.join(__dirname, '..', 'seed_database.sql');

    console.log('📄 Executing create_database.sql...');
    await executeSqlFile(createSqlPath);
    console.log('✅ Schema created successfully.');

    console.log('📄 Executing seed_database.sql...');
    await executeSqlFile(seedSqlPath);
    console.log('✅ Seed data inserted successfully.');

    console.log('🎉 Database initialization complete.');
  } catch (err) {
    console.error('❌ Database initialization failed:', err.message);
  }
}

module.exports = initializeDatabase;
