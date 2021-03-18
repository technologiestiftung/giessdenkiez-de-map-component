import { GeoJsonLayer, GeoJsonLayerProps } from '@deck.gl/layers';
import { scaleLinear, interpolateViridis, easeCubic as d3EaseCubic } from 'd3';
import { FlyToInterpolator } from 'react-map-gl';

import {
  FeatureCollection,
  Feature,
  TreeFeature,
  PumpFeature,
  RainFeature,
  OnViewStateChange,
  SetSelectedTree,
  SetHoveredPump,
} from './types';

import { pumpColors, getRainColor } from './colors';

const transitionViewState = (feature, isMobile) => {
  return {
    viewState: {
      latitude: feature.geometry.coordinates[1],
      longitude: feature.geometry.coordinates[0],
      zoom: 19,
      maxZoom: 19,
      transitionDuration: 2000,
      transitionEasing: d3EaseCubic,
      transitionInterpolator: new FlyToInterpolator(),
      minZoom: isMobile ? 11 : 9,
      pitch: isMobile ? 0 : 45,
      bearing: 0,
    },
  };
};

export const getLayers = (
  isMobile: boolean,

  onViewStateChange: OnViewStateChange,

  showTrees: boolean,
  showPumps: boolean,
  showRain: boolean,

  trees: FeatureCollection,
  pumps: FeatureCollection,
  rain: FeatureCollection,

  selectedTree: string,
  setSelectedTree: SetSelectedTree,

  setHoveredPump: SetHoveredPump
): GeoJsonLayer<Feature, GeoJsonLayerProps<Feature>>[] => {
  const getTreeLayer = (): GeoJsonLayer<
    TreeFeature,
    GeoJsonLayerProps<TreeFeature>
  > => {
    return new GeoJsonLayer({
      id: 'tree',
      data: trees.features as TreeFeature[],
      //Properties
      pickable: true,
      stroked: true,
      filled: true,
      extruded: true,
      //Visibility
      visible: showTrees,
      opacity: 1,
      //Filled
      /**
       * Tree Color is based on rain amounts
       * radolan_sum is an aggregated number of rain recieved
       */
      getFillColor: tree => getRainColor(tree.properties.radolan_sum),
      getRadius: 3,
      pointRadiusMinPixels: 0.5,
      //Stroke
      getLineColor: [247, 105, 6, 255],
      getLineWidth: tree => {
        if (selectedTree && tree.properties.id == selectedTree) return 1;
        else return 0;
      },
      //Hover
      autoHighlight: true,
      highlightColor: [200, 200, 200, 255],
      //Actions
      onClick: ({ object: tree }) => {
        setSelectedTree(tree.properties.id);
        onViewStateChange(transitionViewState(tree, isMobile));
      },
      //On what change to update
      updateTriggers: {
        getLineWidth: [selectedTree],
      },
    });
  };

  const getPumpLayer = (): GeoJsonLayer<
    PumpFeature,
    GeoJsonLayerProps<PumpFeature>
  > => {
    return new GeoJsonLayer({
      id: 'pumps',
      data: pumps.features as PumpFeature[],

      pickable: true,
      stroked: true,
      filled: true,
      extruded: true,

      visible: showPumps,
      opacity: 1,

      getFillColor: pump => {
        return pumpColors[pump.properties['pump:status']].rgba;
      },
      getRadius: 9,
      pointRadiusMinPixels: 4,

      getLineColor: [0, 0, 0, 200],
      getLineWidth: 3,
      lineWidthMinPixels: 1.5,

      onHover: ({ picked, x, y, object }) => {
        if (picked)
          setHoveredPump({
            pointer: [x, y],
            message: object.properties['pump:status'],
          });
        else setHoveredPump(null);
      },
    });
  };

  const getRainLayer = (): GeoJsonLayer<
    RainFeature,
    GeoJsonLayerProps<RainFeature>
  > => {
    return new GeoJsonLayer({
      id: 'rain',
      data: rain.features as RainFeature[],

      pickable: true,
      stroked: false,
      filled: true,
      extruded: true,
      wireframe: true,

      visible: showRain,
      opacity: 0.95,
      getElevation: 1,
      /**
       * Apparently DWD 1 is not 1ml but 0.1ml
       * We could change this in the database, but this would mean,
       * transferring 625.000 "," characters, therefore,
       * changing it client-side makes more sense.
       */
      getFillColor: rain => getRainColor(rain.properties.data[0] / 10),
      getRadius: 9,
      pointRadiusMinPixels: 4,

      getLineColor: [0, 0, 0, 200],
      getLineWidth: 3,
      lineWidthMinPixels: 1.5,

      // onHover: ({ picked, x, y, object }) => {
      //   if (picked)
      //     setHoveredPump({
      //       pointer: [x, y],
      //       message: object.properties['pump:status'],
      //     });
      //   else setHoveredPump(null);
      // },
    });
  };

  const layers = [getTreeLayer(), getPumpLayer(), getRainLayer()];

  return layers;
};
