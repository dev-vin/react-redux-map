import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card, { CardActions, CardContent, CardMedia } from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
};

function InfoWindow(props) {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        {/* <CardActions> */}
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        {/* </CardActions> */}
      </Card>
    </div>
  );
}


export default withStyles(styles)(InfoWindow);