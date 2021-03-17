import { RGBAColor } from '@deck.gl/core';
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
  HoveredPump,
  SetHoveredPump,
} from './types';

import { pumpColors } from './colors';

const getTreeFill = (radolan: number): RGBAColor => {
  const scale = scaleLinear().domain([0, 300]).range([1, 0.6]);
  const hex = interpolateViridis(scale(radolan)).substr(1).match(/.{2}/g);

  return [
    parseInt(hex[0], 16),
    parseInt(hex[1], 16),
    parseInt(hex[2], 16),
    200,
  ];
};

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

  hoveredPump: HoveredPump,
  setHoveredPump: SetHoveredPump
): GeoJsonLayer<Feature, GeoJsonLayerProps<Feature>>[] => {
  const getTreeLayer = (): GeoJsonLayer<
    TreeFeature,
    GeoJsonLayerProps<TreeFeature>
  > => {
    return new GeoJsonLayer({
      id: 'tree',
      data: trees.features as TreeFeature[],

      pickable: true,
      stroked: true,
      filled: true,
      extruded: true,

      visible: showTrees,
      opacity: 1,

      getFillColor: tree => getTreeFill(tree.properties.radolan_sum),
      getRadius: 3,
      pointRadiusMinPixels: 0.5,

      getLineColor: [247, 105, 6, 255],
      getLineWidth: tree => {
        if (selectedTree && tree.properties.id == selectedTree) return 1;
        else return 0;
      },

      autoHighlight: true,
      highlightColor: [200, 200, 200, 255],

      onClick: ({ object: tree }) => {
        setSelectedTree(tree.properties.id);
        onViewStateChange(transitionViewState(tree, isMobile));
      },

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

  const layers = [getTreeLayer(), getPumpLayer()];

  return layers;
};
