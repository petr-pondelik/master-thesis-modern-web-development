import { Fragment, useState } from 'react';
import { FullscreenDialog } from '../../../common/components/dialogs';
import { UpdateReadingListDto } from '../../dto';
import EditIcon from '@mui/icons-material/Edit';
import { ReadingListForm } from '../forms';
import { CreateDialogState } from './CreateDialog';
import { useNavigate } from 'react-router-dom';
import { useJwtStore } from '../../../store';

export type UpdateDialogState = {
  open: boolean,
  actionEnabled: boolean,
  dto: UpdateReadingListDto
}

export const UpdateDialog = (props: { readingList: any, refetch: any }) => {

  const { readingList, refetch } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [actionEnabled, setActionEnabled] = useState<boolean>(true);
  const [dto, setDto] = useState<UpdateReadingListDto>({
    title: '',
  });

  const user = useJwtStore(state => state.user);
  if (!user) {
    return null;
  }

  // const navigate = useNavigate();

  // const mutation = useMutation(
  //   (dto: UpdateReadingListDto) =>
  //     HttpRequest<ReadingListEnvelope, UpdateReadingListDto>(updateLink.href, updateLink.method, dto),
  //   {
  //     onSuccess: (data) => {
  //       const link = findLink(data._links, 'self');
  //       const url = `${findLink(user._links, 'reading-lists').href}/${data.title}`;
  //       addLink(url, link);
  //       navigate(url, { state: { resource: link } });
  //       refetch();
  //     },
  //   },
  // );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    // mutation.mutate(dto);
    handleClose();
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