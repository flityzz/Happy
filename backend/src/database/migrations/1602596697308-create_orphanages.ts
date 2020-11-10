import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { boolean } from "yup";

export class createOrphanages1602596697308 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //REALISAR ALTERAÇOES
    //CRIAR TABELA, CRIAR UM NOVO CAMPO, DELETAR ALGUM CAMPO

    await queryRunner.createTable(
      new Table({
        name: "orphanages",
        columns: [
          {
            name: "id",
            type: "integer", //tipo do dado
            unsigned: true,
            isPrimary: true, //chave primaria
            isGenerated: true,
            generationStrategy: "increment", //auto increment
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "latitude",
            type: "decimal",
            scale: 10,
            precision: 2,
          },
          {
            name: "longitude",
            type: "decimal",
            scale: 10,
            precision: 2,
          },
          {
            name: "about",
            type: "text",
          },
          {
            name: "instructions",
            type: "text",
          },
          {
            name: "opening_hours",
            type: "varchar",
          },
          {
            name: "open_on_weekends",
            type: "boolean",
            default: false, //por padrao será false
          },
          {
            name: 'pending',
            type: 'boolean',
            default: true,
          },
          {
            name: "user_id",
            type: "integer",
          },
        ],
        foreignKeys: [
          {
            name: "UserOrphanage",
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // DESFAZER O QUE FOI FEITO NO UP

    await queryRunner.dropTable("orphanages");
  }
}
