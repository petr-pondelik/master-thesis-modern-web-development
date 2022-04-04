import UserView from '../components/user-view/UserView';
import { PageContainer } from '../../common';
import { useQuery } from 'react-query';
import { getRequest, UserEnvelope } from '../../api';
import { useResource } from '../../hooks';

const UserViewPage = () => {
  const resource = useResource(window.location.pathname);
  const { data, isLoading, refetch } = useQuery<UserEnvelope>(
    resource.href, () => getRequest<UserEnvelope>(resource.href),
  );
  return <PageContainer>
    <UserView user={data} isLoading={isLoading} refetch={refetch}/>
  </PageContainer>;
};

export default UserViewPage;