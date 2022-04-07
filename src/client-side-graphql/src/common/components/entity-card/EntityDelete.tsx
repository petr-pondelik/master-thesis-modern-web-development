import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

export const EntityDelete = (props: { refetch?: any }) => {
  // const { deleteLink, parentLink, refetch } = props;
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
  return <IconButton aria-label='settings' onClick={() => console.log('DELETE')}>
    <DeleteIcon />
  </IconButton>;
};