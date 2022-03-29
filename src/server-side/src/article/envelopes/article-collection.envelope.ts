import { HateoasLink, ResponseEnvelope } from '../../common/hateoas';
import { ApiProperty } from '@nestjs/swagger';
import { ArticleEntity } from '../entities';
import { ArticleEnvelope } from './article.envelope';

export class ArticleCollectionEnvelope extends ResponseEnvelope<Array<ArticleEntity>> {
  @ApiProperty({
    type: [ArticleEnvelope],
  })
  data: Array<ArticleEnvelope>;

  @ApiProperty({
    type: [HateoasLink],
  })
  links: Array<HateoasLink>;
}
