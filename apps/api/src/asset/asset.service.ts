import { HttpService, Injectable, NotFoundException } from '@nestjs/common';
import { AssetEntity } from './asset.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetRepository } from './asset.repository';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import {
  AssetId,
  CreateAssetDto,
  Quote,
} from '@chris-k-software/api-interfaces';
import { map, pluck } from 'rxjs/operators';

@Injectable()
export class AssetService {
  constructor(
    private http: HttpService,
    @InjectRepository(AssetRepository)
    private assetRepository: AssetRepository
  ) {}

  getAll(): Promise<AssetEntity[]> {
    return this.assetRepository.find({ relations: ['transactions'] });
  }

  create(createAssetDto: CreateAssetDto): Promise<AssetEntity> {
    return this.assetRepository.createAsset(createAssetDto);
  }

  async delete(id: AssetId): Promise<DeleteResult> {
    const deleteResult = await this.assetRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Asset with id ${id} not deleted.`);
    }
    return deleteResult;
  }

  assetDetails(symbol: string): Promise<unknown> {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-historical-data?symbol=${symbol}&region=US`;
    const headers = {
      'x-rapidapi-key': '29571ccf60msh808489421810296p18bf84jsn614618eb8e83',
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
      useQueryString: true,
    };
    return this.http
      .get<HistoricalDataDto>(url, { headers })
      .pipe(pluck('data'), map(this.latestPrice))
      .toPromise();
  }

  symbolTypeahead(q: string): Promise<Quote[]> {
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?q=${q}&region=US`;
    const headers = {
      'x-rapidapi-key': '29571ccf60msh808489421810296p18bf84jsn614618eb8e83',
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
      useQueryString: true,
    };
    return this.http
      .get<unknown>(url, { headers })
      .pipe(pluck<unknown, Quote[]>('data', 'quotes'))
      .toPromise();
  }

  private latestPrice(data: HistoricalDataDto) {
    return data.prices[0];
  }
}

interface TimeZone {
  gmtOffset: number;
}

interface EventsData {
  amount: number;
  date: number;
  type: string;
  data: number;
}

interface Price {
  date: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adjclose: number;
}

export interface HistoricalDataDto {
  prices: Price[];
  isPending: boolean;
  firstTradeDate: Date;
  id: string;
  timeZone: TimeZone;
  eventsData: EventsData[];
}
