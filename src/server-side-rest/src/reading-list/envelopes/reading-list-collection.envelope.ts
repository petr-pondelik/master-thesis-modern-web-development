import { HateoasLink, ResponseEnvelope } from '../../common/hateoas';
import { ReadingListEntity } from '../entities';
import { ApiProperty } from '@nestjs/swagger';
import { ReadingListEnvelope } from './reading-list.envelope';

export class ReadingListCollectionEnvelope extends ResponseEnvelope<Array<ReadingListEntity>> {
  @ApiProperty({
    type: [ReadingListEnvelope],
  })
  data: Array<ReadingListEnvelope>;

  @ApiProperty({
    type: [HateoasLink],
  })
  _links: Array<HateoasLink>;
}