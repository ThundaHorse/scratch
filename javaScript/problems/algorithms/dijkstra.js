class City {
  constructor(name) {
    this.name = name;
    this.routes = {};
  }

  addRoute(city, price) {
    this.routes[city.name] = price;
  }
}

const atlanta = new City('Atlanta');
const boston = new City('Boston');
const chicago = new City('Chicago');
const denver = new City('Denver');
const elPaso = new City('El Paso');

atlanta.addRoute(boston, 100);
atlanta.addRoute(denver, 160);
boston.addRoute(chicago, 120);
boston.addRoute(denver, 180);
chicago.addRoute(elPaso, 80);
denver.addRoute(chicago, 40);
denver.addRoute(elPaso, 140);

const dijkstra = (startingCity, otherCities) => {
  let routesFromCity = {};

  routesFromCity[startingCity.name] = [0, startingCity];

  otherCities.forEach((city) => {
    routesFromCity[city.name] = [Infinity, null];
  });

  let visitedCities = [];
  let currentCity = startingCity;

  while (currentCity) {
    visitedCities.push(currentCity);

    for (const [k, v] of Object.entries(currentCity.routes)) {
      if (routesFromCity[k] > v + routesFromCity[currentCity]) {
        routesFromCity[k] = [v + routesFromCity[currentCity], currentCity];
      }
    }

    currentCity = undefined;
    cheapestRouteFromCurrentCity = [Infinity, null];

    for (const [k, v] of Object.entries(routesFromCity)) {
      console.log(k, v);
      // if (v < cheapestRouteFromCurrentCity && !visitedCities.includes(k)) {
      //   cheapestRouteFromCurrentCity = v;
      //   currentCity = k;
      // }
    }
  }

  return routesFromCity;
};

const routes = dijkstra(atlanta, [boston, chicago, denver, elPaso]);
