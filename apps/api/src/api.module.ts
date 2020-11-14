import { Module } from '@nestjs/common';
import { TransactionModule } from './transaction/transaction.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetEntity } from './asset/asset.entity';
import { TransactionEntity } from './transaction/transaction.entity';
import { AssetModule } from './asset/asset.module';

@Module({
  imports: [
    TransactionModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: process.env.DEPOT_TRACKER_MY_SQL_PW,
      database: 'depot',
      //TODO Dont use in production!
      synchronize: true,
      logging: false,
      entities: [AssetEntity, TransactionEntity],
    }),
    AssetModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}
