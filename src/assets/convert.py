import csv, json
from geojson import Feature, FeatureCollection, Point

features = []
with open('trees.csv', newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    for row in reader:
    # for id, lng, lat, radolan_sum, age in reader:
        print(row)
        # latitude, longitude = map(float, (latitude, longitude))
        # features.append(
        #     Feature(
        #         geometry = Point((longitude, latitude)),
        #         properties = {
        #             'weather': weather,
        #             'temp': temp
        #         }
        #     )
        # )

collection = FeatureCollection(features)
with open("trees.json", "w") as f:
    f.write('%s' % collection)