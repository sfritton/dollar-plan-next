import pgPromise from 'pg-promise';

function getDatabase() {
  const database = process.env.PGDATABASE ?? 'postgres';
  const host = process.env.PGHOST ?? 'localhost';
  const port = parseInt(process.env.PGPORT ?? '5432', 10);
  const user = process.env.PGUSER ?? '';
  const password = process.env.PGPASSWORD ?? '';

  const pgp = pgPromise();
  const db = pgp(`postgres://${user}:${password}@${host}:${port}/${database}`);

  return db;
}

export default getDatabase();
