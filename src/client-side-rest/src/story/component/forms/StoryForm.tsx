import { Grid } from '@mui/material';
import { CustomInput } from '../../../common';
import { BaseStoryDto } from '../../dto';
import { useState } from 'react';
import { StoryEnvelope } from '../../../api';
import { StoryUpdateState } from '../dialogs';

type Validation = {
  title: boolean,
  description: boolean,
  content: boolean
}

type StoryFormState = {
  dto: BaseStoryDto,
  validation: Validation,
  enabled: boolean
}

type StoryFormProps = {
  story?: StoryEnvelope,
  updateParent: (stateFragment: Partial<StoryUpdateState>) => void
}

export const StoryForm = (props: StoryFormProps) => {

  const { story, updateParent } = props;

  const [state, setState] = useState<StoryFormState>({
    dto: {
      title: story ? story.title : '',
      description: story ? story.description : '',
      content: story ? story.content : '',
    },
    validation: {
      title: !!story,
      description: true,
      content: !!story,
    },
    enabled: !!story,
  });

  const isValid = (validation: Validation) => {
    for (const item of Object.values(validation)) {
      if (!item) {
        return false;
      }
    }
    return true;
  };

  const update = (dtoFragment: Partial<BaseStoryDto>, validationFragment: any) => {
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
    updateParent({ dto: newDto, saveEnabled: valid });
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
            defaultValue={story?.title}
            validationFunction={(value) => {
              return !!value;
            }}
            updateParent={(dtoFragment, validationFragment) => update(dtoFragment, validationFragment)}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent={'center'} marginBottom={'2.5rem'}>
        <Grid item xs={11} md={8} lg={6}>
          <CustomInput
            name={'description'}
            label={'Description*'}
            defaultValue={story?.description}
            updateParent={(dtoFragment, validationFragment) => update(dtoFragment, validationFragment)}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent={'center'} marginBottom={'2.5rem'}>
        <Grid item xs={11} md={8} lg={6}>
          <CustomInput
            name={'content'}
            label={'Content*'}
            defaultValue={story?.content}
            validationFunction={(value) => {
              return !!value;
            }}
            updateParent={(dtoFragment, validationFragment) => update(dtoFragment, validationFragment)}
            multiline
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
