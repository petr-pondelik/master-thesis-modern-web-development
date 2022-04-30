import { HateoasLink, useLinkMutation } from 'services/rest-api-service';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

export const EntityDelete = (props: { deleteLink: HateoasLink; parentLink?: HateoasLink; refetch?: any }) => {
  const { deleteLink, parentLink, refetch } = props;
  const navigate = useNavigate();
  const mutation = useLinkMutation(deleteLink, undefined, {
    onSuccess: () => {
      if (parentLink) {
        navigate(parentLink.href);
      }
      if (refetch) {
        refetch();
      }
    },
  });
  return (
    <IconButton aria-label="settings" onClick={() => mutation.mutate(undefined)}>
      <DeleteIcon />
    </IconButton>
  );
};
