import { HateoasLink, HttpRequest } from '../../../api';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import DeleteIcon from '@mui/icons-material/Delete';

export const EntityDelete = (props: { deleteLink: HateoasLink, parentLink: HateoasLink }) => {
  const navigate = useNavigate();
  const mutation = useMutation(
    () => HttpRequest<boolean>(props.deleteLink.href, props.deleteLink.method),
    {
      onSuccess: () => {
        navigate(props.parentLink.href);
      }
    }
  );
  return <IconButton aria-label='settings' onClick={() => mutation.mutate()}>
    <DeleteIcon />
  </IconButton>;
}