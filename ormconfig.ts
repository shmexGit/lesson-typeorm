import { DataSource } from 'typeorm';

export const connextionSource = new DataSource({
  type: 'sqlite',
  database: './db.sql',
  entities: ['src/**/*.entity.ts'],
  migrationsTableName: 'typeorm_migrations',
  migrations: ['src/migrations/*.{ts,js}'],
})