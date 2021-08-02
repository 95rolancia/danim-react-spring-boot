import React from 'react';
import {
  makeStyles,
  Chip,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5),
  },
}))

const PlaceChip = ({ place, onClick }) => {
  const classes = useStyles();

  const handleClick = () => {
    onClick(place);
  };

  return (
    <Chip
      label={place.label}
      onClick={handleClick}
      className={classes.chip}
      color={
        place.state === 'selected' ? 'primary' : 'default'
      }
    />
    )
};

export default PlaceChip;