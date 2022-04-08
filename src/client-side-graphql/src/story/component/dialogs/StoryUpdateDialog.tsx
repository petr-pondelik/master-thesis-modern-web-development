import EditIcon from '@mui/icons-material/Edit';
import { Fragment, useState } from 'react';
import { StoryForm } from '../forms';
import { FullscreenDialog } from '../../../common/components/dialogs';
import { StoryQueryStory } from '../../../graphql/queries';
import { client, UpdateStoryContent } from '../../../graphql';
import { useUpdateStoryMutation } from '../../../graphql/mutations';

export type StoryUpdateDialogState = {
  open: boolean;
  actionEnabled: boolean;
  dto: UpdateStoryContent;
};

export const StoryUpdateDialog = (props: { story: StoryQueryStory }) => {
  const { story } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [actionEnabled, setActionEnabled] = useState<boolean>(true);
  const [dto, setDto] = useState<UpdateStoryContent>({
    title: story ? story.title : '',
    description: story ? story.description : '',
    content: story ? story.content : '',
  });

  const actionCallback = () => {
    client.refetchQueries({
      include: ['Story']
    })
    handleClose();
  }

  const [updateStory] = useUpdateStoryMutation({ id: story.id, content: dto }, () => actionCallback());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    updateStory();
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