import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { StoryEntity } from '../src/story/entities';
import { UserEntity } from '../src/user/entities';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '../src/app.module';

describe('StoryController (e2e)', () => {
  let app: INestApplication;

  const gql = '/graphql';

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
          return { ...story, ...args.data };
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
        const id = args.where.id;
        const email = args.where.email;
        const res = usersFixture.find((u) => u.id === id || u.email === email);
        return res ?? null;
      }),
    },
    storiesOnReadingLists: {
      deleteMany: jest.fn(async (args: any) => {
        return;
      }),
    },
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

  describe('QUERY Story', () => {
    test('Should get a single story by id.', () => {
      const _query = {
        query: `query Story($id: Int!) {
          story(id: $id) {
            id
            createdAt
            title
            description
            content
            author {
              id
              familyName
              givenName
            }
          }
        }`,
        variables: { id: 1 },
      };

      const expectedRes = {
        ...storiesFixture.find((s) => s.id === 1),
        ...{
          author: {
            id: usersFixture[1].id,
            familyName: usersFixture[1].familyName,
            givenName: usersFixture[1].givenName,
          },
        },
      };

      delete expectedRes.authorId;

      return request(app.getHttpServer())
        .post(gql)
        .send(_query)
        .expect(200)
        .expect((res) => {
          const actualRes = res.body.data.story;
          actualRes.createdAt = new Date('2022-04-30 19:58:14.654');
          expect(actualRes).toStrictEqual(expectedRes);
        });
    });
  });
});
