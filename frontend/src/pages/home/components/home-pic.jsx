import { AppBar, Box, Tab, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import HomePicTab from './home-pic-tab';
import PropTypes from 'prop-types';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const HomePic = ({ datas }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const type = ['all', 'food', 'scenery', 'person'];
  const [filterPic, setFilterPic] = useState([]);

  const handleChange = (_, newValue) => {
    setValue(newValue);

    if (newValue !== 0) {
      const filterPic = datas.filter((data) => data.tag === type[newValue]);
      setFilterPic(filterPic);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit" elevation={0}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="전체" {...a11yProps(0)} />
          <Tab label="음식" {...a11yProps(1)} />
          <Tab label="풍경" {...a11yProps(2)} />
          <Tab label="인물" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <HomePicTab datas={datas} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <HomePicTab datas={filterPic} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <HomePicTab datas={filterPic} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <HomePicTab datas={filterPic} />
      </TabPanel>
    </div>
  );
};

export default HomePic;
