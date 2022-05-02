import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { StoryCollectionEnvelope, StoryEnvelope } from '../src/story/envelopes';
import { addLinks, createLink } from '../src/common/hateoas';
import { apiPath } from '../src/common/helpers';
import { StoryPath } from '../src/story/story.controller';
import { UserPath } from '../src/user/user.controller';
import { StoryEntity } from '../src/story/entities';
import { UserEntity } from '../src/user/entities';
import { CreateStoryDto, UpdateStoryDto } from '../src/story/dto';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '../src/app.module';

describe('StoryController (e2e)', () => {
  let app: INestApplication;

  const user1Jwt =
    // eslint-disable-next-line max-len
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidGVzdDFAdGVzdC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.3wSO7J6ZcCxu1J3-t2BBdy8VtHkvsQ9XC-4Kj76ZaWI';

  const user4Jwt =
    // eslint-disable-next-line max-len
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsImVtYWlsIjoidGVzdDRAdGVzdC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.upIkKZoRF0Rh2nRUnRgPpXwwcwc63esecpzs8hcUAAw';

  // Prepare stories fixture
  const storiesFixture: StoryEntity[] = [
    {
      id: 1,
      createdAt: new Date('2022-04-30 19:58:14.654'),
      title: 'Test 1 title',
      description: 'Test 1 description',
      content: 'Test 1 content',
      authorId: 4,
    },
    {
      id: 2,
      createdAt: new Date('2022-04-30 19:58:14.654'),
      title: 'Test 2 title',
      description: 'Test 2 description',
      content: 'Test 2 content',
      authorId: 7,
    },
    {
      id: 3,
      createdAt: new Date('2022-04-30 19:58:14.654'),
      title: 'Test 3 title',
      description: 'Test 3 description',
      content: 'Test 3 content',
      authorId: 1,
    },
  ];

  // Prepare users fixture
  const usersFixture: UserEntity[] = [
    {
      id: 1,
      createdAt: new Date('2022-04-30 19:58:14.654'),
      email: 'test1@test.com',
      givenName: 'Test 1',
      familyName: 'Test 1',
      profileDescription: 'Testing description 1',
    } as UserEntity,
    {
      id: 4,
      createdAt: new Date('2022-04-30 19:58:14.654'),
      email: 'test4@test.com',
      givenName: 'Test 4',
      familyName: 'Test 4',
      profileDescription: 'Testing description 4',
    } as UserEntity,
    {
      id: 7,
      createdAt: new Date('2022-04-30 19:58:14.654'),
      email: 'test7@test.com',
      givenName: 'Test 7',
      familyName: 'Test 7',
      profileDescription: 'Testing description 7',
    } as UserEntity,
  ];

  // Mock the PrismaService
  const prismaService = {
    story: {
      findMany: jest.fn((args?: any) => {
        if (args.where) {
          return storiesFixture.filter(
            (s) =>
              s.title.toLowerCase().includes(args.where.OR[0].title.contains.toLowerCase()) ||
              s.title.toLowerCase().includes(args.where.OR[1].description.contains.toLowerCase()),
          );
        }
        return storiesFixture;
      }),
      findUnique: jest.fn((args: any) => {
        const res = storiesFixture.find((s) => s.id === args.where.id);
        return res ?? null;
      }),
      create: jest.fn(async (dto: any) => {
        return {
          id: storiesFixture.length + 1,
          createdAt: new Date('2022-04-30 19:58:14.654'),
          content: dto.data.content,
          title: dto.data.title,
          description: dto.data.description,
          authorId: dto.data.authorId,
        } as StoryEntity;
      }),
      update: jest.fn(async (args: any) => {
        const story = storiesFixture.find((s) => s.id === args.where.id);
        if (story) {
          return {...story, ...args.data};
        }
        throw new NotFoundException();
      }),
      delete: jest.fn(async (args: any) => {
        const story = storiesFixture.find((s) => s.id === args.where.id);
        if (story) {
          return story;
        }
        throw new NotFoundException();
      }),
    },
    user: {
      findFirst: jest.fn(async (args: any) => {
        const email = args.where.email;
        const res = usersFixture.find((u) => u.email === email);
        return res ?? null;
      }),
    },
    storiesOnReadingLists: {
      deleteMany: jest.fn(async (args: any) => { return; })
    }
  };

  // Mock the ConfigService
  const configService = {
    get: (key: string) => {
      switch (key) {
        case 'JWT_SECRET':
          return 'test';
        default:
          return null;
      }
    },
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      // imports: [StoryModule, PrismaModule, UserModule],
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaService)
      .overrideProvider(ConfigService)
      .useValue(configService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /stories', () => {
    test('Responds with JSON representation of stories envelope.', () => {
      const expectedResponse = new StoryCollectionEnvelope([
        {
          id: 1,
          createdAt: new Date('2022-04-30 19:58:14.654'),
          title: 'Test 1 title',
          description: 'Test 1 description',
          content: 'Test 1 content',
          authorId: 4,
        },
        {
          id: 2,
          createdAt: new Date('2022-04-30 19:58:14.654'),
          title: 'Test 2 title',
          description: 'Test 2 description',
          content: 'Test 2 content',
          authorId: 7,
        },
        {
          id: 3,
          createdAt: new Date('2022-04-30 19:58:14.654'),
          title: 'Test 3 title',
          description: 'Test 3 description',
          content: 'Test 3 content',
          authorId: 1,
        },
      ]);

      addLinks(expectedResponse, [
        createLink('self', apiPath(StoryPath), 'GET'),
        createLink('search', apiPath(StoryPath, 'search'), 'POST'),
      ]);
      for (const a of expectedResponse.data) {
        addLinks(a, [
          createLink('self', apiPath(StoryPath, a.id), 'GET'),
          createLink('author', apiPath(UserPath, a.authorId), 'GET'),
        ]);
      }

      return request(app.getHttpServer())
        .get('/stories')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(JSON.parse(JSON.stringify(expectedResponse)));
    });
  });

  describe('POST /stories/search', () => {
    test('Responds with JSON representation of stories envelope.', () => {
      const expectedResponse = new StoryCollectionEnvelope([
        {
          id: 3,
          createdAt: new Date('2022-04-30 19:58:14.654'),
          title: 'Test 3 title',
          description: 'Test 3 description',
          content: 'Test 3 content',
          authorId: 1,
        },
      ]);

      addLinks(expectedResponse, [createLink('self', apiPath(StoryPath, 'search'), 'POST')]);
      for (const a of expectedResponse.data) {
        addLinks(a, [
          createLink('self', apiPath(StoryPath, a.id), 'GET'),
          createLink('author', apiPath(UserPath, a.authorId), 'GET'),
        ]);
      }

      return request(app.getHttpServer())
        .post('/stories/search')
        .send({ searchString: 'Test 3' })
        .set('Accept', 'application/json')
        .expect(200)
        .expect(JSON.parse(JSON.stringify(expectedResponse)));
    });
  });

  describe('GET /stories/:id', () => {
    test('Responds with JSON representation of story envelope without update and delete links.', () => {
      const expectedResponse: StoryEnvelope = {
        id: 3,
        createdAt: new Date('2022-04-30 19:58:14.654'),
        title: 'Test 3 title',
        description: 'Test 3 description',
        content: 'Test 3 content',
        authorId: 1,
        _links: [],
      };

      addLinks(expectedResponse, [
        createLink('self', apiPath(StoryPath, 3), 'GET'),
        createLink('parent', apiPath(StoryPath), 'GET'),
        createLink('author', apiPath(UserPath, 1), 'GET'),
      ]);

      return request(app.getHttpServer())
        .get('/stories/3')
        .set('Accept', 'application/json')
        .expect(200)
        .expect(JSON.parse(JSON.stringify(expectedResponse)));
    });

    test('Responds with JSON representation of story envelope with update and delete links.', () => {
      const expectedResponse: StoryEnvelope = {
        id: 3,
        createdAt: new Date('2022-04-30 19:58:14.654'),
        title: 'Test 3 title',
        description: 'Test 3 description',
        content: 'Test 3 content',
        authorId: 1,
        _links: [],
      };

      addLinks(expectedResponse, [
        createLink('self', apiPath(StoryPath, 3), 'GET'),
        createLink('parent', apiPath(StoryPath), 'GET'),
        createLink('author', apiPath(UserPath, 1), 'GET'),
        createLink('update', apiPath(StoryPath, 3), 'PATCH'),
        createLink('delete', apiPath(StoryPath, 3), 'DELETE'),
      ]);

      return request(app.getHttpServer())
        .get('/stories/3')
        .set('Accept', 'application/json')
        .set(
          'Authorization',
          // eslint-disable-next-line max-len
          'Bearer ' + user1Jwt,
        )
        .expect(200)
        .expect(JSON.parse(JSON.stringify(expectedResponse)));
    });

    test('Responds with 404 Not Found.', () => {
      return request(app.getHttpServer()).get('/stories/1000').set('Accept', 'application/json').expect(404).expect({
        statusCode: 404,
        message: 'Not Found',
      });
    });
  });

  describe('POST /stories', () => {
    // Prepare a DTO
    const createDto: CreateStoryDto = {
      title: 'Create test',
      content: 'Create test content',
      description: 'Create test description',
      authorId: 1,
    };

    test('Responds with the JSON representation of the created story.', () => {
      // Prepare the expected response
      const expectedResponse: StoryEnvelope = {
        id: storiesFixture.length + 1,
        createdAt: new Date('2022-04-30 19:58:14.654'),
        title: createDto.title,
        description: createDto.description,
        content: createDto.content,
        authorId: createDto.authorId,
        _links: [],
      };
      addLinks(expectedResponse, [
        createLink('self', apiPath(StoryPath, expectedResponse.id), 'GET'),
        createLink('author', apiPath(UserPath, expectedResponse.authorId), 'GET'),
        createLink('update', apiPath(StoryPath, expectedResponse.id), 'PATCH'),
        createLink('delete', apiPath(StoryPath, expectedResponse.id), 'DELETE'),
      ]);

      return request(app.getHttpServer())
        .post('/stories')
        .send(createDto)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + user1Jwt)
        .expect(201)
        .expect(JSON.parse(JSON.stringify(expectedResponse)));
    });

    test('Should respond with 403 Forbidden.', async () => {
      return request(app.getHttpServer())
        .post('/stories')
        .send(createDto)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + user4Jwt)
        .expect(403)
        .expect({ statusCode: 403, message: 'Forbidden' });
    });
  });

  describe('PATCH /stories/:id', () => {
    // Prepare a DTO
    const updateDto: UpdateStoryDto = {
      title: 'Update test',
      content: 'Update test content',
      description: 'Update test description',
    };

    test('Should respond with 403 Forbidden.', async () => {
      return request(app.getHttpServer())
        .patch('/stories/2')
        .send(updateDto)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + user4Jwt)
        .expect(403)
        .expect({ statusCode: 403, message: 'Forbidden' });
    });

    test('Should respond with 404 Not Found.', async () => {
      return request(app.getHttpServer())
        .patch('/stories/1000')
        .send(updateDto)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + user4Jwt)
        .expect(404)
        .expect({ statusCode: 404, message: 'Not Found' });
    });

    test('Responds with the JSON representation of the updated story.', async () => {
      // Prepare the expected envelope
      const expectedRes = {
        id: 1,
        createdAt: new Date('2022-04-30 19:58:14.654'),
        title: updateDto.title,
        description: updateDto.description,
        content: updateDto.content,
        authorId: storiesFixture.find((s) => s.id === 1).authorId
      } as StoryEnvelope;

      addLinks(expectedRes, [
        createLink('self', apiPath(StoryPath, expectedRes.id), 'GET'),
        createLink('author', apiPath(UserPath, expectedRes.authorId), 'GET'),
        createLink('update', apiPath(StoryPath, expectedRes.id), 'PATCH'),
        createLink('delete', apiPath(StoryPath, expectedRes.id), 'DELETE'),
      ]);

      return request(app.getHttpServer())
        .patch('/stories/1')
        .send(updateDto)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + user4Jwt)
        .expect(200)
        .expect(JSON.parse(JSON.stringify(expectedRes)));
    });
  });

  describe('DELETE /stories/:id', () => {
    test('Should respond with 403 Forbidden.', async () => {
      return request(app.getHttpServer())
        .delete('/stories/2')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + user4Jwt)
        .expect(403)
        .expect({ statusCode: 403, message: 'Forbidden' });
    });

    test('Should respond with 404 Not Found.', async () => {
      return request(app.getHttpServer())
        .delete('/stories/1000')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + user4Jwt)
        .expect(404)
        .expect({ statusCode: 404, message: 'Not Found' });
    });

    test('Should respond with 204 No Content and the empty body.', async () => {
      return request(app.getHttpServer())
        .delete('/stories/1')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + user4Jwt)
        .expect(204)
        .expect('');
    });
  });
});
