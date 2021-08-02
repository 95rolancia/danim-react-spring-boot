import React from 'react';
import { makeStyles, Chip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const SelecedChip = ({ place, onDelete }) => {
  const classes = useStyles();

  const handleDelete = () => {
    onDelete(place);
  };

  return (
    <Chip
      label={place.label}
      onDelete={handleDelete}
      onClick={handleDelete}
      className={classes.chip}
      color="primary"
    />
  );
};

export default SelecedChip;
