import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AssetEntity } from './asset.entity';
import { AssetService } from './asset.service';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import type { AssetId } from '@chris-k-software/api-interfaces';
import { CreateAssetDto, URLS } from '@chris-k-software/api-interfaces';

@Controller()
export class AssetController {
  private log = new Logger('AssetController');
  constructor(private assetService: AssetService) {}

  @Post(URLS.assetCreateV1)
  @UsePipes(ValidationPipe)
  create(@Body() createAssetDto: CreateAssetDto): Promise<AssetEntity> {
    this.log.verbose(`Saving asset with dto ${JSON.stringify(createAssetDto)}`);
    return this.assetService.create(createAssetDto);
  }

  @Delete()
  @UsePipes(ValidationPipe)
  delete(@Query('id', ParseIntPipe) id: AssetId): Promise<DeleteResult> {
    this.log.verbose(`Deleting asset with id ${id}`);
    return this.assetService.delete(id);
  }

  @Get(URLS.assetCreateV1)
  @UsePipes(ValidationPipe)
  getAll(): Promise<AssetEntity[]> {
    this.log.verbose(`Getting all assets.`);
    return this.assetService.getAll();
  }
}
