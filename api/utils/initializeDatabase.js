const fs = require('fs');
const path = require('path');
const { sequelize } = require('../models');

/**
 * Reads a SQL file and splits it into individual statements,
 * filtering out empty lines and comment-only lines.
 */
function parseSqlFile(filePath) {
  const sql = fs.readFileSync(filePath, 'utf8');
  const withoutComments = sql
    .split(/\r?\n/)
    .filter((line) => !line.trim().startsWith('--'))
    .join('\n');

  return withoutComments
    .split(';')
    .map((stmt) => stmt.trim())
    .filter((stmt) => stmt.length > 0);
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
    // Check whether the required tables already exist
    const [rows] = await sequelize.query(
      `SELECT table_name
       FROM information_schema.tables
       WHERE table_schema = DATABASE()
         AND table_name IN ('categories', 'specialites', 'artisans');`
    );

    const existingTables = new Set(rows.map((row) => row.TABLE_NAME || row.table_name));
    const requiredTables = ['categories', 'specialites', 'artisans'];
    const allTablesExist = requiredTables.every((table) => existingTables.has(table));

    if (!allTablesExist) {
      console.log('🛠️  Missing tables — running database schema initialization...');

      const createSqlPath = path.join(__dirname, '..', 'create_database.sql');
      console.log('📄 Executing create_database.sql...');
      await executeSqlFile(createSqlPath);
      console.log('✅ Schema created successfully.');
    } else {
      console.log('ℹ️  Tables already exist — skipping schema initialization.');
    }

    const [countRows] = await sequelize.query('SELECT COUNT(*) AS count FROM artisans;');
    const artisanCount = Number(countRows[0].count || 0);

    if (artisanCount > 0) {
      console.log('ℹ️  Seed data already exists — skipping database seeding.');
      return;
    }

    const seedSqlPath = path.join(__dirname, '..', 'seed_database.sql');
    console.log('📄 Executing seed_database.sql...');
    await executeSqlFile(seedSqlPath);
    console.log('✅ Seed data inserted successfully.');

    console.log('🎉 Database initialization complete.');
  } catch (err) {
    console.error('❌ Database initialization failed:', err.message);
  }
}

module.exports = initializeDatabase;
