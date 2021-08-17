import React from 'react';
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@material-ui/icons/Room';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  marker: {
    width: '1.5em',
    height: '1.5em',
    transform: 'translate(-50%,-50%)',
  },
}));

const BoardDetailMap = ({ stories, lat, lng }) => {
  const classes = useStyles();
  const AnyReactComponent = () => (
    <RoomIcon color="secondary" className={classes.marker} />
  );

  if (lat === null && lng === null) {
    lat = 33.492269071672496;
    lng = 126.53945522035214;
  }

  function getRandomColor() {
    let color;
    let letters = '0123456789ABCDEF';
    color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  const renderPolylines = (map, maps, stories) => {
    stories.substories.forEach((story) => {
      const flightPlanCoordinates = story.photos.map((pic) => {
        return {
          lat: +pic.latitude,
          lng: +pic.longtitude,
        };
      });
      const flightPath = new maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: getRandomColor(),
        strokeOpacity: 1.0,
        strokeWeight: 3,
      });
      flightPath.setMap(map);
    });
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '50%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        center={{ lat, lng }}
        zoom={14}
        onGoogleApiLoaded={({ map, maps }) => {
          renderPolylines(map, maps, stories);
        }}
        yesIWantToUseGoogleMapApiInternals
      >
        {stories.substories.map((story) => {
          return story.photos.map((place) => {
            return (
              <AnyReactComponent
                lat={place.latitude}
                lng={place.longtitude}
                key={place.photoNo}
              />
            );
          });
        })}
      </GoogleMapReact>
    </div>
  );
};

export default BoardDetailMap;
