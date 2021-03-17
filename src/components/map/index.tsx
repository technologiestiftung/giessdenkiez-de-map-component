import React, { FC, useState } from 'react';
// import MapGL from './mapGL';

import PumpHover from './pumpHover';
import MapLayer from './mapLayer';

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

  const [showTrees, setShowTrees] = useState(true);
  const [showPumps, setShowPumps] = useState(false);
  const [showRain, setShowRain] = useState(false);

  const [selectedTree, setSelectedTree] = useState(null);

  const [hoveredPump, setHoveredPump] = useState(null);

  const onViewStateChange = (e: { viewState: ViewState }) =>
    setViewState({ ...viewState, ...e.viewState });

  const setLayer = (layer: string) => {
    let showTrees = false,
      showPumps = false,
      showRain = false;

    switch (layer) {
      case 'trees':
        showTrees = true;
        break;
      case 'pumps':
        showPumps = true;
        break;
      case 'rain':
        showRain = true;
        break;
    }

    setShowTrees(showTrees);
    setShowPumps(showPumps);
    setShowRain(showRain);
  };

  console.log(hoveredPump);

  return (
    <>
      {hoveredPump && (
        <PumpHover
          message={hoveredPump.message}
          pointer={hoveredPump.pointer}
        />
      )}
      <MapLayer
        isMobile={false}
        viewState={viewState}
        onViewStateChange={onViewStateChange}
        showTrees={showTrees}
        showPumps={showPumps}
        showRain={showRain}
        setLayer={setLayer}
        selectedTree={selectedTree}
        setSelectedTree={setSelectedTree}
        hoveredPump={hoveredPump}
        setHoveredPump={setHoveredPump}
      />
    </>
  );
};

export default Map;
