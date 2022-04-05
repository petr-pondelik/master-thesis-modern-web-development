import { HateoasLink } from '../../common/hateoas';
import { ApiProperty } from '@nestjs/swagger';
import { StoryEntity } from '../entities';

export class StoryEnvelope extends StoryEntity {
  @ApiProperty({
    type: [HateoasLink],
  })
  _links: Array<HateoasLink>;
}
