import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import GoogleMapReact from 'google-map-react';
import usePlan from '../../../../hooks/usePlan';
import useSearch from '../../../../hooks/useSearch';
import { NumberMarker } from '../../../../components';
import { markerColor } from '../../../../util/marker-color';

const renderPolylines = (map, maps, subPlans) => {
  subPlans.forEach((plan, idx) => {
    const flightPlanCoordinates = plan.map((place) => {
      return {
        lat: +place.latitude,
        lng: +place.longtitude,
      };
    });

    const flightPath = new maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: markerColor[idx],
      strokeOpacity: 1.0,
      strokeWeight: 3,
    });
    flightPath.setMap(map);
  });
};

const PlanMap = observer(() => {
  const search = useSearch();
  const plan = usePlan();

  const defaultProps = {
    center: {
      lat: search.placeDetailInfo
        ? +toJS(search.placeDetailInfo).latitude
        : 33.49226,
      lng: search.placeDetailInfo
        ? +toJS(search.placeDetailInfo).longtitude
        : 126.53945,
    },
    zoom: 11,
  };
  console.log(toJS(plan.subPlans));
  return (
    <div style={{ height: '30%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onGoogleApiLoaded={({ map, maps }) => {
          renderPolylines(map, maps, toJS(plan.subPlans));
        }}
        yesIWantToUseGoogleMapApiInternals
        key={plan.subPlans}
      >
        {toJS(plan.subPlans).map((subPlan, idx) => {
          const a = subPlan.map((marker, i) => (
            <NumberMarker
              number={i + 1}
              key={i}
              lng={marker.longtitude}
              lat={marker.latitude}
              color={markerColor[idx]}
            />
          ));
          return a;
        })}
      </GoogleMapReact>
    </div>
  );
});

export default PlanMap;
