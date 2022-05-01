import { Test, TestingModule } from '@nestjs/testing';
import { StoryController, StoryPath } from './story.controller';
import { StoryService } from './story.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { StoryEntity } from './entities';
import { StoryCollectionEnvelope, StoryEnvelope } from './envelopes';
import { addLinks, createLink } from '../common/hateoas';
import { apiPath } from '../common/helpers';
import { UserPath } from '../user/user.controller';
import { UserEntity } from '../user/entities';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

const moduleMocker = new ModuleMocker(global);

describe('StoryController', () => {
  let storyController: StoryController;

  // Stories fixture
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
      authorId: 8,
    },
  ];

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
      email: 'test@test4.com',
      givenName: 'Test 4',
      familyName: 'Test 4',
      profileDescription: 'Testing description 4',
    } as UserEntity,
    {
      id: 7,
      createdAt: new Date('2022-04-30 19:58:14.654'),
      email: 'test@test7.com',
      givenName: 'Test 7',
      familyName: 'Test 7',
      profileDescription: 'Testing description 7',
    } as UserEntity,
  ];

  const storyService = {
    findMany: jest.fn().mockResolvedValue(storiesFixture),
    search: jest.fn().mockResolvedValue(storiesFixture),
    findOneById: jest
      .fn(async (id: number) => {
        const story = storiesFixture.find((s) => s.id === id);
        if (story) {
          return story;
        }
        throw new NotFoundException();
      }),
    delete: jest
      .fn(async (id: number) => {
        const story = storiesFixture.find((s) => s.id === id);
        if (story) {
          return story;
        }
        throw new NotFoundException();
      })
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [StoryController],
    })
      .useMocker((token) => {
        if (token === StoryService) {
          return storyService;
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    storyController = moduleRef.get(StoryController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Testing the test setup', () => {
    test('StoryController should be defined.', async () => {
      expect(storyController).toBeDefined();
    });
    test('Stories array should be defined.', async () => {
      expect(storiesFixture).toBeDefined();
    });
  });

  describe('Testing the findNewest() method.', () => {
    test('Should return stories envelope.', async () => {
      // Prepare the expected envelope.
      const envelope = new StoryCollectionEnvelope([
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
          authorId: 8,
        },
      ]);
      addLinks(envelope, [
        createLink('self', apiPath(StoryPath), 'GET'),
        createLink('search', apiPath(StoryPath, 'search'), 'POST'),
      ]);
      for (const a of envelope.data) {
        addLinks(a, [
          createLink('self', apiPath(StoryPath, a.id), 'GET'),
          createLink('author', apiPath(UserPath, a.authorId), 'GET'),
        ]);
      }

      // Call the tested method
      const newest = await storyController.findNewest();

      // Compare the actual and the expected result
      expect(newest).toStrictEqual(envelope);
      for (const [key, value] of Object.entries(newest.data)) {
        expect(value).toStrictEqual(envelope.data[key]);
      }

      // Check is the findMany method was called exactly once
      expect(storyService.findMany.mock.calls.length).toBe(1);

      // Check the usage of the limit argument
      expect(storyService.findMany.mock.calls[0][0]).toBe(undefined);
    });

    test('Should use the limit.', async () => {
      // Call the tested method
      await storyController.findNewest(2);

      // Check the usage of the limit argument
      expect(storyService.findMany.mock.calls[0][0]).toBe(2);
    });
  });

  describe('Testing the search() method.', () => {
    test('Should return stories envelope.', async () => {
      const envelope = new StoryCollectionEnvelope([
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
          authorId: 8,
        },
      ]);
      addLinks(envelope, [createLink('self', apiPath(StoryPath, 'search'), 'POST')]);
      for (const a of envelope.data) {
        addLinks(a, [
          createLink('self', apiPath(StoryPath, a.id), 'GET'),
          createLink('author', apiPath(UserPath, a.authorId), 'GET'),
        ]);
      }
      const searchArg = { searchString: 'testing' };
      const searchRes = await storyController.search(searchArg);
      expect(searchRes).toStrictEqual(envelope);
      for (const [key, value] of Object.entries(searchRes.data)) {
        expect(value).toStrictEqual(envelope.data[key]);
      }
      expect(storyService.search.mock.calls.length).toBe(1);
      expect(storyService.search.mock.calls[0][0]).toBe(searchArg);
    });
  });

  describe('Testing the findOne() method.', () => {
    const user4Fixture = usersFixture.find((u) => u.id === 4);

    test('Should return story envelope without update and delete links.', async () => {
      const envelope = {
        id: 1,
        createdAt: new Date('2022-04-30 19:58:14.654'),
        title: 'Test 1 title',
        description: 'Test 1 description',
        content: 'Test 1 content',
        authorId: 4,
      } as StoryEnvelope;
      addLinks(envelope, [
        createLink('self', apiPath(StoryPath, 1), 'GET'),
        createLink('parent', apiPath(StoryPath), 'GET'),
        createLink('author', apiPath(UserPath, 4), 'GET'),
      ]);

      const res = await storyController.findOne(1, user4Fixture);
      console.log(res);

      await expect(res).toStrictEqual(envelope);
    });
  });

  describe('Testing the delete() method.', () => {
    const user1Fixture = usersFixture.find((u) => u.id === 1);
    const user7Fixture = usersFixture.find((u) => u.id === 7);
    test('Should throw ForbiddenException.', async () => {
      await expect(storyController.delete(2, user1Fixture)).rejects.toEqual(new ForbiddenException());
      expect(storyService.findOneById.mock.calls[0][0]).toBe(2);
      expect(storyService.findOneById.mock.calls.length).toBe(1);
    });

    test('Should throw NotFoundException.', async () => {
      await expect(storyController.delete(100, user1Fixture)).rejects.toEqual(new NotFoundException());
      expect(storyService.findOneById.mock.calls[0][0]).toBe(100);
      expect(storyService.findOneById.mock.calls.length).toBe(1);
    });

    test('Should return the deleted story entity.', async () => {
      const res = await storyController.delete(2, user7Fixture);
      expect(res).toBe(storiesFixture.find((s) => s.id === 2));
      expect(storyService.findOneById.mock.calls[0][0]).toBe(2);
      expect(storyService.findOneById.mock.calls.length).toBe(1);
    });
  });
});
