import { Test, TestingModule } from '@nestjs/testing';
import { StoryController, StoryPath } from './story.controller';
import { StoryService } from './story.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { StoryEntity } from './entities';
import { StoryCollectionEnvelope } from './envelopes';
import { addLinks, createLink } from '../common/hateoas';
import { apiPath } from '../common/helpers';
import { UserPath } from '../user/user.controller';
import { UserEntity } from '../user/entities';
import { ForbiddenException } from '@nestjs/common';

const moduleMocker = new ModuleMocker(global);

describe('StoryController', () => {
  let storyController: StoryController;

  const stories: StoryEntity[] = [
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

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [StoryController],
    })
      .useMocker((token) => {
        if (token === StoryService) {
          return {
            findMany: jest.fn().mockResolvedValue(stories),
            findOneById: jest.fn().mockResolvedValue(stories.find(s => s.id === 1))
          };
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

  it('should be defined', async () => {
    expect(storyController).toBeDefined();
  });

  describe('findNewest', () => {
    const envelope = new StoryCollectionEnvelope(stories);
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
    it('should return an array of stories', async () => {
      const newest = await storyController.findNewest();
      expect(newest).toStrictEqual(envelope);
      for (const [key, value] of Object.entries(newest.data)) {
        expect(value).toStrictEqual(envelope.data[key]);
      }
    });
  });

  describe('delete', () => {
    const user = {
      id: 1,
      createdAt: new Date('2022-04-30 19:58:14.654'),
      email: 'test@test.com',
      givenName: 'Test',
      familyName: 'Test',
      profileDescription: 'Testing description'
    } as UserEntity;

    test('should delete a story', async () => {
      await expect(storyController.delete(1, user)).rejects.toEqual(new ForbiddenException());
    });
  });
});
