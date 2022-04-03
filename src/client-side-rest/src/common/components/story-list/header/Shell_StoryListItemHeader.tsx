import { Avatar, CardActionArea, CardHeader } from '@mui/material';

export const Shell_StoryListItemHeader = () => {
  return <CardActionArea>
    <CardHeader
      avatar={
        <Avatar aria-label='recipe'>
          R
        </Avatar>
      }
      title={''}
      subheader={''}
    />
  </CardActionArea>;
}

export default Shell_StoryListItemHeader;