const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID
} = require('graphql');
const _ = require('lodash');

// Define TaskType
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString }
    project: {
      type: ProjectType, // Specify the type to ProjectType
      resolve(parent, args) {
        return projects.find(project => project.id === parent.projectId);
      }
    }
  })
});

// Project Type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID }, // Change type to GraphQLID
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString }
    tasks: {
      type: new GraphQLList(TaskType), // Specify the type to a list of TaskType
      resolve(parent, args) {
        return tasks.filter(task => task.projectId === parent.id);
      }
    }
  })
});

// Dummy data
const tasks = [
  { id: '1', title: 'Create your first webpage', weight: 1, description: 'Create your first HTML file 0-index.html with: -Add the doctype on the first line (without any comment) -After the doctype, open and close a html tag Open your file in your browser (the page should be blank)' },
  { id: '2', title: 'Structure your webpage', weight: 1, description: 'Copy the content of 0-index.html into 1-index.html Create the head and body sections inside the html tag, create the head and body tags (empty) in this order' }
];

const projects = [
  { id: '1', title: 'Advanced HTML', weight: 1, description: '...' },
  { id: '2', title: 'Bootstrap', weight: 1, description: '...' }
];

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: {
        id: { type: GraphQLString }
      },
  
  project: {
  type: ProjectType,
    args: {
      id: { type: GraphQLID } // Change type to GraphQLID
      },
      resolve(parent, args) {
        return projects.find(project => project.id === args.id);
      }
    }
  
    resolve(parent, args) {
        // Code to get task from database
        // Dummy data for now
        return tasks.find(task => task.id === args.id);
      }
    },
    projects: {
      type: new GraphQLList(ProjectType), // Add new field projects of type GraphQLList of ProjectType
      resolve(parent, args) {
        return projects;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});

