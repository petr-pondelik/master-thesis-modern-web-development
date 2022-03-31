import { HateoasLink, ResponseEnvelope } from '../../common/hateoas';
import { UserEntity } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class UserCollectionEnvelope extends ResponseEnvelope<Array<UserEntity>> {
  @ApiProperty({
    type: [UserEntity],
  })
  data: Array<UserEntity>;

  @ApiProperty({
    type: [HateoasLink],
  })
  _links: Array<HateoasLink>;
}