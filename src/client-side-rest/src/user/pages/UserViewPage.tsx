import UserView from '../components/user-view/UserView';
import { ErrorPlaceholder, PageContainer } from '../../common';
import { userUser } from '../../api/queries';
import { useParams } from 'react-router-dom';

const UserViewPage = () => {
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

export default UserViewPage;
