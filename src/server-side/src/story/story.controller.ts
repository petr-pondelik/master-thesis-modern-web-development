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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto, SearchStoryDto, UpdateStoryDto } from './dto';
import { addLinks, createLink } from '../common/hateoas';
import { UserPath } from '../user/user.controller';
import { Jwt, User } from '../common/decorator';
import { apiPath } from '../common/helpers';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LocationResponseHeaderInterceptor } from '../common/interceptor';
import { ErrorMessage } from '../common/message';
import { StoryCollectionEnvelope, StoryEnvelope } from './envelopes';
import { JwtAuthGuard } from '../auth/guard';
import { Limit } from '../common/decorator';

export const StoryPath = 'stories';
export const StoryVersion = '1';

@ApiTags('Stories')
@Controller({
  path: StoryPath,
  version: StoryVersion,
})
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @ApiOperation({
    summary: 'Find newest stories.',
  })
  @ApiOkResponse({
    description: 'Stories successfully retrieved.',
    type: StoryCollectionEnvelope,
  })
  @Get()
  @HttpCode(200)
  async findNewest(@Limit() limit?: number): Promise<StoryCollectionEnvelope> {
    const stories = await this.storyService.findMany(limit);
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
    return envelope;
  }

  @ApiOperation({
    summary: 'Search stories.',
  })
  @ApiOkResponse({
    description: 'Stories successfully retrieved.',
    type: StoryCollectionEnvelope,
  })
  @Post('search')
  @HttpCode(200)
  async search(@Body() dto: SearchStoryDto, @Limit() limit?: number): Promise<StoryCollectionEnvelope> {
    const stories = await this.storyService.search(dto, limit);
    const envelope = new StoryCollectionEnvelope(stories);
    addLinks(envelope, [createLink('self', apiPath(StoryPath, 'search'), 'POST')]);
    for (const a of envelope.data) {
      addLinks(a, [
        createLink('self', apiPath(StoryPath, a.id), 'GET'),
        createLink('author', apiPath(UserPath, a.authorId), 'GET'),
      ]);
    }
    return envelope;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find story.',
  })
  @ApiOkResponse({
    description: 'Story successfully retrieved.',
    type: StoryEnvelope,
  })
  @ApiNotFoundResponse({
    description: 'Story not found.',
    type: ErrorMessage,
  })
  async findOne(@Param('id', ParseIntPipe) _id: number, @Jwt() jwt): Promise<StoryEnvelope> {
    const story = await this.storyService.findOneById(_id);
    let envelope = new StoryEnvelope();
    envelope = { ...envelope, ...story };
    const links = [
      createLink('self', apiPath(StoryPath, story.id), 'GET'),
      createLink('parent', apiPath(StoryPath), 'GET'),
      createLink('author', apiPath(UserPath, story.authorId), 'GET'),
    ];
    if (jwt && jwt.sub === story.authorId) {
      links.push(
        createLink('update', apiPath(StoryPath, story.id), 'PATCH'),
        createLink('delete', apiPath(StoryPath, story.id), 'DELETE'),
      );
    }
    addLinks(envelope, links);
    return envelope;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Create a new story.',
  })
  @ApiCreatedResponse({
    description: 'Story successfully created.',
    type: StoryEnvelope,
  })
  @UseInterceptors(new LocationResponseHeaderInterceptor(apiPath(StoryPath)))
  async create(@Body() dto: CreateStoryDto): Promise<StoryEnvelope> {
    const story = await this.storyService.create(dto);
    let envelope = new StoryEnvelope();
    envelope = { ...envelope, ...story };
    addLinks(envelope, [
      createLink('self', apiPath(StoryPath, story.id), 'GET'),
      createLink('author', apiPath(UserPath, story.authorId), 'GET'),
      createLink('update', apiPath(StoryPath, story.id), 'PATCH'),
      createLink('delete', apiPath(StoryPath, story.id), 'DELETE'),
    ]);
    return envelope;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Partially update story.',
  })
  @ApiNoContentResponse({
    description: 'Story successfully updated.',
  })
  @ApiNotFoundResponse({
    description: 'Story not found.',
    type: ErrorMessage,
  })
  @ApiForbiddenResponse({
    description: 'Access to the story is forbidden.',
    type: ErrorMessage,
  })
  async update(@Param('id', ParseIntPipe) _id: number, @Body() dto: UpdateStoryDto, @User() user) {
    /** Owner-level access restriction */
    const story = await this.storyService.findOneById(_id);
    if (user.id !== story.authorId) {
      throw new ForbiddenException();
    }
    const newStory = await this.storyService.update(_id, dto);
    let envelope = new StoryEnvelope();
    envelope = { ...envelope, ...newStory };
    addLinks(envelope, [
      createLink('self', apiPath(StoryPath, newStory.id), 'GET'),
      createLink('author', apiPath(UserPath, newStory.authorId), 'GET'),
      createLink('update', apiPath(StoryPath, newStory.id), 'PATCH'),
      createLink('delete', apiPath(StoryPath, newStory.id), 'DELETE'),
    ]);
    return envelope;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete story.',
  })
  @ApiNoContentResponse({
    description: 'Story successfully deleted.',
  })
  @ApiNotFoundResponse({
    description: 'Story not found.',
    type: ErrorMessage,
  })
  @ApiForbiddenResponse({
    description: 'Access to the story is forbidden.',
    type: ErrorMessage,
  })
  async delete(@Param('id', ParseIntPipe) _id: number, @User() user) {
    /** Owner-level access restriction */
    const story = await this.storyService.findOneById(_id);
    if (user.id !== story.authorId) {
      throw new ForbiddenException();
    }
    return await this.storyService.delete(_id);
  }
}
