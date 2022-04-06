import { HateoasLink, ResponseEnvelope } from '../../common/hateoas';
import { ApiProperty } from '@nestjs/swagger';
import { StoryEntity } from '../entities';
import { StoryEnvelope } from './story.envelope';

export class StoryCollectionEnvelope extends ResponseEnvelope<Array<StoryEntity>> {
  @ApiProperty({
    type: [StoryEnvelope],
  })
  data: Array<StoryEnvelope>;

  @ApiProperty({
    type: [HateoasLink],
  })
  _links: Array<HateoasLink>;
}
