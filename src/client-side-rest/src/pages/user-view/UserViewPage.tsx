import UserView from 'features/user/user-view/UserView';
import { userUser } from 'services/rest-api-service';
import { useParams } from 'react-router-dom';
import { ErrorPlaceholder } from 'features/core/error-placeholder';
import { PageContainer } from 'features/core/page-container';

export const UserViewPage = () => {
  const params = useParams();
  if (!params.id) {
    return <ErrorPlaceholder />;
  }
  const { data, isLoading } = userUser(parseInt(params.id));
  return (
    <PageContainer>
      <UserView user={data} isLoading={isLoading} />
    </PageContainer>
  );
};