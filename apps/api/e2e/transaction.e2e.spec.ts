import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { ApiModule } from '../src/api.module';
import { AssetId } from '@chris-k-software/api-interfaces';
import { CreateTransactionDto } from '@chris-k-software/api-interfaces';

describe('Transaction', () => {
  let app: INestApplication;
  let id: AssetId;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ApiModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/Post transactionDto without assetId`, () => {
    const createTransactionDto: Partial<CreateTransactionDto> = {
      fee: 0,
      unitCount: 1,
      unitPrice: 0,
    };
    return request(app.getHttpServer())
      .post('/v1/transaction')
      .send(createTransactionDto)
      .expect(HttpStatus.BAD_REQUEST)
      .expect(({ body }) => {
        expect(body).toHaveProperty('message');
        expect(body.message).toBeInstanceOf(Array);
        expect(body.message.length).toEqual(1);
        expect(body['message']).toContainEqual(
          'assetId must be a positive number'
        );
        id = body.id;
      });
  });

  it(`/Post transactionDto without fee`, () => {
    const createTransactionDto: Partial<CreateTransactionDto> = {
      assetId: 1,
      unitCount: 1,
      unitPrice: 0,
    };
    return request(app.getHttpServer())
      .post('/v1/transaction')
      .send(createTransactionDto)
      .expect(HttpStatus.BAD_REQUEST)
      .expect(({ body }) => {
        expect(body).toHaveProperty('message');
        expect(body.message).toBeInstanceOf(Array);
        expect(body.message.length).toEqual(1);
        expect(body['message']).toContainEqual(
          'fee should not be null or undefined'
        );
        id = body.id;
      });
  });

  it(`/Post transactionDto with not existing asset id`, () => {
    const createTransactionDto: Partial<CreateTransactionDto> = {
      assetId: 999999,
      unitCount: 1,
      unitPrice: 0,
      fee: 0,
    };
    return request(app.getHttpServer())
      .post('/v1/transaction')
      .send(createTransactionDto)
      .expect(HttpStatus.NOT_FOUND)
      .expect(({ body }) => {
        expect(body).toHaveProperty('message');
        expect(body.message).toBeInstanceOf(Array);
        expect(body.message.length).toEqual(1);
        expect(body['message']).toContainEqual(
          'Asset with id 999999 not found, but needed for transaction to be created.'
        );
        id = body.id;
      });
  });

  it(`/Post new transaction`, () => {
    const createTransactionDto: CreateTransactionDto = {
      assetId: 1,
      fee: 0,
      unitCount: 1,
      unitPrice: 0,
    };
    return request(app.getHttpServer())
      .post('/v1/transaction')
      .send(createTransactionDto)
      .expect(HttpStatus.CREATED)
      .expect(({ body }) => {
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty('fee');
        expect(body['fee']).toEqual(0);
        id = body.id;
      });
  });

  it(`/GET transactions`, () => {
    return request(app.getHttpServer())
      .get('/v1/transaction')
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBeGreaterThanOrEqual(1);
      });
  });

  // TODO decouple test
  it(`/DELETE transaction`, () => {
    return request(app.getHttpServer())
      .delete(`/v1/transaction?id=${id}`)
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        expect(body).toBeInstanceOf(Object);
        expect(body.affected).toEqual(1);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
