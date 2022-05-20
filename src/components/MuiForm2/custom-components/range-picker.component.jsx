/* eslint-disable react/jsx-fragments */
// Library
import React from 'react';
import { DateRangePicker } from 'react-material-ui-5-date-range-picker';

// Material UI
import Dialog from '@mui/material/Dialog';
import { TextField } from '@mui/material';

const CustomDateRangePicker = ({ onChange, formData, uiData = { object: { } } }) => {
  const [open, setOpen] = React.useState(false);
  const [data] = React.useState(uiData.object?.customComponent || formData.object?.customComponent || '');
    
  const toggle = () => setOpen(!open);

  const RangePicker = () => (
    <Dialog
        open={open}
        onClose={toggle}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        PaperProps={{
          style: {
            maxWidth: 585,
            overflow: 'hidden',
          },
        }}
    >
      <DateRangePicker
        open={open}
        toggle={toggle}
        onChange={(range) => {
          const startDate = range.startDate.toISOString();
          const endDate = range.endDate.toISOString();
          const newUIData = `${range.startDate.toLocaleDateString('us')} - ${range.endDate.toLocaleDateString('us')}`;
          const newData = {
            startDate,
            endDate,
          };
          onChange(newData, newUIData);
          toggle();
        }}
      />
    </Dialog>
  );
  return (
    <React.Fragment>
      <TextField
        id='standard-basic'
        label='Range Picker'
        value={data}
        onClick={toggle}
      />
      <RangePicker />
    </React.Fragment>
  );
};

export default CustomDateRangePicker;
