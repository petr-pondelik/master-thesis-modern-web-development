import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Res,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SignUpDto } from './dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guard';
import { addLinks, createLink } from '../common/hateoas';
import { apiPath } from '../common/helper';
import { StoryPath } from '../story/story.controller';
import { User } from '../common/decorator';
import { ReadingListService } from '../reading-list/reading-list.service';
import { CreateReadingListDto } from '../reading-list/dto';
import { UpdateReadingListDto } from '../reading-list/dto/update-reading-list.dto';
import { StoryService } from '../story/story.service';
import { Response } from 'express';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
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
  ) {}

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
    const user = await this.userService.findUnique({ id: _id });
    let envelope = new UserEnvelope();
    envelope = { ...envelope, ...user };
    addLinks(envelope, [
      createLink('self', apiPath(UserPath, user.id), 'GET'),
      createLink('stories', apiPath(UserPath, `${user.id}/stories`), 'GET'),
      // createLink('reading-lists', apiPath(UserPath, `${user.id}/reading-lists`), 'GET'),
    ]);
    return envelope;
  }

  @Get(':id/stories')
  @ApiOperation({
    summary: "Find user's stories.",
  })
  @ApiOkResponse({ description: 'Stories successfully retrieved.', type: StoryCollectionEnvelope })
  @ApiNotFoundResponse({ description: 'User not found.', type: ErrorMessage })
  async findStories(@Param('id', ParseIntPipe) _id: number, @User() user): Promise<StoryCollectionEnvelope> {
    const stories = await this.userService.findStories({ id: _id });
    const envelope = new StoryCollectionEnvelope(stories);
    const links = [createLink('self', apiPath(UserPath, `${_id}/stories`), 'GET')];
    links.push(createLink('create', apiPath(UserPath, `${_id}/stories`), 'POST'));
    addLinks(envelope, links);
    for (const a of envelope.data) {
      addLinks(a, [
        createLink('detail', apiPath(StoryPath, a.id), 'GET'),
        createLink('author', apiPath(UserPath, a.authorId), 'GET'),
      ]);
    }
    return envelope;
  }

  @Get(':id/stories/:storyId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Find story under user.',
  })
  @ApiOkResponse({
    description: 'Story successfully retrieved.',
    type: StoryEnvelope,
  })
  @ApiNotFoundResponse({
    description: 'Story not found.',
    type: ErrorMessage,
  })
  async findStoryUnderUser(
    @Param('id', ParseIntPipe) id: number,
    @Param('storyId', ParseIntPipe) storyId: number,
    @User() user,
  ): Promise<StoryEnvelope> {
    if (id !== user.id) {
      throw new ForbiddenException();
    }
    const story = await this.userService.findStory(id, storyId);
    let envelope = new StoryEnvelope();
    envelope = { ...envelope, ...story };
    const links = [
      createLink('self', apiPath(UserPath, `${id}/stories/${story.id}`), 'GET'),
      createLink('author', apiPath(UserPath, story.authorId), 'GET'),
      createLink('update', apiPath(StoryPath, story.id), 'PATCH'),
      createLink('delete', apiPath(StoryPath, story.id), 'DELETE'),
    ];
    addLinks(envelope, links);
    return envelope;
  }

  // @UseGuards(JwtAuthGuard)
  // @Get(':id/subscriptions')
  // @ApiOperation({
  //   summary: "Find user's subscriptions.",
  // })
  // async findSubscriptions(@Param('id', ParseIntPipe) _id: number, @User() user) {
  //   const data = await this.userService.findSubscriptions({ id: _id });
  //   const envelope = new ResponseEnvelope<Array<Subscription>>(data.subscribing);
  //   addLinks(envelope, [createLink('self', apiPath(UserPath, `${_id}/subscriptions`), 'GET')]);
  //   for (const s of envelope.data) {
  //     const links =
  //       user.id === s.subscriberId
  //         ? [createLink('delete', apiPath(UserPath, `${_id}/subscriptions/${s.id}`), 'DELETE')]
  //         : [];
  //     addLinks(s, links);
  //   }
  //   return envelope;
  // }

  @UseGuards(JwtAuthGuard)
  @Get(':id/reading-lists')
  @ApiOperation({
    summary: "Find user's reading lists.",
  })
  @ApiOkResponse({ description: 'Reading lists successfully retrieved.', type: ReadingListCollectionEnvelope })
  @ApiNotFoundResponse({ description: 'Resource not found.', type: ErrorMessage })
  @ApiForbiddenResponse({ description: 'Access is forbidden.', type: ErrorMessage })
  async findAllReadingLists(
    @Param('id', ParseIntPipe) _id: number,
    @User() user,
  ): Promise<ReadingListCollectionEnvelope> {
    /** Owner-level access restriction */
    if (_id !== user.id) {
      throw new ForbiddenException();
    }
    const readingLists = await this.userService.findReadingLists({ id: _id });
    const envelope = new ReadingListCollectionEnvelope(readingLists);
    addLinks(envelope, [
      createLink('self', apiPath(UserPath, `${_id}/reading-lists`), 'GET'),
      createLink('create', apiPath(UserPath, `${_id}/reading-lists`), 'PUT'),
    ]);
    for (const rl of envelope.data) {
      addLinks(rl, [
        createLink('self', apiPath(UserPath, `${_id}/reading-lists/${rl.title}`), 'GET'),
        createLink('update', apiPath(UserPath, `${_id}/reading-lists/${rl.title}`), 'PATCH'),
        createLink('delete', apiPath(UserPath, `${_id}/reading-lists/${rl.title}`), 'DELETE'),
        createLink('addStory', apiPath(UserPath, `${_id}/reading-lists/${rl.title}/stories/:storyId`), 'PUT'),
        createLink('removeStory', apiPath(UserPath, `${_id}/reading-lists/${rl.title}/stories/:storyId`), 'DELETE'),
      ]);
    }
    return envelope;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/reading-lists/:title')
  @ApiOperation({
    summary: "Find user's reading list.",
  })
  @ApiOkResponse({ description: 'Reading list successfully retrieved.', type: ReadingListEnvelope })
  @ApiNotFoundResponse({ description: 'Resource not found.', type: ErrorMessage })
  @ApiForbiddenResponse({ description: 'Access is forbidden.', type: ErrorMessage })
  async findReadingList(
    @Param('id', ParseIntPipe) id: number,
    @Param('title') title: string,
    @User() user,
  ): Promise<ReadingListEnvelope> {
    /** Owner-level access restriction */
    if (id !== user.id) {
      throw new ForbiddenException();
    }
    const readingList = await this.readingListService.findUnique({
      title_authorId: {
        authorId: id,
        title: title,
      },
    });
    let envelope = new ReadingListEnvelope();
    envelope = { ...envelope, ...readingList };
    addLinks(envelope, [
      createLink('self', apiPath(UserPath, `${id}/reading-lists/${title}`), 'GET'),
      createLink('update', apiPath(UserPath, `${id}/reading-lists/${title}`), 'PATCH'),
      createLink('delete', apiPath(UserPath, `${id}/reading-lists/${title}`), 'DELETE'),
      createLink('addStory', apiPath(UserPath, `${id}/reading-lists/${title}/stories/:storyId`), 'PUT'),
      createLink('removeStory', apiPath(UserPath, `${id}/reading-lists/${title}/stories/:storyId`), 'DELETE'),
    ]);
    return envelope;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/reading-lists/:title/stories')
  @ApiOperation({
    summary: 'Find stories stored within the reading list .',
  })
  @ApiOkResponse({ description: 'Stories successfully retrieved.', type: StoryCollectionEnvelope })
  @ApiNotFoundResponse({ description: 'Resource not found.', type: ErrorMessage })
  @ApiForbiddenResponse({ description: 'Access is forbidden.', type: ErrorMessage })
  async findReadingListStories(
    @Param('id', ParseIntPipe) id: number,
    @Param('title') title: string,
    @User() user,
  ): Promise<StoryCollectionEnvelope> {
    /** Owner-level access restriction */
    if (id !== user.id) {
      throw new ForbiddenException();
    }
    const stories = await this.readingListService.findAllStories({ title_authorId: { authorId: id, title: title } });
    const envelope = new StoryCollectionEnvelope(stories);
    addLinks(envelope, [
      createLink('self', apiPath(UserPath, `${id}/reading-lists`), 'GET'),
      createLink('create', apiPath(UserPath, `${id}/reading-lists`), 'PUT'),
    ]);
    for (const a of envelope.data) {
      addLinks(a, [
        createLink('detail', apiPath(StoryPath, `${a.id}`), 'GET'),
        createLink('create', apiPath(UserPath, `${id}/reading-lists/${title}/${a.id}`), 'PUT'),
        createLink('delete', apiPath(UserPath, `${id}/reading-lists/${title}/${a.id}`), 'DELETE'),
      ]);
    }
    return envelope;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/reading-lists/:title')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Create a new reading list under a specific URL.',
  })
  @ApiOkResponse({ description: 'Reading list successfully created.', type: ReadingListEnvelope })
  @ApiNotFoundResponse({ description: 'Resource not found.', type: ErrorMessage })
  @ApiForbiddenResponse({ description: 'Access is forbidden.', type: ErrorMessage })
  async createReadingList(
    @Param('id', ParseIntPipe) id: number,
    @Param('title') title: string,
    @Body() dto: CreateReadingListDto,
    @User() user,
    @Res() res: Response,
  ) {
    /** Owner-level access restriction */
    if (id !== user.id) {
      throw new ForbiddenException();
    }
    const readingList = await this.readingListService.create(dto);
    const envelope = { ...new ReadingListEnvelope(), ...readingList };
    addLinks(envelope, [
      createLink('self', apiPath(UserPath, `${id}/reading-lists/${title}`), 'GET'),
      createLink('update', apiPath(UserPath, `${id}/reading-lists/${title}`), 'PATCH'),
      createLink('delete', apiPath(UserPath, `${id}/reading-lists/${title}`), 'DELETE'),
      createLink('addStory', apiPath(UserPath, `${id}/reading-lists/${title}/stories/:storyId`), 'PUT'),
      createLink('removeStory', apiPath(UserPath, `${id}/reading-lists/${title}/stories/:storyId`), 'DELETE'),
    ]);
    return res.setHeader('Location', apiPath(UserPath, `${id}/reading-lists/${title}`)).json(envelope);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/reading-lists/:title')
  @ApiOperation({
    summary: 'Partially update reading list.',
  })
  @ApiOkResponse({ description: 'Reading list successfully updated.', type: ReadingListEnvelope })
  @ApiNotFoundResponse({ description: 'Resource not found.', type: ErrorMessage })
  @ApiForbiddenResponse({ description: 'Access is forbidden.', type: ErrorMessage })
  async updateReadingList(
    @Param('id', ParseIntPipe) id: number,
    @Param('title') title: string,
    @Body() dto: UpdateReadingListDto,
    @User() user,
  ): Promise<ReadingListEnvelope> {
    /** Owner-level access restriction */
    if (id !== user.id) {
      throw new UnauthorizedException();
    }
    const readingList = await this.readingListService.update(id, title, dto);
    const envelope = { ...new ReadingListEnvelope(), ...readingList };
    addLinks(envelope, [
      createLink('self', apiPath(UserPath, `${id}/reading-lists/${title}`), 'GET'),
      createLink('update', apiPath(UserPath, `${id}/reading-lists/${title}`), 'PATCH'),
      createLink('delete', apiPath(UserPath, `${id}/reading-lists/${title}`), 'DELETE'),
      createLink('addStory', apiPath(UserPath, `${id}/reading-lists/${title}/stories/:storyId`), 'PUT'),
      createLink('removeStory', apiPath(UserPath, `${id}/reading-lists/${title}/stories/:storyId`), 'DELETE'),
    ]);
    return envelope;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/reading-lists/:title')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete reading list.',
  })
  @ApiOkResponse({ description: 'Reading list successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Resource not found.', type: ErrorMessage })
  @ApiForbiddenResponse({ description: 'Access is forbidden.', type: ErrorMessage })
  async deleteReadingList(@Param('id', ParseIntPipe) id: number, @Param('title') title: string, @User() user) {
    /** Owner-level access restriction */
    if (id !== user.id) {
      throw new UnauthorizedException();
    }
    await this.readingListService.delete(id, title);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/reading-lists/:title/stories/:storyId')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Add story into reading list.',
  })
  @ApiOkResponse({ description: 'Story successfully added into reading list.' })
  @ApiNotFoundResponse({ description: 'Resource not found.', type: ErrorMessage })
  @ApiForbiddenResponse({ description: 'Access is forbidden.', type: ErrorMessage })
  @ApiHeader({ name: 'Location', description: 'Location of the new resource.' })
  async addStoryIntoReadingList(
    @Param('id', ParseIntPipe) id: number,
    @Param('title') title: string,
    @Param('storyId', ParseIntPipe) storyId: number,
    @User() user,
    @Res() res: Response,
  ) {
    /** Owner-level access restriction */
    if (id !== user.id) {
      throw new UnauthorizedException();
    }
    await this.storyService.findUnique({ id: storyId });
    await this.readingListService.connectStory(id, title, storyId);
    return res.setHeader('Location', apiPath(UserPath, `${id}/reading-lists/${title}/${storyId}`)).json();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/reading-lists/:title/stories/:storyId')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Remove story from reading list.',
  })
  @ApiOkResponse({ description: 'Story successfully removed from reading list.' })
  @ApiNotFoundResponse({ description: 'Resource not found.', type: ErrorMessage })
  @ApiForbiddenResponse({ description: 'Access is forbidden.', type: ErrorMessage })
  async deleteStoryFromReadingList(
    @Param('id', ParseIntPipe) id: number,
    @Param('title') title: string,
    @Param('storyId', ParseIntPipe) storyId: number,
    @User() user,
  ) {
    /** Owner-level access restriction */
    if (id !== user.id) {
      throw new UnauthorizedException();
    }
    await this.storyService.findUnique({ id: storyId });
    await this.readingListService.disconnectStory(id, title, storyId);
  }
}
