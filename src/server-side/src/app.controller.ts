import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseEnvelope } from './common/hateoas';

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
    return new ResponseEnvelope<ClientConfig>(clientConfig);
  }
}
