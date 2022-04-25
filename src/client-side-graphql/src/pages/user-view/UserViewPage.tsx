import { ErrorPlaceholder, PageContainer } from 'features/core';
import { UserView } from 'features/user';
import { useParams } from 'react-router-dom';
import { useUserWithStoriesQuery } from 'services/graphql-api-service';

export const UserViewPage = () => {
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