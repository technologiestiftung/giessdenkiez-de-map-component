import { getLayers } from './layer';

const test_trees = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [13.50213, 52.645680000000006] },
      properties: { id: 'nt240620302094', radolan_sum: 43.9, age: 2 },
    },
  ],
};

const test_pumps = {
  type: 'FeatureCollection',
  features: [
    {
      id: '0',
      type: 'Feature',
      properties: {
        'addr:full': 'Schragenfeldstraße 25',
        check_date: 'unbekannt',
        id: 352734260,
        image: 'File:Plumpe 11 Marzahn Schragenfeldstraße-Bäckerpfuhl (8).jpg',
        'pump:status': 'unbekannt',
        'pump:style': 'Borsig',
      },
      geometry: {
        type: 'Point',
        coordinates: [13.564219, 52.5398067],
      },
    },
  ],
};

const test_rain = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [13.4971096103036, 52.6543762343589],
            [13.5042366641048, 52.6541120206218],
            [13.5033652084477, 52.64547732806],
            [13.4891325166817, 52.6460049371748],
            [13.4900002353473, 52.654638719058],
            [13.4971096103036, 52.6543762343589],
          ],
        ],
      },
      properties: {
        id: 1,
        data: [571],
      },
    },
  ],
};

const test_res = "[{\"props\":{\"id\":\"tree\",\"pickable\":true,\"stroked\":true,\"filled\":true,\"extruded\":true,\"visible\":true,\"opacity\":1,\"getRadius\":3,\"pointRadiusMinPixels\":0.5,\"getLineColor\":[247,105,6,255],\"autoHighlight\":true,\"highlightColor\":[200,200,200,255],\"updateTriggers\":{\"getLineWidth\":[\"\"]}},\"id\":\"tree\",\"count\":0,\"lifecycle\":\"Awaiting state\",\"parent\":null,\"context\":null,\"state\":null,\"internalState\":null},{\"props\":{\"id\":\"pumps\",\"pickable\":true,\"stroked\":true,\"filled\":true,\"extruded\":true,\"visible\":false,\"opacity\":1,\"getRadius\":9,\"pointRadiusMinPixels\":4,\"getLineColor\":[0,0,0,200],\"getLineWidth\":3,\"lineWidthMinPixels\":1.5},\"id\":\"pumps\",\"count\":1,\"lifecycle\":\"Awaiting state\",\"parent\":null,\"context\":null,\"state\":null,\"internalState\":null},{\"props\":{\"id\":\"rain\",\"pickable\":true,\"stroked\":false,\"filled\":true,\"extruded\":true,\"wireframe\":true,\"visible\":false,\"opacity\":0.95,\"getElevation\":1,\"getRadius\":9,\"pointRadiusMinPixels\":4,\"getLineColor\":[0,0,0,200],\"getLineWidth\":3,\"lineWidthMinPixels\":1.5},\"id\":\"rain\",\"count\":2,\"lifecycle\":\"Awaiting state\",\"parent\":null,\"context\":null,\"state\":null,\"internalState\":null}]"

describe('DeckGL Layer Genration Function', () => {
  test('get all layers not mobile', () => {
    expect(
      JSON.stringify(
        getLayers(
          false,
          () => {},
          true,
          false,
          false,
          test_trees,
          test_pumps,
          test_rain,
          '',
          () => {},
          () => {}
        )
      )
    ).toBe(test_res);
  });
});
