import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, makeStyles, Tab, Tabs } from '@material-ui/core';
import DetailTabPic from './detail-tab-pic';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
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

TabPanel.prototypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
}));
const DetailTab = ({ datas, nickname }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit" elevation={0}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="일차 탭"
        >
          {datas.substories.map((story, index) => (
            <Tab
              label={index + 1 + '일차'}
              key={story.seqNo}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </AppBar>
      {datas.substories.map((story, index) => (
        <TabPanel value={value} index={index} key={story.seqNo}>
          <DetailTabPic datas={story} nickname={nickname} />
        </TabPanel>
      ))}
    </div>
  );
};

export default DetailTab;
