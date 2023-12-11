import { SqlServerConnectionOptions } from "typeorm/driver/sqlserver/SqlServerConnectionOptions";
import { DataSource, DataSourceOptions } from "typeorm";

export const devConfig: SqlServerConnectionOptions = {
    type: 'mssql',
    host: 'localhost',
    port: 1431,
    username: 'sa',
    password: 'Passw0rd',
    database: 'NestDb',
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/migrations/*{.ts,.js}"],
    synchronize: true,
    options: {
        trustServerCertificate: true,
    },
}