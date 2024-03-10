const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID } = require('graphql');

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
  })
});

// RootQuert for the TaskType
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return _.find(tasks, { id: args.id });
      }
    },
    
    }
});

const schema = new GraphQLSchema({
  query: RootQuery
  
});

module.exports = schema;
