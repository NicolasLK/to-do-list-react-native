import * as SQLite from "expo-sqlite";

const dbName = "tasks.bd";
const sqlCreateTable =
  "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY autoincrement, name varchar(255) NOT NULL, isCompleted INTEGER NOT NULL);";

let _db = null;

export default function openDB() {}
