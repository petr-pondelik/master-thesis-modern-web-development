import DeleteIcon from '@mui/icons-material/Delete';
import { HateoasLink, HttpRequest } from '../../../../../api';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';


export const StoryDelete = (props: { deleteLink: HateoasLink, parentLink: HateoasLink }) => {
  const navigate = useNavigate();
  const mutation = useMutation(() => HttpRequest<boolean>(props.deleteLink.href, props.deleteLink.method));
  if (mutation.isSuccess) {
    navigate(props.parentLink.href);
  }
  return <DeleteIcon onClick={() => mutation.mutate()} />;
};