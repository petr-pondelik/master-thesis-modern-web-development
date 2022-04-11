import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseEnvelope } from './common/hateoas';

type RootData = {
  apiVersion: string;
};

const rootData: RootData = {
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
    summary: 'Return API Root.',
  })
  getApiRoot(): ResponseEnvelope<RootData> {
    return new ResponseEnvelope<RootData>(rootData);
  }
}
