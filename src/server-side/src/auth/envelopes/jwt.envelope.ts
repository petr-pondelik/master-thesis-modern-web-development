import { ApiProperty } from '@nestjs/swagger';
import { HateoasLink } from '../../common/hateoas';

export class JwtEnvelope {
  @ApiProperty()
  access_token: string;

  @ApiProperty({
    type: [HateoasLink]
  })
  _links: HateoasLink[]

  constructor(jwt: string) {
    this.access_token = jwt;
  }
}
