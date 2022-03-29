import { HateoasLink } from '../../common/hateoas';
import { ReadingListEntity } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class ReadingListEnvelope extends ReadingListEntity {
  @ApiProperty({
    type: [HateoasLink],
  })
  links: Array<HateoasLink>;
}
