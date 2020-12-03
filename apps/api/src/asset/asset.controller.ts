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

  @Delete(URLS.assetDeleteV1)
  delete(@Query('id', ParseIntPipe) id: AssetId): Promise<DeleteResult> {
    this.log.verbose(`Deleting asset with id ${id}`);
    return this.assetService.delete(id);
  }

  @Get(URLS.assetGetAllV1)
  getAll(): Promise<AssetEntity[]> {
    this.log.verbose(`Getting all assets.`);
    return this.assetService.getAll();
  }

  @Get(URLS.assetDetailsV1)
  details(@Query('symbol') symbol: string): Promise<unknown> {
    this.log.verbose(`Getting details for asset with symbol ${symbol}.`);
    return this.assetService.assetDetails(symbol);
  }

  @Get(URLS.assetSymbolTypeahedV1)
  typeahead(@Query('q') q: string): Promise<unknown> {
    this.log.verbose(`Getting typeahead for ${q}.`);
    return this.assetService.symbolTypeahead(q);
  }
}
