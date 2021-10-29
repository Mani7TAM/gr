import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
// import './test.css'
import { makeStyles } from '@mui/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const useStyles = makeStyles({
  root: {
    marginTop: 10,  
    padding: 5,
    display: 'flex',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    justifyContent: 'center',
  },
  collectdiv: {
    marginRight: 450 
  },
  collect: {
    padding: 20,
    marginRight: 10,
  },
  from: {
      marginLeft: 20,
      marginTop: 15,
  },
  to: {
      marginLeft: 50,
      marginTop: 15,
  },
  select: {
      marginLeft: 50,
      marginTop: 15,
  },
  rbtn: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#630094',
    marginTop: 18,
    marginLeft: 20,
    },
  arrow: {
      color: 'white',
      marginLeft: 14,
      marginTop: 11
      
  },
 
});


export default function FilterBar() {
  const [fromDate, setfromDate] = React.useState(new Date());
  const [toDate, settoDate] = React.useState(new Date());

  const handlefromChange = (newValue) => {
    setfromDate(newValue); 
  };
  const handletoChange = (newValue) => {
    settoDate(newValue); 
  };

  const [age, setAge] = React.useState('');

  const classes = useStyles();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <Box sx={{ boxShadow: 1 }} className={classes.root}>
          <div className={classes.collectdiv}>
          <h1 class={classes.collect}>Collections</h1>
          </div>
        <div className={classes.root}>
                <MobileDatePicker
          label="From"
          inputFormat="MM/dd/yyyy"
          value={fromDate}
          onChange={handlefromChange}
          renderInput={(params) => <TextField {...params} />}
        />
        </div>
        <div className={classes.to}>
        <MobileDatePicker
          label="To"
          inputFormat="MM/dd/yyyy"
          value={toDate}
          onChange={handletoChange}
          renderInput={(params) => <TextField {...params} />}
        />  
        
        </div>
        <div className={classes.select}>
        <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
      <TextField id="outlined-basic" label="Challan No." variant="outlined" onChange={event => setAge(event.target.value)} />
      <h1>{age}</h1>
      </FormControl>
    </Box>
        </div>


        <div className={classes.rbtn}>
        <ArrowForwardIcon className={classes.arrow} />
        </div>
        </Box>
        
      </Stack>
    </LocalizationProvider> 
  );
}
