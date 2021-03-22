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
    coordinates: number[] | number[][];
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
//Layer
export type SetLayer = (layer: string) => void;

//Color.ts
export type RGBAColor = [number, number, number, number];
export type RGBColor = [number, number, number];

export interface Color {
  name: string;
  hex: string;
  rgba: RGBAColor;
  cmyk: RGBAColor;
  hsb: RGBColor;
  hsl: RGBColor;
  lab: RGBColor;
}
