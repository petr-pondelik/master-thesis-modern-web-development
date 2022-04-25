import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { SignUpDto } from './dto';
import { UserService } from './user.service';
import { addLinks, createLink } from '../common/hateoas';
import { apiPath } from '../common/helpers';
import { StoryPath } from '../story/story.controller';
import { ReadingListService } from '../reading-list/reading-list.service';
import { StoryService } from '../story/story.service';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LocationResponseHeaderInterceptor } from '../common/interceptor';
import { UserEnvelope } from './envelopes';
import { StoryCollectionEnvelope, StoryEnvelope } from '../story/envelopes';
import { ReadingListCollectionEnvelope, ReadingListEnvelope } from '../reading-list/envelopes';
import { ErrorMessage } from '../common/message';
import { Jwt, Limit } from '../common/decorator';
import { ReadingListPath } from '../reading-list/reading-list.controller';

export const UserPath = 'users';
export const UserVersion = '1';

@ApiTags('Users')
@Controller({
  path: UserPath,
  version: UserVersion,
})
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly readingListService: ReadingListService,
    private readonly storyService: StoryService,
  ) {
  }

  @Post('sign-up')
  @HttpCode(201)
  @UseInterceptors(new LocationResponseHeaderInterceptor(apiPath(UserPath)))
  @ApiOperation({
    summary: 'Sign up a new user.',
  })
  @ApiCreatedResponse({ description: 'User has been successfully created.', type: UserEnvelope })
  @ApiConflictResponse({ description: 'Credentials already taken.', type: ErrorMessage })
  async signUp(@Body() dto: SignUpDto): Promise<UserEnvelope> {
    const user = await this.userService.signUp(dto);
    let envelope = new UserEnvelope();
    envelope = { ...envelope, ...user };
    addLinks(envelope, [
      createLink('self', apiPath(UserPath, user.id), 'GET'),
      createLink('stories', apiPath(UserPath, `${user.id}/stories`), 'GET'),
      createLink('reading-lists', apiPath(UserPath, `${user.id}/reading-lists`), 'GET'),
    ]);
    return envelope;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find user.',
  })
  @ApiOkResponse({ description: 'User successfully retrieved.', type: UserEnvelope })
  @ApiNotFoundResponse({ description: 'User not found.', type: ErrorMessage })
  async findOne(@Param('id', ParseIntPipe) _id: number): Promise<UserEnvelope> {
    const user = await this.userService.findOneById(_id);
    let envelope = new UserEnvelope();
    envelope = { ...envelope, ...user };
    addLinks(envelope, [
      createLink('self', apiPath(UserPath, user.id), 'GET'),
      createLink('stories', apiPath(UserPath, `${user.id}/stories`), 'GET'),
      createLink('reading-lists', apiPath(UserPath, `${user.id}/reading-lists`), 'GET'),
    ]);
    return envelope;
  }

  @Get(':id/stories')
  @ApiOperation({
    summary: 'Find user\'s stories.',
  })
  @ApiOkResponse({ description: 'Stories successfully retrieved.', type: StoryCollectionEnvelope })
  @ApiNotFoundResponse({ description: 'User not found.', type: ErrorMessage })
  async findStories(
    @Param('id', ParseIntPipe) _id: number,
    @Jwt() jwt,
    @Limit() limit: number | undefined,
  ): Promise<StoryCollectionEnvelope> {
    const stories = await this.storyService.findManyByAuthor(_id, limit);
    const envelope = new StoryCollectionEnvelope(stories);
    const links = [createLink('self', apiPath(UserPath, `${_id}/stories`), 'GET')];
    if (jwt && jwt.sub === _id) {
      links.push(createLink('create', apiPath(StoryPath), 'POST'));
    }
    addLinks(envelope, links);
    for (const s of envelope.data) {
      const links = [
        createLink('self', apiPath(UserPath, `${_id}/stories/${s.id}`), 'GET'),
        createLink('author', apiPath(UserPath, s.authorId), 'GET'),
      ];
      addLinks(s, links);
    }
    return envelope;
  }

  @Get(':userId/stories/:storyId')
  @ApiOperation({
    summary: 'Find story under user.',
  })
  @ApiOkResponse({
    description: 'Story successfully retrieved.',
    type: StoryEnvelope,
  })
  @ApiNotFoundResponse({
    description: 'User\'s story not found.',
    type: ErrorMessage,
  })
  async findStoryUnderUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('storyId', ParseIntPipe) storyId: number,
    @Jwt() jwt,
  ): Promise<StoryEnvelope> {
    const story = await this.storyService.findOneByAuthor(storyId, userId);
    let envelope = new StoryEnvelope();
    envelope = { ...envelope, ...story };
    const links = [
      createLink('self', apiPath(UserPath, `${storyId}/stories/${story.id}`), 'GET'),
      createLink('parent', apiPath(UserPath, `${storyId}/stories`), 'GET'),
      createLink('author', apiPath(UserPath, story.authorId), 'GET'),
    ];
    if (jwt && jwt.sub === story.authorId) {
      links.push(createLink('update', apiPath(StoryPath, story.id), 'PATCH'));
      links.push(createLink('delete', apiPath(StoryPath, story.id), 'DELETE'));
    }
    addLinks(envelope, links);
    return envelope;
  }

  @Get(':id/reading-lists')
  @ApiOperation({
    summary: 'Find user\'s reading lists.',
  })
  @ApiOkResponse({ description: 'Reading lists successfully retrieved.', type: ReadingListCollectionEnvelope })
  @ApiNotFoundResponse({ description: 'Resource not found.', type: ErrorMessage })
  async findUsersReadingLists(
    @Param('id', ParseIntPipe) _id: number,
    @Limit() limit: number | undefined,
    @Jwt() jwt
  ): Promise<ReadingListCollectionEnvelope> {
    const readingLists = await this.readingListService.findManyByAuthor(_id, limit);
    const envelope = new ReadingListCollectionEnvelope(readingLists);
    const links = [
      createLink('self', apiPath(UserPath, `${_id}/reading-lists`), 'GET'),
    ];
    if (jwt && jwt.sub === _id) {
      links.push(createLink('create', apiPath(ReadingListPath), 'POST'));
    }
    addLinks(envelope, links);
    for (const rl of envelope.data) {
      addLinks(rl, [
        createLink('self', apiPath(UserPath, `${_id}/reading-lists/${rl.id}`), 'GET'),
        createLink('stories', apiPath(ReadingListPath, `${rl.id}/stories`), 'GET'),
        createLink('addStory', apiPath(ReadingListPath, `${rl.id}/stories/:storyId`), 'PUT'),
        createLink('removeStory', apiPath(ReadingListPath, `${rl.id}/stories/:storyId`), 'DELETE'),
      ]);
    }
    return envelope;
  }

  @Get(':userId/reading-lists/:readingListId')
  @ApiOperation({
    summary: "Find user's reading list.",
  })
  @ApiOkResponse({ description: 'Reading list successfully retrieved.', type: ReadingListEnvelope })
  @ApiNotFoundResponse({ description: 'Resource not found.', type: ErrorMessage })
  async findReadingList(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('readingListId', ParseIntPipe) readingListId: number,
    @Jwt() jwt
  ): Promise<ReadingListEnvelope> {
    const readingList = await this.readingListService.findOneByAuthor(readingListId, userId);
    let envelope = new ReadingListEnvelope();
    envelope = { ...envelope, ...readingList };
    const links = [
        createLink('self', apiPath(UserPath, `${userId}/reading-lists/${readingListId}`), 'GET'),
        createLink('parent', apiPath(UserPath, `${userId}/reading-lists`), 'GET'),
        createLink('author', apiPath(UserPath, userId), 'GET'),
        createLink('stories', apiPath(ReadingListPath, `${readingListId}/stories`), 'GET'),
    ]
    if (jwt && jwt.sub === userId) {
      links.push(
        createLink('update', apiPath(ReadingListPath, readingListId), 'PATCH'),
        createLink('delete', apiPath(ReadingListPath, readingListId), 'DELETE')
      );
    }
    addLinks(envelope, links);
    return envelope;
  }
}
