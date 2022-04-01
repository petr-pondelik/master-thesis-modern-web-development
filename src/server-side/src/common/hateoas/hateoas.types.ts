import { ApiProperty } from '@nestjs/swagger';

export type LinkRel =
  | 'self'
  | 'author'
  | 'stories'
  | 'reading-lists'
  | 'view'
  | 'create'
  | 'update'
  | 'delete'
  | 'addStory'
  | 'removeStory'
  | 'search';

export type LinkMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export class HateoasLink {
  @ApiProperty()
  method: LinkMethod;

  @ApiProperty()
  rel: LinkRel;

  @ApiProperty()
  href: string;

  constructor(method: LinkMethod, rel: LinkRel, href: string) {
    this.method = method;
    this.rel = rel;
    this.href = href;
  }
}
