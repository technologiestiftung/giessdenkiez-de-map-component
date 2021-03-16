import React, { FC, useState } from 'react';
// import MapGL from './mapGL';
import MapLayer from './mapLayer';
import MapControls from './mapControls';

import { ViewState } from './types';

const initialViewState: ViewState = {
  bearing: 0,
  latitude: 52.500869,
  longitude: 13.419047,
  maxZoom: 19,
  minZoom: 9,
  pitch: 45,
  zoom: 11,
};

const Map: FC = () => {
  const [viewState, setViewState] = useState(initialViewState);

  const onViewStateChange = (e: { viewState: ViewState }) =>
    setViewState({ ...viewState, ...e.viewState });

  return (
    <MapLayer viewState={viewState} onViewStateChange={onViewStateChange} />
  );
};

export default Map;
