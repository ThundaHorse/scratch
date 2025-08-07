class Person
  attr_accessor :name, :friends, :visited

  def initialize(name)
    @name = name
    @friends = []
    @visited = false
  end

  def add_friend(friend)
    @friends << friend
  end

  def display_network
    # keep track of every node we ever visit, so we can reset their
    # ‘visited’ attribute back to false after our algorithm is complete
    to_reset = [self]

    # Create the queue. It starts out containing the root vertex
    queue = [self]
    self.visited = true

    while queue.any?
      current_vertetx = queue.shift
      puts current_vertetx.name

      # We add all adjacent vertices of the current vertex to the queue
      current_vertetx.friends.each do | friend |
        if !friend.visited
          to_reset << friend
          queue << friend
          friend.visited = true
        end
      end
    end

    # After the algorithm is complete, we reset each node’s visited attribute
    to_reset.each do | node |
      node.visited = false
    end
  end
end