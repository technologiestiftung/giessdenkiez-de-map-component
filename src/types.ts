import { GeoJsonLayer, GeoJsonLayerProps } from '@deck.gl/layers';
//ViewState
export interface ViewState {
  bearing: number;
  latitude: number;
  longitude: number;
  maxZoom: number;
  minZoom: number;
  pitch: number;
  zoom: number;
}
export type OnViewStateChange = (e: unknown) => void;
//GeoJson
export interface FeatureCollection {
  type: string;
  features: TreeFeature[] | PumpFeature[] | RainFeature[];
}
export interface Feature {
  type: string;
  geometry: {
    type: string;
    coordinates: number[] | [number, number][][];
  };
  properties: {
    id: string | number;
  };
}
//Tree
export interface TreeFeature extends Feature {
  properties: {
    id: string;
    radolan_sum?: number;
    age: number;
  };
}
export type SetSelectedTree = (id: string) => void;
//Pump
export interface PumpFeature extends Feature {
  properties: {
    id: number;
    'addr:full': string;
    check_date: string;
    image: string;
    'pump:status': string;
    'pump:style': string;
  };
}
export interface HoveredPump {
  message: string;
  pointer: number[];
}
export type SetHoveredPump = (info: HoveredPump) => void;
//Rain
export interface RainFeature extends Feature {
  properties: {
    id: number;
    data: number[];
  };
}
//Watered
export interface CommunityData {
  [key: string]: {
    watered: boolean;
    adopted: boolean;
  };
}
//Layer
export type SetLayer = (layer: string) => void;

export type Layer<FeatureType> = GeoJsonLayer<
  FeatureType,
  GeoJsonLayerProps<FeatureType>
>;

//App
export interface WhichLayer {
  showTrees: boolean;
  showWatered: boolean;
  showAdopted: boolean;
  showPumps: boolean;
  showRain: boolean;
}

export type WhichLayerReducer = (
  previousWhichLayer: WhichLayer,
  layer: string
) => WhichLayer;

export type AgeRange = [number, number];
