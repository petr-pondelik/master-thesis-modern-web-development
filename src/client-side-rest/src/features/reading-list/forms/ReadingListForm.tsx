import { ReadingListEnvelope, UpdateReadingListDto } from 'services/rest-api-service';
import { useState } from 'react';
import { Grid } from '@mui/material';
import { CustomInput } from 'features/core/custom-input';

type Validation = {
  title: boolean,
}

type ReadingListFormState = {
  dto: UpdateReadingListDto,
  validation: Validation,
  enabled: boolean
}

type ReadingListFormProps = {
  readingList?: ReadingListEnvelope,
  updateParent: (stateFragment: any) => void
}

export const ReadingListForm = (props: ReadingListFormProps) => {

  const { readingList, updateParent } = props;

  const [state, setState] = useState<ReadingListFormState>({
    dto: {
      title: readingList ? readingList.title : '',
    },
    validation: { title: !!readingList },
    enabled: !!readingList,
  });

  const isValid = (validation: Validation) => {
    return validation.title;
  };

  const update = (dtoFragment: Partial<UpdateReadingListDto>, validationFragment: any) => {
    const newDto = { ...state.dto, ...dtoFragment };
    const newValidation = { ...state.validation, ...validationFragment };
    const valid = isValid(newValidation);
    setState({
      ...state,
      ...{
        dto: newDto,
        validation: newValidation,
      },
      enabled: valid,
    });
    updateParent({ dto: newDto, actionEnabled: valid });
  };

  return (
    <Grid container rowSpacing={3}
          direction={'column'}
          justifyContent={'center'}
          alignItems={'center'}>
      <Grid container justifyContent={'center'} marginBottom={'2.5rem'}>
        <Grid item xs={11} md={8} lg={6}>
          <CustomInput
            name={'title'}
            label={'Title*'}
            defaultValue={readingList?.title}
            validationFunction={(value) => {
              return !!value;
            }}
            updateParent={(dtoFragment, validationFragment) => update(dtoFragment, validationFragment)}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};