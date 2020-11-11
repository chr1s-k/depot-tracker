import { Injectable, NotFoundException } from '@nestjs/common';
import { AssetEntity } from './asset.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetRepository } from './asset.repository';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { CreateAssetDto, AssetId } from '@chris-k-software/api-interfaces';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(AssetRepository)
    private assetRepository: AssetRepository
  ) {}

  async getAll(): Promise<AssetEntity[]> {
    return this.assetRepository.find({ relations: ['transactions'] });
  }

  async create(createAssetDto: CreateAssetDto): Promise<AssetEntity> {
    return this.assetRepository.createAsset(createAssetDto);
  }

  async delete(id: AssetId): Promise<DeleteResult> {
    const deletedAsset = await this.assetRepository.delete(id);
    if (deletedAsset.affected === 0) {
      throw new NotFoundException(`Asset with id ${id} not deleted.`);
    }
    return deletedAsset;
  }
}
