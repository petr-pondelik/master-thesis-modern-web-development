import { ErrorPlaceholder, PageContainer } from '../../common';
import { useUserWithStoriesQuery } from '../../graphql/queries';
import { useParams } from 'react-router-dom';
import { UserView } from '../components';

const UserViewPage = () => {
  const params = useParams();
  if (!params.id) {
    return <ErrorPlaceholder />;
  }
  const {data, loading, error} = useUserWithStoriesQuery({ id: parseInt(params.id) });
  if (error) {
    return <ErrorPlaceholder />;
  }
  return <PageContainer>
    <UserView user={data?.user} isLoading={loading}/>
  </PageContainer>;
};

export default UserViewPage;