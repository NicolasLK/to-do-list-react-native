import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "appTasks.sqlite";

const SQL_CREATE_ENTRIES = `
CREATE TABLE IF NOT EXISTS tasks (
id INTEGER PRIMARY KEY autoincrement,
name varchar(255) NOT NULL,
isCompleted boolean NOT NULL
)`;

let _db = null;

export default function openDB() {
  if (!_db) {
    _db = SQLite.openDatabaseSync(DATABASE_NAME);

    _db.withTransactionSync(() => {
      _db.execSync(SQL_CREATE_ENTRIES);
    });
  }

  return _db;
}
