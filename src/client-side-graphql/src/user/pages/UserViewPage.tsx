import { ErrorPlaceholder, PageContainer } from '../../common';
import { useUserWithStoriesQuery } from '../../graphql/queries';
import { useParams } from 'react-router-dom';
import { UserView } from '../components';

const UserViewPage = () => {
  const params = useParams();
  if (!params.id) {
    return <ErrorPlaceholder />;
  }
  const {data, loading, error} = useUserWithStoriesQuery({ id: params.id });
  return <PageContainer>
    <UserView user={data?.user} isLoading={loading} error={error}/>
  </PageContainer>;
};

export default UserViewPage;