import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
// import FilterBar from '../FilterBar';
import { getToken } from '../../../Utils/Common';
import * as apiURLS from '../../../ApiUrls';
import axios from 'axios';
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Button from '@material-ui/core/Button'
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LinearProgress from '@mui/material/LinearProgress';

const useStyles = makeStyles((theme) => ({
  txBox: {
    margin:20,
    padding:20,
    boxShadow: '0px 0px 4px grey'
  },
  table: {
    minWidth: 650,
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  add: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    marginLeft: 1550,
    marginTop: -80
  },
  edit: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    paddingRight: -50,
    marginTop: 4
  },
  delete: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    marginTop: 4
  },
  fillb: {
    marginBottom: 20
  }
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];



export default function Collections({history,props}) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setLoading(true);
      try {
        const token = getToken();
        let config = {  headers: {'Authorization': 'JWT ' + token},
          params: { CompanyID: 1, DriverID:0,
            FromDate:"29-09-2021",
            ToDate:"29-09-2021",
            SearchText:""
          },
        }
        const response =  await axios.get(apiURLS.GET_COL_LIST,config);
        setData(response.data.data);
        setLoading(false);
      }
      catch (e) {
        console.log(e);
        setError(e);
      }
      // .then(response => {
      //   console.log('response',response);  
      //   if(response.data.data &  response.data.data.length > 0){
      //       setData(response.data.data);
      //       //     setUserSession(response.data.data[0].bearerToken, response.data.data[0]);
      //       //     history.push('/dashboard');
      //     }
      //     else{
      //     //     console.log('response',response);
      //     //     if (response.data.message) setError(response.data.message);
      //     //     else setError("Something went wrong. Please try again later.");
      //     }
      // }).catch(error => {
      //   if (error.response.status === 401) setError(error.response.data.message);
      //   else setError("Something went wrong. Please try again later.");
      // }).finally(() => {
      //   setLoading(false);
      // });
    }
    fetchData();
  }, []);
  
  const getDetail = async (ChallanNo) => {
    setError(null);
    setLoading(true);
    try {
      const token = getToken();
      let config = {  headers: {'Authorization': 'JWT ' + token},
        params: { ChallanNo: ChallanNo, CompanyId:1},
      }
      const response =  await axios.get(apiURLS.GET_COL_DETAIL,config);
      setDetail(response.data.data);
      console.log(response);
      setLoading(false);
    }
    catch (e) {
      console.log(e);
      setError(e);
    }
  }

  // function createPost() {
  //   axios
  //     .post(baseURL, {
  //       title: "Hello World!",
  //       body: "This is a new post."
  //     })
  //     .then((response) => {
  //       setPost(response.data);
  //     });
  // }
  // function updatePost() {
  //   axios
  //     .put(`${baseURL}/1`, {
  //       title: "Hello World!",
  //       body: "This is an updated post."
  //     })
  //     .then((response) => {
  //       setPost(response.data);
  //     });
  // }
  // function deletePost() {
  //   axios
  //     .delete(`${baseURL}/1`)
  //     .then(() => {
  //       alert("Post deleted!");
  //       setPost(null)
  //     });
  // }
  //if (!data) return "No data!"
  // const handleClick = () => {
    // setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = [];
    detail.map( function(item, i) {
      data.push(item);
      console.log('in data',data);
    }.bind(this))
    console.log('out data',data);
    setError(null);
    setLoading(true);
    try {
      const token = getToken();
      let config = {  headers: {'Authorization': 'JWT ' + token}}
      const response =  await axios.post(apiURLS.POST_COL_DETAIL,data,config);
      setDetail([]);
      setAlertOpen(true);
      console.log(response);
      setLoading(false);
    }
    catch (e) {
      console.log(e);
      setError(e);
    }

    // axios.post(apiURLS.LOGIN,{},
    //     {
    //         auth: { username: username.value, password: password.value },
    //         headers: {
    //           'Authorization': `Basic Auth` 
    //         }
    //     }
    // ).then(response => {
    //     setLoading(false);
    //     if(response.data.message === "Success"){
    //         setUserSession(response.data.data[0].bearerToken, response.data.data[0]);
    //         history.push('/dashboard');
    //     }
    //     else{
    //         console.log('response',response);
    //         if (response.data.message) setError(response.data.message);
    //         else setError("Something went wrong. Please try again later.");
    //     }
    // }).catch(error => {
    //   setLoading(false);
    //   if (error.response.status === 401) setError(error.response.data.message);
    //   else setError("Something went wrong. Please try again later.");
    // });
  }

  return (
    <div>
      {loading && <LinearProgress />}
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Success"
        action={action}
      />
      {(() => {
        if (detail && detail.length == 0) {
          return ( <div className={classes.root}>
          <div className={classes.fillb}>
            {/* <FilterBar /> */}
          </div>
          {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="center">Challan No</TableCell>
                  <TableCell align="center">Challan Date</TableCell>
                  <TableCell align="center">Driver Name</TableCell>
                  <TableCell align="center">Total Amount</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row,i) => (
                  <TableRow key={i+1}>
                    <TableCell component="th" scope="row">{i+1}</TableCell>
                    <TableCell align="center">{row.challanNo}</TableCell>
                    <TableCell align="center">{row.challanDate}</TableCell>
                    <TableCell align="center">{row.driverName}</TableCell>
                    <TableCell align="center">{row.totalAmount}</TableCell>
                    <TableCell align="center">
                      <Fab className={classes.edit} size='small' color="primary" aria-label="edit">
                        <EditIcon onClick={() => getDetail(row.challanNo)} />
                      </Fab>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>)
        }
        if (detail && detail.length > 0) {
          return ( <div className={classes.root}>
            <div className={classes.fillb}>
            <form onSubmit={handleSubmit}>
            <div>
            {detail.map((row,i) => (

            <>
<div className={classes.txBox}>
<Grid container key={row.transactionID} spacing={2} elevation={2}>
  <Grid item xs={3}> <TextField key={row.transactionID} label="Transaction No" placeholder="Transaction No"
                // error={touched && invalid}
                // helperText={touched && error}
                name="transactionNo" value={row.transactionNo} /></Grid>
  <Grid item xs={3}><TextField key={row.transactionID} label="Transaction Date" placeholder="Transaction Date"
                  name="transactionDate" value={row.transactionDate} /></Grid>
  <Grid item xs={3}><TextField key={row.transactionID} label="ChequeNo" placeholder="ChequeNo"
                // error={touched && invalid}
                // helperText={touched && error}
                name="chequeNo" value={row.chequeNo} /></Grid>       
  <Grid item xs={3}><TextField key={row.transactionID} label="ChequeDate" placeholder="ChequeDate"
                  name="chequeDate" value={row.chequeDate} /></Grid>
  <Grid item xs={3}><TextField key={row.transactionID} label="LedgerID" placeholder="LedgerID" 
      name="ledgerID" value={row.ledgerName} /></Grid>
  <Grid item xs={3}><TextField key={row.transactionID} label="TotalAmount" placeholder="TotalAmount" 
      name="totalAmount" value={row.totalAmount} /></Grid>
  <Grid item xs={3}><TextField key={row.transactionID} label="PendingAmount" placeholder="PendingAmount"
                name="pendingAmount" value={row.pendingAmount} /></Grid>
  <Grid item xs={3}><TextField key={row.transactionID} label="CashAmount" placeholder="CashAmount"
                name="cashAmount" value={row.cashAmount} /></Grid>
  <Grid item xs={3}><TextField key={row.transactionID} label="ChequeAmount" placeholder="ChequeAmount"
                name="chequeAmount" value={row.chequeAmount} /></Grid>
  <Grid item xs={3}><TextField key={row.transactionID} label="CreditAmount" placeholder="CreditAmount"
                name="creditAmount" value={row.creditAmount} /></Grid>
  <Grid item xs={3}><TextField key={row.transactionID} label="ReturnAmount" placeholder="ReturnAmount"
                name="returnAmount" value={row.returnAmount} /></Grid>
  <Grid item xs={3}><TextField key={row.transactionID} label="ReturnTypeID" placeholder="ReturnTypeID"
                name="returnTypeID" value={row.returnTypeID} /></Grid>
</Grid>
</div>
              </>
            ))}
            </div>
            <div>
              <Button type="submit">
                Save
              </Button>
              {/* <button type="button" onClick={reset}>
                Clear Values
              </button> */}
            </div>
          </form>
          </div>  
          </div>
          )    
        }
        })()}
    </div>
  );
}
// "TransactionID": 3,
// 		"TransactionDate": "2021-09-29",
// 		"TransactionNo": "BN45566",
// 		"LedgerID": 4,
// 		"LedgerName": "",
// 		"TotalAmount": 551,
//         "PendingAmount": 551,
//         "CashAmount": 0,
//         "ChequeAmount": 551,
//         "CreditAmount": 0,
//         "ReturnAmount": 0,
//         "ReturnTypeID": 0,
//         "ChequeNo": "00006",
//         "ChequeDate": "01/10/2021"