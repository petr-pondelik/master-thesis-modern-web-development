import { findLink, HttpRequest, StoryEnvelope } from '../../../api';
import EditIcon from '@mui/icons-material/Edit';
import { Fragment, useState } from 'react';
import { StoryForm } from '../forms';
import { BaseStoryDto } from '../../dto';
import { useMutation } from 'react-query';
import { FullscreenDialog } from '../../../common/components/dialogs';

export type StoryUpdateDialogState = {
  open: boolean,
  actionEnabled: boolean,
  dto: BaseStoryDto
}

export const StoryUpdateDialog = (props: { story: StoryEnvelope, refetch: any }) => {

  const {story, refetch} = props;
  const updateLink = findLink(story._links, 'update');

  const [state, setState] = useState<StoryUpdateDialogState>({
    open: false,
    actionEnabled: !!story,
    dto: {
      title: story ? story.title : '',
      description: story ? story.description : '',
      content: story ? story.content : '',
    },
  });

  const mutation = useMutation(
    (dto: BaseStoryDto) => HttpRequest<StoryEnvelope, BaseStoryDto>(updateLink.href, updateLink.method, dto),
    {
      onSuccess: data => {refetch()}
    }
  );

  const handleOpen = () => {
    setState({ ...state, ['open']: true });
  };

  const handleClose = () => {
    setState({ ...state, ['open']: false });
  };

  const handleSave = () => {
    const dto = state.dto;
    mutation.mutate(dto);
    handleClose();
  };

  const update = (stateFragment: Partial<StoryUpdateDialogState>) => {
    setState({ ...state, ...stateFragment });
  };

  const containedForm = () => {
    return <StoryForm story={story} updateParent={update} />
  }

  return (
    <Fragment>
      <EditIcon onClick={handleOpen} />
      <FullscreenDialog
        title={story.title}
        isOpened={state.open}
        isActionEnabled={state.actionEnabled}
        handleClose={handleClose}
        handleAction={handleSave}
        containedElement={containedForm()}
      />
    </Fragment>
  );
};