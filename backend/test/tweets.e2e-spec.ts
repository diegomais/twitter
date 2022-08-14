import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('TweetsResolver (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    app.close();
  });

  it('/graphql (POST)', () => {
    const queryData = {
      query: `query allTweets {
        tweets {
          text
        }
      }`,
    };

    const expectedResponse = JSON.stringify({ data: { tweets: [] } }) + '\n';

    return request(app.getHttpServer())
      .post('/graphql')
      .send(queryData)
      .expect(200)
      .expect(expectedResponse);
  });
});
