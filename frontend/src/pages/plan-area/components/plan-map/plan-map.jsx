import React from 'react';
import GoogleMapReact from 'google-map-react';

const PlanMap = () => {
  const defaultProps = {
    center: {
      lat: 33.492269071672496,
      lng: 126.53945522035214,
    },
    zoom: 11,
  };

  return (
    <div style={{ height: '30%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
      ></GoogleMapReact>
    </div>
  );
};

export default PlanMap;
