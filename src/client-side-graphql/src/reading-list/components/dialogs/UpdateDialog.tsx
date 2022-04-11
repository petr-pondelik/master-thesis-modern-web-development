import { Fragment, useState } from 'react';
import { FullscreenDialog } from '../../../common/components/dialogs';
import { UpdateReadingListDto } from '../../dto';
import EditIcon from '@mui/icons-material/Edit';
import { ReadingListForm } from '../forms';
import { CreateDialogState } from './CreateDialog';
import { useJwtStore } from '../../../store';
import { apolloClient } from '../../../graphql';
import { UpdateReadingListData, useUpdateReadingListMutation } from '../../../graphql/mutations';
import { UserReadingListQueryReadingList } from '../../../graphql/queries';

export type UpdateDialogState = {
  open: boolean;
  actionEnabled: boolean;
  dto: UpdateReadingListDto;
};

export const UpdateDialog = (props: { readingList: UserReadingListQueryReadingList }) => {
  const { readingList } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [actionEnabled, setActionEnabled] = useState<boolean>(true);
  const [dto, setDto] = useState<UpdateReadingListDto>({
    title: '',
  });

  const user = useJwtStore((state) => state.user);
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
    (data: UpdateReadingListData) => actionCallback(),
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