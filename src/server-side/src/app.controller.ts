import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { addLinks, createLink, ResponseEnvelope } from './common/hateoas';

type ClientConfig = {
  apiVersion: string;
};

const clientConfig: ClientConfig = {
  apiVersion: 'v1',
};

@ApiTags('API Root')
@Controller({
  version: '1',
  path: '',
})
export class AppController {
  @Get()
  @ApiOperation({
    summary: 'Return API Root definition.',
  })
  getApiRoot(): ResponseEnvelope<ClientConfig> {
    const envelope = new ResponseEnvelope<ClientConfig>(clientConfig);
    addLinks(envelope, [
      createLink('signIn', '/auth/sign-in', 'POST'),
      createLink('search', '/stories/search', 'POST'),
    ]);
    return envelope;
  }
}
