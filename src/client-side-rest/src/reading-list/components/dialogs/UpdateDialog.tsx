import { findLink, HttpRequest, queryClient, ReadingListEnvelope } from '../../../api';
import { Fragment, useState } from 'react';
import { useMutation } from 'react-query';
import { FullscreenDialog } from '../../../common/components/dialogs';
import { UpdateReadingListDto } from '../../dto';
import EditIcon from '@mui/icons-material/Edit';
import { ReadingListForm } from '../forms';
import { CreateDialogState } from './CreateDialog';
import { useNavigate } from 'react-router-dom';
import { useJwtStore } from '../../../store';

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
    title: '',
  });

  const user = useJwtStore((state) => state.user);
  if (!user) {
    return null;
  }

  const navigate = useNavigate();

  const mutation = useMutation(
    (dto: UpdateReadingListDto) =>
      HttpRequest<ReadingListEnvelope, UpdateReadingListDto>(updateLink.href, updateLink.method, dto),
    {
      onSuccess: (data) => {
        const link = findLink(data._links, 'self');
        const url = `${findLink(user._links, 'reading-lists').href}/${data.title}`;
        navigate(url, { state: { resource: link } });
        queryClient.invalidateQueries(['readingList', user.data.sub, readingList.id]);
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
