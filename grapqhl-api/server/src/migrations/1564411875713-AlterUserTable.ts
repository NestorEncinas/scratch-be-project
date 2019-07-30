import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUserTable1564411875713 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("ALTER TABLE `user`");
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
