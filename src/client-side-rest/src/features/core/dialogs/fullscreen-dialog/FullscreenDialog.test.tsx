import { render } from '@testing-library/react';
import { FullscreenDialog } from './FullscreenDialog';

describe('FullscreenDialog tests', () => {
  test('Test the save button when the dialog is closed.', () => {
    const {queryByText} = render(
      <FullscreenDialog
        title={'Testing dialog'}
        isOpened={false}
        actionEnabled={false}
        handleAction={() => {console.log('action')}}
        handleClose={() => {console.log('close')}}
        containedElement={<p>test</p>}
      />
    );
    const saveBtn = queryByText('save');
    expect(saveBtn).toBeNull();
  });
  test('Test the disabled save button render.', () => {
    const {queryByText} = render(
      <FullscreenDialog
        title={'Testing dialog'}
        isOpened={true}
        actionEnabled={false}
        handleAction={() => {console.log('action')}}
        handleClose={() => {console.log('close')}}
        containedElement={<p>test</p>}
      />
    );
    const saveBtn = queryByText('save');
    expect(saveBtn).toBeDefined();
    expect(saveBtn).toBeVisible();
    expect(saveBtn).toBeDisabled();
  });
  test('Test the enabled save button render.', () => {
    const {queryByText} = render(
      <FullscreenDialog
        title={'Testing dialog'}
        isOpened={true}
        actionEnabled={true}
        handleAction={() => {console.log('action')}}
        handleClose={() => {console.log('close')}}
        containedElement={<p>test</p>}
      />
    );
    const saveBtn = queryByText('save');
    expect(saveBtn).toBeDefined();
    expect(saveBtn).toBeVisible();
    expect(saveBtn).toBeEnabled();
  });
});