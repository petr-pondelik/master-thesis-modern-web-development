import UserView from 'features/user/user-view/UserView';
import { useUser } from 'services/rest-api-service';
import { useParams } from 'react-router-dom';
import { ErrorPlaceholder } from 'features/core/error-placeholder';
import { PageContainer } from 'features/core/page-container';

export const UserViewPage = () => {
  const params = useParams();
  if (!params.id) {
    return <ErrorPlaceholder />;
  }
  const { data, isLoading } = useUser(parseInt(params.id));
  return (
    <PageContainer>
      <UserView user={data} isLoading={isLoading} />
    </PageContainer>
  );
};