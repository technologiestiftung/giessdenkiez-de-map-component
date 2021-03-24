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

describe('DeckGL Layer Genration Function', () => {
  test('get all layers not mobile', () => {
    expect(
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
    ).toMatchInlineSnapshot(`
      Array [
        GeoJsonLayer {
          "context": null,
          "count": 0,
          "id": "tree",
          "internalState": null,
          "lifecycle": "Awaiting state",
          "parent": null,
          "props": Object {
            "autoHighlight": true,
            "extruded": true,
            "filled": true,
            "getFillColor": [Function],
            "getLineColor": Array [
              247,
              105,
              6,
              255,
            ],
            "getLineWidth": [Function],
            "getRadius": 3,
            "highlightColor": Array [
              200,
              200,
              200,
              255,
            ],
            "id": "tree",
            "onClick": [Function],
            "opacity": 1,
            "pickable": true,
            "pointRadiusMinPixels": 0.5,
            "stroked": true,
            "updateTriggers": Object {
              "getLineWidth": Array [
                "",
              ],
            },
            "visible": true,
            Symbol(component): [Circular],
            Symbol(asyncPropOriginal): Object {},
            Symbol(asyncPropResolved): Object {
              "data": Array [
                Object {
                  "geometry": Object {
                    "coordinates": Array [
                      13.50213,
                      52.645680000000006,
                    ],
                    "type": "Point",
                  },
                  "properties": Object {
                    "age": 2,
                    "id": "nt240620302094",
                    "radolan_sum": 43.9,
                  },
                  "type": "Feature",
                },
              ],
            },
          },
          "state": null,
        },
        GeoJsonLayer {
          "context": null,
          "count": 1,
          "id": "pumps",
          "internalState": null,
          "lifecycle": "Awaiting state",
          "parent": null,
          "props": Object {
            "extruded": true,
            "filled": true,
            "getFillColor": [Function],
            "getLineColor": Array [
              0,
              0,
              0,
              200,
            ],
            "getLineWidth": 3,
            "getRadius": 9,
            "id": "pumps",
            "lineWidthMinPixels": 1.5,
            "onHover": [Function],
            "opacity": 1,
            "pickable": true,
            "pointRadiusMinPixels": 4,
            "stroked": true,
            "visible": false,
            Symbol(component): [Circular],
            Symbol(asyncPropOriginal): Object {},
            Symbol(asyncPropResolved): Object {
              "data": Array [
                Object {
                  "geometry": Object {
                    "coordinates": Array [
                      13.564219,
                      52.5398067,
                    ],
                    "type": "Point",
                  },
                  "id": "0",
                  "properties": Object {
                    "addr:full": "Schragenfeldstraße 25",
                    "check_date": "unbekannt",
                    "id": 352734260,
                    "image": "File:Plumpe 11 Marzahn Schragenfeldstraße-Bäckerpfuhl (8).jpg",
                    "pump:status": "unbekannt",
                    "pump:style": "Borsig",
                  },
                  "type": "Feature",
                },
              ],
            },
          },
          "state": null,
        },
        GeoJsonLayer {
          "context": null,
          "count": 2,
          "id": "rain",
          "internalState": null,
          "lifecycle": "Awaiting state",
          "parent": null,
          "props": Object {
            "extruded": true,
            "filled": true,
            "getElevation": 1,
            "getFillColor": [Function],
            "getLineColor": Array [
              0,
              0,
              0,
              200,
            ],
            "getLineWidth": 3,
            "getRadius": 9,
            "id": "rain",
            "lineWidthMinPixels": 1.5,
            "opacity": 0.95,
            "pickable": true,
            "pointRadiusMinPixels": 4,
            "stroked": false,
            "visible": false,
            "wireframe": true,
            Symbol(component): [Circular],
            Symbol(asyncPropOriginal): Object {},
            Symbol(asyncPropResolved): Object {
              "data": Array [
                Object {
                  "geometry": Object {
                    "coordinates": Array [
                      Array [
                        Array [
                          13.4971096103036,
                          52.6543762343589,
                        ],
                        Array [
                          13.5042366641048,
                          52.6541120206218,
                        ],
                        Array [
                          13.5033652084477,
                          52.64547732806,
                        ],
                        Array [
                          13.4891325166817,
                          52.6460049371748,
                        ],
                        Array [
                          13.4900002353473,
                          52.654638719058,
                        ],
                        Array [
                          13.4971096103036,
                          52.6543762343589,
                        ],
                      ],
                    ],
                    "type": "Polygon",
                  },
                  "properties": Object {
                    "data": Array [
                      571,
                    ],
                    "id": 1,
                  },
                  "type": "Feature",
                },
              ],
            },
          },
          "state": null,
        },
      ]
    `);
  });
});
