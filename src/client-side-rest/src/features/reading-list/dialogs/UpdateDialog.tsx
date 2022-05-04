import {
  findLink,
  ReadingListEnvelope,
  UpdateReadingListDto,
  useLinkMutation,
} from 'services/rest-api-service';
import { Fragment, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useUserStore } from 'stores';
import { FullscreenDialog } from 'features/core/dialogs';
import { ReadingListForm } from 'features/reading-list';
import { useQueryClient } from 'react-query';

export type UpdateDialogState = {
  open: boolean;
  actionEnabled: boolean;
  dto: UpdateReadingListDto;
};

export const UpdateDialog = (props: { readingList: ReadingListEnvelope }) => {
  const { readingList } = props;
  const updateLink = findLink(readingList._links, 'update');
  const [open, setOpen] = useState<boolean>(false);
  const [actionEnabled, setActionEnabled] = useState<boolean>(true);
  const [dto, setDto] = useState<UpdateReadingListDto>({
    title: readingList.title,
  });
  const queryClient = useQueryClient();

  const user = useUserStore((state) => state.user);
  if (!user) {
    return null;
  }

  const mutation = useLinkMutation(updateLink, dto, {
    onSuccess: () => {
      queryClient.invalidateQueries(['readingList', user.data.sub, readingList.id]);
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    mutation.mutate(dto);
    handleClose();
  };

  const update = (stateFragment: Partial<UpdateDialogState>) => {
    if (stateFragment.dto) {
      setDto({ ...dto, ...stateFragment.dto });
    }
    if (stateFragment.actionEnabled) {
      setActionEnabled(stateFragment.actionEnabled);
    }
  };

  const containedForm = () => {
    return <ReadingListForm readingList={readingList} updateParent={update} />;
  };

  return (
    <Fragment>
      <EditIcon onClick={handleOpen} />
      <FullscreenDialog
        title={readingList.title}
        isOpened={open}
        actionEnabled={actionEnabled}
        handleClose={handleClose}
        handleAction={handleSave}
        containedElement={containedForm()}
      />
    </Fragment>
  );
};
