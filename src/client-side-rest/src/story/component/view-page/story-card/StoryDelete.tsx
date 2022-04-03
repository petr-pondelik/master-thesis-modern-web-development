import DeleteIcon from '@mui/icons-material/Delete';
import { HateoasLink } from '../../../../api';
import { useEffect, useState } from 'react';
import { useFetch } from '../../../../hooks';
import { useNavigate } from 'react-router-dom';

type StoryDeleteState = {
  callDelete: boolean
}

export const StoryDelete = (props: { deleteLink: HateoasLink, parentLink: HateoasLink }) => {
  const [state, setState] = useState<StoryDeleteState>({ callDelete: false });
  const navigate = useNavigate();
  const { response } = useFetch(state.callDelete, props.deleteLink.href, props.deleteLink.method);

  useEffect(() => {
    if (response) {
      navigate(props.parentLink.href);
    }
  }, [response]);

  return <DeleteIcon onClick={() => setState({ callDelete: true })} />;
};