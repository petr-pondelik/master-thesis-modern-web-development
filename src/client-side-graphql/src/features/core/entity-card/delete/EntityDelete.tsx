import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const EntityDelete = (props: { entityId: number; mutation: any }) => {
  const { entityId, mutation } = props;
  return (
    <IconButton
      aria-label="settings"
      onClick={() =>
        mutation({
          variables: {
            id: entityId,
          },
        })
      }
    >
      <DeleteIcon />
    </IconButton>
  );
};
