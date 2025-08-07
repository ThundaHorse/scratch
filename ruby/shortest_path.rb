class City
  attr_accessor :name, :routes

  def initialize(name)
    @name = name
    @routes = {}
  end

  def add_route(city, price)
    @routes[city] = price
  end
end

atlanta = City.new("Atlanta")
boston = City.new("Boston")
chicago = City.new("Chicago")
denver = City.new("Denver")
el_paso = City.new("El Paso")

atlanta.add_route(boston, 100)
atlanta.add_route(denver, 160)
boston.add_route(chicago, 120)
boston.add_route(denver, 180)
chicago.add_route(el_paso, 80)
denver.add_route(chicago, 40)
denver.add_route(el_paso, 140)

def dijkstra(starting_city, other_cities)
  # The routes_from_city hash table below holds the data of all price_infos
  routes_from_city = {}

  # {city => [price, other city which immediately precedes this city
  # along the path from the original city]}
  # {atlanta => [0, nil], boston => [100, atlanta], chicago => [200, denver],
  # denver => [160, atlanta], el_paso => [280, chicago]}

  # Since it costs nothing to get to the starting city from the starting city:
  routes_from_city[starting_city] = [0, starting_city]

  # When initializing our data, we set up all other cities having an
  # infinite cost - since the cost and the path to get to each other city
  # is currently unknown:
  other_cities.each do | city |
    routes_from_city[city] = [Float::INFINITY, nil]
  end

  # We keep track of which cities we visited in this array:
  visited_cities = []
  # We begin visiting the starting city by making it the current_city:
  current_city = starting_city

  while current_city
    # visit the first city
    visited_cities << current_city

    # check each route from the current city:
    current_city.routes.each do | city, price_info |
      # If the route from the starting city to the other city
      # is cheaper than currently recorded in routes_from_city, we update it:
      if routes_from_city[city][0] > price_info + routes_from_city[current_city][0]
        routes_from_city[city] = [price_info + routes_from_city[current_city][0], current_city]
      end
    end

    # We determine which city to visit next:
    current_city = nil
    cheapest_route_from_current_city = Float::INFINITY

    # We check all available routes:
    routes_from_city.each do |city, price_info|
      # if this route is the cheapest from this city, and it has not yet been
      # visited, it should be marked as the city we’ll visit next:
      if price_info[0] < cheapest_route_from_current_city && !visited_cities.include?(city)
        cheapest_route_from_current_city = price_info[0]
        current_city = city
      end
    end
  end

  return routes_from_city
end

routes = dijkstra(atlanta, [boston, chicago, denver, el_paso])
routes.each do |city, price_info|
  p "#{city.name}: #{price_info[0]}"
end