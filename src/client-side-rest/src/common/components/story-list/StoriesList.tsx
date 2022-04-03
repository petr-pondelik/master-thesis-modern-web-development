import { List } from '@mui/material';
import { HateoasLink, StoryCollectionEnvelope } from '../../../api';
import { ErrorPlaceholder, StoryListItem } from '../../index';
import { useFetch } from '../../../hooks';
import { SearchStoryDto } from '../../../story/dto';

type StoriesListProps = {
  fetchLink: HateoasLink | undefined,
  dto?: SearchStoryDto,
  showHeader?: boolean
}

export const StoriesList = (props: StoriesListProps) => {

  if (!props.fetchLink) {
    return null;
  }

  const {
    response: stories,
    loading: loading,
  } = useFetch<StoryCollectionEnvelope>(true, props.fetchLink.href, props.fetchLink.method, props.dto ?? undefined);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (stories) {
    const items = stories.data.map((item, _key) => {
      return <StoryListItem story={item} showHeader={props.showHeader ?? true} key={_key} />;
    });

    return <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {items}
    </List>;
  }

  return <ErrorPlaceholder />;
};

export default StoriesList;