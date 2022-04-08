import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

export const EntityDelete = (props: { mutation: any, refetch: any }) => {
  const { mutation } = props;
  // const navigate = useNavigate();
  // const mutation = useMutation(
  //   () => HttpRequest<boolean>(deleteLink.href, deleteLink.method),
  //   {
  //     onSuccess: () => {
  //       if (parentLink) {
  //         navigate(parentLink.href);
  //       }
  //       if (refetch) {
  //         refetch();
  //       }
  //     },
  //   },
  // );
  return <IconButton aria-label='settings' onClick={mutation}>
    <DeleteIcon />
  </IconButton>;
};