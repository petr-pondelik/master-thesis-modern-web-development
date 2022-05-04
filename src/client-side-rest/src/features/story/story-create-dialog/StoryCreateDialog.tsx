import { Fragment, useState } from 'react';
import { CreateStoryDto, HateoasLink, useLinkMutation } from 'services/rest-api-service';
import { useUserStore } from 'stores';
import { FullscreenDialog } from 'features/core/dialogs';
import { StoryForm } from 'features/story';
import { FloatingAddButton } from '../../core/buttons';

export type StoryCreateDialogState = {
  open: boolean;
  actionEnabled: boolean;
  dto: CreateStoryDto;
};

export const StoryCreateDialog = (props: { createLink: HateoasLink; refetch: any }) => {
  const { createLink, refetch } = props;

  const user = useUserStore((state) => state.user);
  if (!user) {
    return null;
  }

  const [open, setOpen] = useState<boolean>(false);
  const [actionEnabled, setActionEnabled] = useState<boolean>(false);
  const [dto, setDto] = useState<CreateStoryDto>({
    title: '',
    description: '',
    content: '',
    authorId: user.data.sub,
  });

  const mutation = useLinkMutation(createLink, dto, {
    onSuccess: () => {
      refetch();
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (user) {
      mutation.mutate(dto);
      handleClose();
    }
  };

  const update = (stateFragment: Partial<StoryCreateDialogState>) => {
    if (stateFragment.dto) {
      setDto({ ...dto, ...stateFragment.dto });
    }
    if (stateFragment.actionEnabled) {
      setActionEnabled(stateFragment.actionEnabled);
    }
  };

  return (
    <Fragment>
      <FloatingAddButton onClick={handleOpen}/>
      <FullscreenDialog
        title={'Create Story'}
        isOpened={open}
        actionEnabled={actionEnabled}
        handleClose={handleClose}
        handleAction={handleSave}
        containedElement={<StoryForm updateParent={update} />}
      />
    </Fragment>
  );
};
