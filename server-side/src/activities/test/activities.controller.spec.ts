import { Test, TestingModule } from '@nestjs/testing';
import { ActivitiesController } from '../activities.controller';
import { ActivitiesService } from '../activities.service';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('ActivitiesController', () => {
  let app: INestApplication;
  let activitiesService = {
    getActivities: jest.fn().mockReturnValue({
      data: [
        {
          id: 25651,
          title: "German Tour: Parliament Quarter & Reichstag glass dome",
          price: 14,
          currency: "$",
          rating: 4.8,
          specialOffer: false,
          supplier: {
            id: 1,
            name: "John Doe",
            address: "123 Main St",
            zip: "12345",
            city: "Anytown",
            country: "USA",
          },
        },
      ],
      total: 1,
      hash: 'somehashvalue'
    }),
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ActivitiesController],
      providers: [
        {
          provide: ActivitiesService,
          useValue: activitiesService,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/GET activities (ETag match)', async () => {
    return request(app.getHttpServer())
      .get('/activities?page=1&limit=10&search=')
      .set('if-none-match', 'somehashvalue')
      .expect(HttpStatus.NOT_MODIFIED);
  });

  it('/GET activities (new data)', async () => {
    return request(app.getHttpServer())
      .get('/activities?page=1&limit=10&search=')
      .expect(HttpStatus.OK)
      .expect('ETag', 'somehashvalue')
      .expect('Cache-Control', 'no-cache')
      .expect((res) => {
        expect(res.body.data).toHaveLength(1);
        expect(res.body.total).toBe(1);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
