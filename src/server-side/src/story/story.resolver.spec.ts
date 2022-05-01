import { Test, TestingModule } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { StoryResolver } from './story.resolver';
import { StoryEntity } from './entities';
import { UserEntity } from '../user/entities';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { CreateStoryDto, UpdateStoryDto } from './dto';
import { StoryService } from './story.service';
import { UserService } from '../user/user.service';

const moduleMocker = new ModuleMocker(global);

describe('StoryResolver', () => {
  let storyResolver: StoryResolver;

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
        return { ...story, ...dto };
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

  // Mock the UserService
  const userService = {
    findOneById: jest.fn(async (id: number) => {
      const story = usersFixture.find((s) => s.id === id);
      if (story) {
        return story;
      }
      throw new NotFoundException();
    }),
  };

  // Create a testing module before running each test
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [StoryResolver],
    })
      .useMocker((token) => {
        if (token === StoryService) {
          return storyService;
        }
        if (token === UserService) {
          return userService;
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    storyResolver = moduleRef.get(StoryResolver);
  });

  // Clear all mocks status after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Verify the test setup.', () => {
    test('StoryResolver should be defined.', async () => {
      expect(storyResolver).toBeDefined();
    });
    test('Stories array should be defined.', async () => {
      expect(storiesFixture).toBeDefined();
    });
  });

  describe('Testing the searchStories() method.', () => {
    test('Should return story entity array.', async () => {
      // Call the tested method with the defined argument and test the result
      const searchStr = 'testing';
      expect(await storyResolver.searchStories(searchStr)).toStrictEqual(storiesFixture);

      // Test that the service's search method was called exactly once
      expect(storyService.search.mock.calls.length).toBe(1);

      // Test the usage of the search argument
      expect(storyService.search.mock.calls[0][0]).toStrictEqual({ searchString: searchStr });
    });
  });

  describe('Testing the getStory() method.', () => {
    test('Should return story entity.', async () => {
      // Test the method's result
      expect(await storyResolver.getStory(1)).toBe(storiesFixture.find((s) => s.id === 1));

      // Test that the service's findOneById method was called exactly once
      expect(storyService.findOneById.mock.calls.length).toBe(1);

      // Test that the services' findOneById method was called with the right argument value
      expect(storyService.findOneById.mock.calls[0][0]).toBe(1);
    });

    test('Should throw NotfoundException.', async () => {
      // Test the exception
      await expect(storyResolver.getStory(100)).rejects.toEqual(new NotFoundException());

      // Test that the service's findOneById method was called exactly once
      expect(storyService.findOneById.mock.calls.length).toBe(1);

      // Test that the service' findOneById method was called with the right argument value
      expect(storyService.findOneById.mock.calls[0][0]).toBe(100);
    });
  });

  describe('Testing the getAuthor() method.', () => {
    test('Should return user entity.', async () => {
      // Test the method's result
      expect(await storyResolver.getAuthor(storiesFixture[0])).toBe(usersFixture.find((s) => s.id === 4));

      // Test that the userService's findOneById method was called exactly once
      expect(userService.findOneById.mock.calls.length).toBe(1);

      // Test that the userService' findOneById method was called with the right argument value
      expect(userService.findOneById.mock.calls[0][0]).toBe(4);
    });
  });

  describe('Testing the doCreateStory() method.', () => {
    // Fetch the user fixtures
    const user4Fixture = usersFixture.find((u) => u.id === 4);
    const user7Fixture = usersFixture.find((u) => u.id === 7);

    // Prepare a DTO
    const createDto: CreateStoryDto = {
      title: 'Create test',
      content: 'Create test content',
      description: 'Create test description',
      authorId: 4,
    };

    test('Should return the created story entity.', async () => {
      // Prepare the expected result
      const expectedRes: StoryEntity = {
        id: storiesFixture.length + 1,
        createdAt: new Date('2022-04-30 19:58:14.654'),
        content: createDto.content,
        title: createDto.title,
        description: createDto.description,
        authorId: createDto.authorId,
      };

      // Test the method's result
      expect(await storyResolver.doCreateStory(createDto, user4Fixture)).toStrictEqual(expectedRes);

      // Test that the service's create method was called exactly once
      expect(storyService.create.mock.calls.length).toBe(1);

      // Test that the service's create method was called with the right argument value
      expect(storyService.create.mock.calls[0][0]).toBe(createDto);
    });

    test('Should throw ForbiddenException.', async () => {
      // Test the exception
      await expect(storyResolver.doCreateStory(createDto, user7Fixture)).rejects.toEqual(new ForbiddenException());

      // Test that the service's create method has not been called
      expect(storyService.create.mock.calls.length).toBe(0);
    });
  });

  describe('Testing the doUpdateStory() method.', () => {
    // Fetch the user fixtures
    const user4Fixture = usersFixture.find((u) => u.id === 4);

    // Prepare a DTO
    const updateDto: UpdateStoryDto = {
      title: 'Update test',
      content: 'Update test content',
      description: 'Update test description',
    };

    test('Should throw ForbiddenException.', async () => {
      // Test the exception
      await expect(storyResolver.doUpdateStory(2, updateDto, user4Fixture)).rejects.toEqual(new ForbiddenException());

      // Test that the service's findOneById method was called exactly once
      expect(storyService.findOneById.mock.calls.length).toBe(1);

      // Test that the service's findOneById method was called with the right argument value
      expect(storyService.findOneById.mock.calls[0][0]).toBe(2);

      // Test that the service's update has not been called
      expect(storyService.update.mock.calls.length).toBe(0);
    });

    test('Should throw NotFoundException.', async () => {
      // Test the exception
      await expect(storyResolver.doUpdateStory(100, updateDto, user4Fixture)).rejects.toEqual(new NotFoundException());

      // Test that the service's findOneById method was called exactly once
      expect(storyService.findOneById.mock.calls.length).toBe(1);

      // Test that the service's findOneById method was called with the right argument value
      expect(storyService.findOneById.mock.calls[0][0]).toBe(100);

      // Test that the service's update has not been called
      expect(storyService.update.mock.calls.length).toBe(0);
    });

    test('Should return the updated story entity.', async () => {
      // Prepare the expected result
      const expectedRes: StoryEntity = {
        id: 1,
        createdAt: new Date('2022-04-30 19:58:14.654'),
        title: updateDto.title,
        description: updateDto.description,
        content: updateDto.content,
        authorId: storiesFixture.find((s) => s.id === 1).authorId,
      };

      // Test the method's result
      expect(await storyResolver.doUpdateStory(1, updateDto, user4Fixture)).toStrictEqual(expectedRes);

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

  describe('Testing the doDeleteStory() method.', () => {
    // Fetch the user fixtures
    const user1Fixture = usersFixture.find((u) => u.id === 1);
    const user7Fixture = usersFixture.find((u) => u.id === 7);

    test('Should throw ForbiddenException.', async () => {
      // Test the exception
      await expect(storyResolver.doDeleteStory(2, user1Fixture)).rejects.toEqual(new ForbiddenException());

      // Test that the service's findOneById method was called exactly once
      expect(storyService.findOneById.mock.calls.length).toBe(1);

      // Test that the service's findOneById method was called with the right argument value
      expect(storyService.findOneById.mock.calls[0][0]).toBe(2);

      // Test that the service's delete has not been called
      expect(storyService.delete.mock.calls.length).toBe(0);
    });

    test('Should throw NotFoundException.', async () => {
      // Test the exception
      await expect(storyResolver.doDeleteStory(100, user1Fixture)).rejects.toEqual(new NotFoundException());

      // Test that the service's findOneById method was called exactly once
      expect(storyService.findOneById.mock.calls.length).toBe(1);

      // Test that the service's findOneById method was called with the right argument value
      expect(storyService.findOneById.mock.calls[0][0]).toBe(100);

      // Test that the service's delete has not been called
      expect(storyService.delete.mock.calls.length).toBe(0);
    });

    test('Should return the deleted story entity.', async () => {
      // Call the tested method
      expect(await storyResolver.doDeleteStory(2, user7Fixture)).toBe(storiesFixture.find((s) => s.id === 2));

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
