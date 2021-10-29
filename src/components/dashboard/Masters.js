import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Ledgers from './Masters/Ledgers';

const styles = theme => ({
    root: {
      width: '100%',
      paddingTop: 10
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    table: {
      minWidth: 650,
    },
  });


class Masters extends Component {
  state = {
    searchNodes: ""
  }
  constructor(props, context) {
    super(props, context);

    this.state = {
        active: true,
    };

    this.handleClick = this.handleClick.bind(this);
}

handleClick() {
    this.setState({
        active: !this.state.active
    });
}


render() {
  
  const {classes } = this.props;
    return (
        <div>
          <div className={classes.root}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Menu</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <button className="btn btn-outline-secondary btn-lg ml-5 btn-block" onClick={this.handleClick} type="button">Ledgers</button>
          <button className="btn btn-outline-secondary btn-lg ml-5 btn-block" type="button">PrimaryButton</button>
          <button className="btn btn-outline-secondary btn-lg ml-5 btn-block" type="button">PrimaryButton</button>
          <button className="btn btn-outline-secondary btn-lg ml-5 btn-block" type="button">PrimaryButton</button>
          </AccordionDetails>
          <AccordionDetails>
          <button className="btn btn-outline-secondary btn-lg ml-5 btn-block" type="button">PrimaryButton</button>
          <button className="btn btn-outline-secondary btn-lg ml-5 btn-block" type="button">PrimaryButton</button>
          <button className="btn btn-outline-secondary btn-lg ml-5 btn-block" type="button">PrimaryButton</button>
          <button className="btn btn-outline-secondary btn-lg ml-5 btn-block" type="button">PrimaryButton</button>
          </AccordionDetails>
        </Accordion>
  
        
        
      </div>
      <br></br>
            {this.state.active && <Ledgers />}
        </div>
    )
  }
}



export default withStyles(styles, { withTheme: true })(Masters);




