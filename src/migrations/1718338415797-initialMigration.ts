import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1718338415797 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE city (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        city_name VARCHAR NOT NULL,
        country_name VARCHAR NOT NULL
      );
    `);

    await queryRunner.query(`
      CREATE TABLE event (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_name VARCHAR NOT NULL,
        price DECIMAL NOT NULL,
        city_id INTEGER,
        FOREIGN KEY(city_id) REFERENCES city(id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE event');
    await queryRunner.query('DROP TABLE city');
  }
}
