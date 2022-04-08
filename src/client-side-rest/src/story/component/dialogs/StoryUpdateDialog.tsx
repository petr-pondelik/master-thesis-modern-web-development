import { findLink, HttpRequest, queryClient, StoryEnvelope } from '../../../api';
import EditIcon from '@mui/icons-material/Edit';
import { Fragment, useState } from 'react';
import { StoryForm } from '../forms';
import { UpdateStoryDto } from '../../dto';
import { useMutation } from 'react-query';
import { FullscreenDialog } from '../../../common/components/dialogs';

export type StoryUpdateDialogState = {
  open: boolean,
  actionEnabled: boolean,
  dto: UpdateStoryDto
}

export const StoryUpdateDialog = (props: { story: StoryEnvelope }) => {

  const { story } = props;
  const updateLink = findLink(story._links, 'update');

  const [open, setOpen] = useState<boolean>(false);
  const [actionEnabled, setActionEnabled] = useState<boolean>(true);
  const [dto, setDto] = useState<UpdateStoryDto>({
    title: story ? story.title : '',
    description: story ? story.description : '',
    content: story ? story.content : '',
  });

  const mutation = useMutation(
    (dto: UpdateStoryDto) => HttpRequest<StoryEnvelope, UpdateStoryDto>(updateLink.href, updateLink.method, dto),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['story', story.id]);
        handleClose();
      },
    },
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    mutation.mutate(dto);
  };

  const update = (stateFragment: Partial<StoryUpdateDialogState>) => {
    if (stateFragment.dto) {
      setDto({ ...dto, ...stateFragment.dto });
    }
    if (stateFragment.actionEnabled) {
      setActionEnabled(stateFragment.actionEnabled);
    }
  };

  return (
    <Fragment>
      <EditIcon onClick={handleOpen} />
      <FullscreenDialog
        title={story.title}
        isOpened={open}
        actionEnabled={actionEnabled}
        handleClose={handleClose}
        handleAction={handleSave}
        containedElement={<StoryForm story={story} updateParent={update} />}
      />
    </Fragment>
  );
};