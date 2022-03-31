import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { addLinks, createLink, ResponseEnvelope } from './common/hateoas';
import { StoryPath } from './story/story.controller';
import { apiPath } from './common/helper';

type ClientConfig = {
  apiVersion: string
};

const clientConfig: ClientConfig = {
  apiVersion: 'v1'
};

@ApiTags('API Root')
@Controller({
  path: ''
})
export class AppController {
  @Get()
  @ApiOperation({
    summary: "Return API Root definition.",
  })
  getApiRoot(): ResponseEnvelope<ClientConfig> {
    const envelope = new ResponseEnvelope<ClientConfig>(clientConfig);
    addLinks(envelope, [
      createLink('searchStories', apiPath(StoryPath, 'search'), 'POST')
    ]);
    return envelope;
  }
}
