class Person
  attr_accessor :name, :friend, :visited

  def initialize(name)
    @name = name
    @friends = []
    @visited = false
  end

  def add_friend(name)
    @friends << name
  end

  def display_network
    # We keep track of every node we ever visit, so we can reset their
    # ‘visited’ attribute back to false after our algorithm is complete:

    # Keep track of every node visited in order to complete[welf]
    queue = [self]
  end
end