import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserPhoto1564652554221 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `photo` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `photoId` int NULL, UNIQUE INDEX `REL_75e2be4ce11d447ef43be0e374` (`photoId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_75e2be4ce11d447ef43be0e374f` FOREIGN KEY (`photoId`) REFERENCES `photo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_75e2be4ce11d447ef43be0e374f`");
        await queryRunner.query("DROP INDEX `REL_75e2be4ce11d447ef43be0e374` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `photo`");
    }

}
