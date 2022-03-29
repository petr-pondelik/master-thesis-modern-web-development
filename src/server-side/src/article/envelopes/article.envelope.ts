import { HateoasLink } from '../../common/hateoas';
import { ApiProperty } from '@nestjs/swagger';
import { ArticleEntity } from '../entities';

export class ArticleEnvelope extends ArticleEntity {
  @ApiProperty({
    type: [HateoasLink],
  })
  links: Array<HateoasLink>;
}
