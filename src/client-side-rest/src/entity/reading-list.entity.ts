import { PartialUserEntity } from './partial-user.entity';

export type ReadingListEntity = {
  id: number;
  createdAt: Date;
  title: string;
  authorId: number;
  author?: PartialUserEntity;
}
