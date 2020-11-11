import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { ApiModule } from '../src/api.module';
import { CreateAssetDto, AssetId } from '@chris-k-software/api-interfaces';

describe('Asset', () => {
  let app: INestApplication;
  let id: AssetId;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ApiModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/Post new asset without name should throw error`, () => {
    const createAssetDto: Partial<CreateAssetDto> = {
      location: 'location',
      wkn: 'wkn',
      isin: 'isin',
      description: 'description',
      risk: 'risk',
    };
    return request(app.getHttpServer())
      .post('/v1/asset')
      .send(createAssetDto)
      .expect(HttpStatus.BAD_REQUEST)
      .expect(({ body }) => {
        expect(body).toHaveProperty('message');
        expect(body.message).toBeInstanceOf(Array);
        expect(body.message.length).toEqual(1);
        expect(body['message']).toContainEqual(
          'name must be longer than or equal to 3 characters'
        );
        id = body.id;
      });
  });

  it(`/Post new asset without name and risk should throw error`, () => {
    const createAssetDto: Partial<CreateAssetDto> = {
      location: 'location',
      wkn: 'wkn',
      isin: 'isin',
      description: 'description',
    };
    return request(app.getHttpServer())
      .post('/v1/asset')
      .send(createAssetDto)
      .expect(HttpStatus.BAD_REQUEST)
      .expect(({ body }) => {
        expect(body).toHaveProperty('message');
        expect(body.message).toBeInstanceOf(Array);
        expect(body.message.length).toEqual(2);
        expect(body['message']).toContainEqual(
          'name must be longer than or equal to 3 characters'
        );
        expect(body['message']).toContainEqual(
          'risk should not be null or undefined'
        );
        id = body.id;
      });
  });

  it(`/Post new asset`, () => {
    const createAssetDto: CreateAssetDto = {
      location: 'location',
      wkn: 'wkn',
      isin: 'isin',
      description: 'description',
      name: 'name',
      risk: 'risk',
    };
    return request(app.getHttpServer())
      .post('/v1/asset')
      .send(createAssetDto)
      .expect(HttpStatus.CREATED)
      .expect(({ body }) => {
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty('location');
        expect(body['location']).toEqual('location');
        id = body.id;
      });
  });

  it(`/GET asset`, () => {
    return request(app.getHttpServer())
      .get('/v1/asset')
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBeGreaterThanOrEqual(1);
      });
  });

  // TODO decouple test
  it(`/DELETE asset`, () => {
    return request(app.getHttpServer())
      .delete(`/v1/asset?id=${id}`)
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
