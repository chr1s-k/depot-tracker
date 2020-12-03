import { HttpModule, Module } from '@nestjs/common';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { AssetRepository } from './asset.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AssetRepository]), HttpModule],
  controllers: [AssetController],
  providers: [AssetService],
})
export class AssetModule {}
