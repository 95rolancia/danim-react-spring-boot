import React from 'react';
import GoogleMapReact from 'google-map-react';
import NumberMarker from '../number-marker/number-marker';
import { markerColor } from '../../util/marker-color';

const BoardDetailMap = ({ stories, lat, lng }) => {
  if (lat === null && lng === null) {
    lat = stories.substories[0].photos[0].latitude;
    lng = stories.substories[0].photos[0].longtitude;
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
    <div style={{ height: '50%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        center={{ lat, lng }}
        zoom={12}
        onGoogleApiLoaded={({ map, maps }) => {
          renderPolylines(map, maps, stories);
        }}
        yesIWantToUseGoogleMapApiInternals
      >
        {stories.substories.map((story, idx) => {
          return story.photos.map((place, i) => {
            return (
              <NumberMarker
                number={i + 1}
                color={markerColor[idx]}
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
