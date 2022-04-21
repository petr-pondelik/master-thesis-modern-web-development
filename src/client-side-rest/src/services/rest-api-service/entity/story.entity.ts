import { PartialUserEntity } from './partial-user.entity';

export type StoryEntity = {
  id: number;
  createdAt: Date;
  title: string;
  description: string;
  content: string;
  authorId: number;
  author?: PartialUserEntity;
}
