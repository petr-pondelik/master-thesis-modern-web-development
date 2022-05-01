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
import { CreateStoryDto, UpdateStoryDto } from './dto';

const moduleMocker = new ModuleMocker(global);

describe('StoryController', () => {
  let storyController: StoryController;

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
      authorId: 8,
    },
  ];

  // Prepare uses fixture
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

  // Mock the StoryService
  const storyService = {
    findMany: jest.fn().mockResolvedValue(storiesFixture),
    search: jest.fn().mockResolvedValue(storiesFixture),
    findOneById: jest.fn(async (id: number) => {
      const story = storiesFixture.find((s) => s.id === id);
      if (story) {
        return story;
      }
      throw new NotFoundException();
    }),
    create: jest.fn(async (dto: CreateStoryDto) => {
      return {
        id: storiesFixture.length + 1,
        createdAt: new Date('2022-04-30 19:58:14.654'),
        content: dto.content,
        title: dto.title,
        description: dto.description,
        authorId: dto.authorId,
      } as StoryEntity;
    }),
    update: jest.fn(async (_id: number, dto: UpdateStoryDto) => {
      const story = storiesFixture.find((s) => s.id === _id);
      if (story) {
        return {...story, ...dto};
      }
      throw new NotFoundException();
    }),
    delete: jest.fn(async (id: number) => {
      const story = storiesFixture.find((s) => s.id === id);
      if (story) {
        return story;
      }
      throw new NotFoundException();
    }),
  };

  // Create a testing module before running each test
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

  // Clear all mocks status after each test
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
      // Prepare the expected envelope
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

      // Test that the service's findMany method was called exactly once
      expect(storyService.findMany.mock.calls.length).toBe(1);

      // Test the usage of the limit argument
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
      // Prepare the expected envelope
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

      // Call the tested method with the defined argument
      const searchArg = { searchString: 'testing' };
      const searchRes = await storyController.search(searchArg);

      // Test the result
      expect(searchRes).toStrictEqual(envelope);
      for (const [key, value] of Object.entries(searchRes.data)) {
        expect(value).toStrictEqual(envelope.data[key]);
      }

      // Test that the service's search method was called exactly once
      expect(storyService.search.mock.calls.length).toBe(1);

      // Test the usage of the search argument
      expect(storyService.search.mock.calls[0][0]).toBe(searchArg);
    });
  });

  describe('Testing the findOne() method.', () => {
    // Fetch the user fixtures
    const user4Fixture = usersFixture.find((u) => u.id === 4);
    const user7Fixture = usersFixture.find((u) => u.id === 7);

    test('Should return story envelope without update and delete links.', async () => {
      // Prepare the expected envelope
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

      // Call the tested method
      const findRes = await storyController.findOne(1, { sub: user7Fixture.id, email: user7Fixture.email });

      // Test the result
      expect(findRes).toStrictEqual(envelope);
      expect(findRes._links.length).toBe(3);
      for (const [key, value] of Object.entries(findRes._links)) {
        expect(value).toStrictEqual(envelope._links[key]);
      }

      // Test that the service's findOneById method was called exactly once
      expect(storyService.findOneById.mock.calls.length).toBe(1);

      // Test that the services' findOneById method was called with the right argument value
      expect(storyService.findOneById.mock.calls[0][0]).toBe(1);
    });

    test('Should return story envelope with update and delete links.', async () => {
      // Prepare the expected envelope
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
        createLink('update', apiPath(StoryPath, 1), 'PATCH'),
        createLink('delete', apiPath(StoryPath, 1), 'DELETE'),
      ]);

      // Call the tested method
      const findRes = await storyController.findOne(1, { sub: user4Fixture.id, email: user4Fixture.email });

      // Test the result
      expect(findRes).toStrictEqual(envelope);
      expect(findRes._links.length).toBe(5);
      for (const [key, value] of Object.entries(findRes._links)) {
        expect(value).toStrictEqual(envelope._links[key]);
      }

      // Test that the service's findOneById method was called exactly once
      expect(storyService.findOneById.mock.calls.length).toBe(1);

      // Test that the services' findOneById method was called with the right argument value
      expect(storyService.findOneById.mock.calls[0][0]).toBe(1);
    });

    test('Should throw NotfoundException.', async () => {
      // Test the thrown exception
      await expect(
        storyController.findOne(100, {
          sub: user4Fixture.id,
          email: user4Fixture.email,
        }),
      ).rejects.toEqual(new NotFoundException());

      // Test that the service's findOneById method was called exactly once
      expect(storyService.findOneById.mock.calls.length).toBe(1);

      // Test that the service's findOneById method was called with the right argument value
      expect(storyService.findOneById.mock.calls[0][0]).toBe(100);
    });
  });

  describe('Testing the create() method.', () => {
    test('Should return the created story envelope.', async () => {
      // Prepare a DTO
      const dto: CreateStoryDto = {
        title: 'Create test',
        content: 'Create test content',
        description: 'Create test description',
        authorId: 1,
      };

      // Prepare the expected envelope
      const envelope = {
        id: storiesFixture.length + 1,
        createdAt: new Date('2022-04-30 19:58:14.654'),
        title: dto.title,
        description: dto.description,
        content: dto.content,
        authorId: dto.authorId,
      } as StoryEnvelope;
      addLinks(envelope, [
        createLink('self', apiPath(StoryPath, envelope.id), 'GET'),
        createLink('author', apiPath(UserPath, envelope.authorId), 'GET'),
        createLink('update', apiPath(StoryPath, envelope.id), 'PATCH'),
        createLink('delete', apiPath(StoryPath, envelope.id), 'DELETE'),
      ]);

      // Call the tested method
      const res = await storyController.create(dto);

      // Test the result
      expect(res).toStrictEqual(envelope);
      expect(res._links.length).toBe(4);
      for (const [key, value] of Object.entries(res._links)) {
        expect(value).toStrictEqual(envelope._links[key]);
      }

      // Test that the service's create method was called exactly once
      expect(storyService.create.mock.calls.length).toBe(1);

      // Test that the service's create method was called with the right argument value
      expect(storyService.create.mock.calls[0][0]).toBe(dto);
    });
  });

  describe('Testing the update() method.', () => {
    // Fetch the user fixtures
    const user4Fixture = usersFixture.find((u) => u.id === 4);

    // Prepare a DTO
    const updateDto: UpdateStoryDto = {
      title: 'Update test',
      content: 'Update test content',
      description: 'Update test description',
    };

    test('Should throw ForbiddenException.', async () => {
      // Test the thrown exception
      await expect(storyController.update(2, updateDto, user4Fixture)).rejects.toEqual(new ForbiddenException());

      // Test that the service's findOneById method was called exactly once
      expect(storyService.findOneById.mock.calls.length).toBe(1);

      // Test that the service's findOneById method was called with the right argument value
      expect(storyService.findOneById.mock.calls[0][0]).toBe(2);

      // Test that the service's update has not been called
      expect(storyService.update.mock.calls.length).toBe(0);
    });

    test('Should throw NotFoundException.', async () => {
      // Test the thrown exception
      await expect(storyController.update(100, updateDto, user4Fixture)).rejects.toEqual(new NotFoundException());

      // Test that the service's findOneById method was called exactly once
      expect(storyService.findOneById.mock.calls.length).toBe(1);

      // Test that the service's findOneById method was called with the right argument value
      expect(storyService.findOneById.mock.calls[0][0]).toBe(100);

      // Test that the service's update has not been called
      expect(storyService.update.mock.calls.length).toBe(0);
    });

    test('Should return the updated story envelope.', async () => {
      // Prepare the expected envelope
      const envelope = {
        id: 1,
        createdAt: new Date('2022-04-30 19:58:14.654'),
        title: updateDto.title,
        description: updateDto.description,
        content: updateDto.content,
        authorId: storiesFixture.find((s) => s.id === 1).authorId
      } as StoryEnvelope;
      addLinks(envelope, [
        createLink('self', apiPath(StoryPath, envelope.id), 'GET'),
        createLink('author', apiPath(UserPath, envelope.authorId), 'GET'),
        createLink('update', apiPath(StoryPath, envelope.id), 'PATCH'),
        createLink('delete', apiPath(StoryPath, envelope.id), 'DELETE'),
      ]);

      // Call the tested method
      const res = await storyController.update(1, updateDto, user4Fixture);

      // Test the result
      expect(res).toStrictEqual(envelope);

      // Test that the service's findOneById method was called exactly once
      expect(storyService.findOneById.mock.calls.length).toBe(1);

      // Test that the service's findOneById method was called with the right argument value
      expect(storyService.findOneById.mock.calls[0][0]).toBe(1);

      // Test that the service's update method was called exactly once
      expect(storyService.update.mock.calls.length).toBe(1);

      // Test that the service's update method was called with the right argument values
      expect(storyService.update.mock.calls[0][0]).toBe(1);
      expect(storyService.update.mock.calls[0][1]).toBe(updateDto);
    });
  });

  describe('Testing the delete() method.', () => {
    // Fetch the user fixtures
    const user1Fixture = usersFixture.find((u) => u.id === 1);
    const user7Fixture = usersFixture.find((u) => u.id === 7);

    test('Should throw ForbiddenException.', async () => {
      // Test the thrown exception
      await expect(storyController.delete(2, user1Fixture)).rejects.toEqual(new ForbiddenException());

      // Test that the service's findOneById method was called exactly once
      expect(storyService.findOneById.mock.calls.length).toBe(1);

      // Test that the service's findOneById method was called with the right argument value
      expect(storyService.findOneById.mock.calls[0][0]).toBe(2);

      // Test that the service's delete has not been called
      expect(storyService.delete.mock.calls.length).toBe(0);
    });

    test('Should throw NotFoundException.', async () => {
      // Test the thrown exception
      await expect(storyController.delete(100, user1Fixture)).rejects.toEqual(new NotFoundException());

      // Test that the service's findOneById method was called exactly once
      expect(storyService.findOneById.mock.calls.length).toBe(1);

      // Test that the service's findOneById method was called with the right argument value
      expect(storyService.findOneById.mock.calls[0][0]).toBe(100);

      // Test that the service's delete has not been called
      expect(storyService.delete.mock.calls.length).toBe(0);
    });

    test('Should return the deleted story entity.', async () => {
      // Call the tested method
      const res = await storyController.delete(2, user7Fixture);

      // Test the result
      expect(res).toBe(storiesFixture.find((s) => s.id === 2));

      // Test that the service's findOneById method was called exactly once
      expect(storyService.findOneById.mock.calls.length).toBe(1);

      // Test that the service's findOneById method was called with the right argument value
      expect(storyService.findOneById.mock.calls[0][0]).toBe(2);

      // Test that the service's delete method was called exactly once
      expect(storyService.delete.mock.calls.length).toBe(1);

      // Test that the service's delete method was called with the right argument value
      expect(storyService.findOneById.mock.calls[0][0]).toBe(2);
    });
  });
});
