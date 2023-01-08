const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const { nanoid } = require("nanoid");
const { events, locations, users, participants } = require("./data.js");

const typeDefs = gql`
  # Event
  type Event {
    id: Int
    title: String
    desc: String
    date: String
    from: String
    to: String
    location_id: Int
    user_id: Int
    user: [User]!
    participant: [Participant]!
    location: [Location]!
  }
  input addEventInput {
    title: String!
    desc: String!
    date: String!
    from: String
    to: String
    location_id: Int
    user_id: Int
  }
  input updateEventInput {
    title: String!
    desc: String!
    date: String!
    from: String
    to: String
    location_id: Int
    user_id: Int
  }
  # Location
  type Location {
    id: Int
    name: String
    desc: String
    lat: Float
    lng: Float
  }
  input addLocationInput {
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }
  input updateLocationInput {
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }
  # User
  type User {
    id: ID!
    username: String!
    email: String!
  }

  input addUserInput {
    username: String!
    email: String!
  }
  input updateUserInput {
    username: String
    email: String
  }

  # Participant
  type Participant {
    id: Int
    user_id: Int
    event_id: Int
  }
  input addParticipantInput {
    user_id: Int!
    event_id: Int!
  }
  input updateParticipantInput {
    user_id: Int
    event_id: Int
  }

  type deleteAllOutput {
    count: Int!
  }
  type Query {
    # Events
    events: [Event!]!
    event(id: Int!): Event!
    # Locations
    locations: [Location]!
    location(id: Int!): Location!
    # Users
    users: [User]!
    user(id: Int!): User!
    # Participants
    participants: [Participant]
    participant(id: Int!): Participant!
  }
  type Mutation {
    # User
    addUser(data: addUserInput): User!
    updateUser(id: ID!, data: updateUserInput): User!
    deleteUser(id: ID): User!
    deleteAllUsers: deleteAllOutput!
    # Event
    addEvent(data: addEventInput): Event!
    updateEvent(id: ID!, data: updateEventInput): Event!
    deleteEvent(id: ID): Event!
    deleteAllEvents: deleteAllOutput!
    # Location
    addLocation(data: addLocationInput): Location!
    updateLocation(id: ID!, data: updateLocationInput): Location!
    deleteLocation(id: ID): Location!
    deleteAllLocations: deleteAllOutput!
    # Participant
    addParticipant(data: addParticipantInput): Participant!
    updateParticipant(id: ID!, data: updateParticipantInput): Participant!
    deleteParticipant(id: ID): Participant!
    deleteAllParticipants: deleteAllOutput!
  }
`;
const resolvers = {
  Query: {
    // Events
    events: () => events,
    event: (parent, args) => events.find((item) => item.id == args.id),
    // Locations
    locations: () => locations,
    location: (parent, args) => locations.find((item) => item.id == args.id),
    // Users
    users: () => users,
    user: (parent, args) => users.find((item) => item.id == args.id),
    // Participants
    participants: () => participants,
    participant: (parent, args) => {
      return participants.find((item) => item.id == args.id);
    },
  },
  Event: {
    user: (parent, args) => users.filter((item) => item.id == parent.user_id),
    participant: (parent, args) =>
      participants.filter((item) => item.event_id == parent.location_id),
    location: (parent, args) =>
      locations.filter((item) => item.id == parent.location_id),
  },
  Mutation: {
    // User
    addUser: (parent, { data }) => {
      const user = { id: nanoid(), ...data };
      users.push(user);
      return user;
    },
    updateUser: (parent, { id, data }) => {
      const findex = users.findIndex((item) => item.id == id);
      if (findex === -1) {
        throw new Error("User not found");
      }
      users[findex] = { ...users[findex], ...data };
      return users[findex];
    },
    deleteUser: (parent, { id }) => {
      const findex = users.findIndex((item) => item.id == id);
      if (findex === -1) {
        throw new Error("User not found");
      }
      let user = users[findex];
      users.splice(findex, 1);
      return user;
    },
    deleteAllUsers: () => {
      const length = users.length;
      users.splice(0, length);
      return {
        count: length,
      };
    },
    // Event
    addEvent: (parent, { data }) => {
      const event = { id: nanoid(), ...data };
      events.push(event);
      return event;
    },
    updateEvent: (parent, { id, data }) => {
      const findex = events.findIndex((item) => item.id == id);
      if (findex === -1) {
        throw new Error("User not found");
      }
      events[findex] = { ...events[findex], ...data };
      return events[findex];
    },
    deleteEvent: (parent, { id }) => {
      const findex = events.findIndex((item) => item.id == id);
      if (findex === -1) {
        throw new Error("User not found");
      }
      let user = events[findex];
      events.splice(findex, 1);
      return user;
    },
    deleteAllEvents: () => {
      const length = events.length;
      events.splice(0, length);
      return {
        count: length,
      };
    },
    // Location
    addLocation: (parent, { data }) => {
      const location = { id: nanoid(), ...data };
      locations.push(location);
      return location;
    },
    updateLocation: (parent, { id, data }) => {
      const findex = locations.findIndex((item) => item.id == id);
      if (findex === -1) {
        throw new Error("User not found");
      }
      locations[findex] = { ...locations[findex], ...data };
      return locations[findex];
    },
    deleteLocation: (parent, { id }) => {
      const findex = locations.findIndex((item) => item.id == id);
      if (findex === -1) {
        throw new Error("User not found");
      }
      let location = locations[findex];
      locations.splice(findex, 1);
      return location;
    },
    deleteAllUsers: () => {
      const length = locations.length;
      locations.splice(0, length);
      return {
        count: length,
      };
    },
    // Participant
    addParticipant: (parent, { data }) => {
      const participant = { id: nanoid(), ...data };
      participants.push(participant);
      return participant;
    },
    updateParticipant: (parent, { id, data }) => {
      const findex = participants.findIndex((item) => item.id == id);
      if (findex === -1) {
        throw new Error("User not found");
      }
      participants[findex] = { ...participants[findex], ...data };
      return participants[findex];
    },
    deleteParticipant: (parent, { id }) => {
      const findex = participants.findIndex((item) => item.id == id);
      if (findex === -1) {
        throw new Error("User not found");
      }
      let participant = participants[findex];
      participants.splice(findex, 1);
      return participant;
    },
    deleteAllParticipants: () => {
      const length = participants.length;
      participants.splice(0, length);
      return {
        count: length,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
});

server
  .listen()
  .then(({ url }) => {
    console.log(`🚀 Server Running on ${url}`);
  })
  .catch((err) => console.log(err));
