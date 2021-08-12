import React from 'react';
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@material-ui/icons/Room';

const AnyReactComponent = () => <RoomIcon />;

const BoardDetailMap = ({ stories }) => {
  const defaultProps = {
    //   맨 처음 지도 위치 설정
    center: {
      lat: 33.492269071672496,
      lng: 126.53945522035214,
    },
    zoom: 11,
  };

  const renderPolylines = (map, maps, stories) => {
    stories.forEach((story) => {
      const flightPlanCoordinates = story.places.map((place) => {
        return {
          lat: +place.lat,
          lng: +place.lng,
        };
      });

      const flightPath = new maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 3,
      });
      flightPath.setMap(map);
    });
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onGoogleApiLoaded={({ map, maps }) => {
          renderPolylines(map, maps, stories);
        }}
        yesIWantToUseGoogleMapApiInternals
      >
        {stories.map((story) => {
          return story.places.map((place) => {
            return (
              <AnyReactComponent
                lat={place.lat}
                lng={place.lng}
                key={place.lat}
              />
            );
          });
        })}
      </GoogleMapReact>
    </div>
  );
};

export default BoardDetailMap;
