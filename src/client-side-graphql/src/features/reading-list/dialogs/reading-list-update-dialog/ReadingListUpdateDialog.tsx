import { Fragment, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import {
  UpdateReadingListContent,
  UserReadingListQueryReadingList,
  useUpdateReadingListMutation,
} from 'services/graphql-api-service';
import { useUserStore } from 'store';
import { CreateDialogState, ReadingListForm } from 'features/reading-list';
import { FullscreenDialog } from 'features/core';
import { useApolloClient } from '@apollo/client';

export type UpdateDialogState = {
  open: boolean;
  actionEnabled: boolean;
  dto: UpdateReadingListContent;
};

export const ReadingListUpdateDialog = (props: { readingList: UserReadingListQueryReadingList }) => {
  const { readingList } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [actionEnabled, setActionEnabled] = useState<boolean>(true);
  const [dto, setDto] = useState<UpdateReadingListContent>({
    title: '',
  });
  const apolloClient = useApolloClient();

  const user = useUserStore((state) => state.user);
  if (!user) {
    return null;
  }

  const actionCallback = () => {
    apolloClient.refetchQueries({
      include: ['UserReadingList'],
    });
    handleClose();
  };

  const [updateReadingList] = useUpdateReadingListMutation(
    { id: readingList.id, content: dto },
    () => actionCallback(),
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    updateReadingList()
  };

  const update = (stateFragment: Partial<CreateDialogState>) => {
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