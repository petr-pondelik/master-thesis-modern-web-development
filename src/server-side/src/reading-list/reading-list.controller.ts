import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
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
  UseGuards,
} from '@nestjs/common';
import { StoryCollectionEnvelope } from '../story/envelopes';
import { ErrorMessage } from '../common/message';
import { Jwt, Limit, User } from '../common/decorator';
import { ReadingListService } from './reading-list.service';
import { addLinks, createLink } from '../common/hateoas';
import { apiPath } from '../common/helpers';
import { StoryPath } from '../story/story.controller';
import { UserPath } from '../user/user.controller';
import { JwtAuthGuard } from '../auth/guard';
import { ReadingListEnvelope } from './envelopes';
import { CreateReadingListDto, UpdateReadingListDto } from './dto';
import { Response } from 'express';
import { StoryService } from '../story/story.service';

export const ReadingListPath = 'reading-lists';
export const ReadingListVersion = '1';

@ApiTags('ReadingLists')
@Controller({
  path: ReadingListPath,
  version: ReadingListVersion,
})
export class ReadingListController {
  constructor(private readonly readingListService: ReadingListService, private readonly storyService: StoryService) {}

  @Get(':id/stories')
  @ApiOperation({
    summary: 'Find stories within the reading list.',
  })
  @ApiOkResponse({ description: 'Stories successfully retrieved.', type: StoryCollectionEnvelope })
  @ApiNotFoundResponse({ description: 'Resource not found.', type: ErrorMessage })
  async findStories(
    @Param('id', ParseIntPipe) id: number,
    @Limit() limit: number | undefined,
    @Jwt() jwt
  ): Promise<StoryCollectionEnvelope> {
    const readingList = await this.readingListService.findById(id);
    const stories = await this.readingListService.findStories(id, limit);
    const envelope = new StoryCollectionEnvelope(stories);
    addLinks(envelope, [
      createLink('self', apiPath(ReadingListPath, `${id}/stories`), 'GET'),
    ]);
    for (const s of envelope.data) {
      const links = [
        createLink('self', apiPath(StoryPath, s.id), 'GET'),
        createLink('author', apiPath(UserPath, s.authorId), 'GET'),
      ];
      if (jwt && jwt.sub === readingList.authorId) {
        links.push(createLink('delete', apiPath(ReadingListPath, `${id}/stories/${s.id}`), 'DELETE'));
      }
      addLinks(s, links);
    }
    return envelope;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({
    summary: 'Create a new reading list.',
  })
  @ApiCreatedResponse({ description: 'Reading list successfully created.', type: ReadingListEnvelope })
  @ApiNotFoundResponse({ description: 'Resource not found.', type: ErrorMessage })
  @ApiForbiddenResponse({ description: 'Access is forbidden.', type: ErrorMessage })
  async createReadingList(@Body() dto: CreateReadingListDto, @User() user, @Res() res: Response) {
    /** Owner-level access restriction */
    if (dto.authorId !== user.id) {
      throw new ForbiddenException();
    }
    const readingList = await this.readingListService.create(dto);
    const envelope = { ...new ReadingListEnvelope(), ...readingList };
    addLinks(envelope, [
      createLink('self', apiPath(ReadingListPath, readingList.id), 'GET'),
      createLink('parent', apiPath(ReadingListPath), 'GET'),
      createLink('author', apiPath(UserPath, readingList.authorId), 'GET'),
      createLink('update', apiPath(ReadingListPath, readingList.id), 'PATCH'),
      createLink('delete', apiPath(ReadingListPath, readingList.id), 'DELETE'),
      createLink('stories', apiPath(ReadingListPath, `${readingList.id}/stories`), 'GET'),
    ]);
    return res.setHeader('Location', apiPath(ReadingListPath, readingList.id)).json(envelope);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({
    summary: 'Partially update reading list.',
  })
  @ApiOkResponse({ description: 'Reading list successfully updated.', type: ReadingListEnvelope })
  @ApiNotFoundResponse({ description: 'Resource not found.', type: ErrorMessage })
  @ApiForbiddenResponse({ description: 'Access is forbidden.', type: ErrorMessage })
  async updateReadingList(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReadingListDto,
    @User() user,
  ): Promise<ReadingListEnvelope> {
    const resource = await this.readingListService.findById(id);
    /** Owner-level access restriction */
    if (resource.authorId !== user.id) {
      throw new ForbiddenException();
    }
    const readingList = await this.readingListService.update(id, dto);
    const envelope = { ...new ReadingListEnvelope(), ...readingList };
    addLinks(envelope, [
      createLink('self', apiPath(ReadingListPath, readingList.id), 'GET'),
      createLink('parent', apiPath(ReadingListPath), 'GET'),
      createLink('author', apiPath(UserPath, readingList.authorId), 'GET'),
      createLink('update', apiPath(ReadingListPath, readingList.id), 'PATCH'),
      createLink('delete', apiPath(ReadingListPath, readingList.id), 'DELETE'),
      createLink('stories', apiPath(ReadingListPath, `${readingList.id}/stories`), 'GET'),
    ]);
    return envelope;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete reading list.',
  })
  @ApiNoContentResponse({ description: 'Reading list successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Resource not found.', type: ErrorMessage })
  @ApiForbiddenResponse({ description: 'Access is forbidden.', type: ErrorMessage })
  async deleteReadingList(@Param('id', ParseIntPipe) id: number, @User() user) {
    const resource = await this.readingListService.findById(id);
    /** Owner-level access restriction */
    if (resource.authorId !== user.id) {
      throw new ForbiddenException();
    }
    await this.readingListService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':readingListId/stories/:storyId')
  @ApiOperation({
    summary: 'Add story into reading list.',
  })
  @ApiCreatedResponse({ description: 'Story successfully added into reading list.' })
  @ApiNotFoundResponse({ description: 'Resource not found.', type: ErrorMessage })
  @ApiForbiddenResponse({ description: 'Access is forbidden.', type: ErrorMessage })
  async addStoryIntoReadingList(
    @Param('readingListId', ParseIntPipe) readingListId: number,
    @Param('storyId', ParseIntPipe) storyId: number,
    @User() user,
    @Res() res: Response,
  ) {
    const resource = await this.readingListService.findById(readingListId);
    /** Owner-level access restriction */
    if (resource.authorId !== user.id) {
      throw new ForbiddenException();
    }
    await this.storyService.findOneById(storyId);
    const readingList = await this.readingListService.connectStory(readingListId, storyId);
    const envelope = { ...new ReadingListEnvelope(), ...readingList };
    addLinks(envelope, [createLink('self', apiPath(ReadingListPath, `${readingList.id}/stories/${storyId}`), 'GET')]);
    return res.setHeader('Location', apiPath(ReadingListPath, `${readingList.id}/stories/${storyId}`)).json(envelope);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':readingListId/stories/:storyId')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Remove story from reading list.',
  })
  @ApiNoContentResponse({ description: 'Story successfully removed from reading list.' })
  @ApiNotFoundResponse({ description: 'Resource not found.', type: ErrorMessage })
  @ApiForbiddenResponse({ description: 'Access is forbidden.', type: ErrorMessage })
  async deleteStoryFromReadingList(
    @Param('readingListId', ParseIntPipe) readingListId: number,
    @Param('storyId', ParseIntPipe) storyId: number,
    @User() user,
  ) {
    const resource = await this.readingListService.findById(readingListId);
    /** Owner-level access restriction */
    if (resource.authorId !== user.id) {
      throw new ForbiddenException();
    }
    await this.storyService.findOneById(storyId);
    await this.readingListService.disconnectStory(readingListId, storyId);
  }
}
