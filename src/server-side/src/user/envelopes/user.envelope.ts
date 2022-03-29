import { HateoasLink } from '../../common/hateoas';
import { UserEntity } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class UserEnvelope extends UserEntity {
  @ApiProperty({
    type: [HateoasLink],
  })
  links: Array<HateoasLink>;
}
