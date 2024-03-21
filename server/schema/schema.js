const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList, // Add this import for GraphQLList
  GraphQLNonNull
} = require('graphql');
const _ = require('lodash');

// Import Project and Task models
const Project = require('../models/project');
const Task = require('../models/task');

// Define TaskType
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    project: {
      type: ProjectType,
      resolve(parent, args) {
        return projects.find(project => project.id === parent.projectId);
      }
    }
  })
});

// Define ProjectType
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent, args) {
        return tasks.filter(task => task.projectId === parent.id);
      }
    }
  })
});

// Dummy data
const tasks = [
  { id: '1', projectId: "1", title: 'Create your first webpage', weight: 1, description: "Create your first HTML file 0-index.html with: -Add the doctype on the first line (without any comment) -After the doctype, open and close a html tag Open your file in your browser (the page should be blank)" },
  { id: '2', projectId: "2", title: 'Structure your webpage', weight: 1, description: "Copy the content of 0-index.html into 1-index.html Create the head and body sections inside the html tag, create the head and body tags (empty) in this order" }
];

const projects = [
  { id: '1', title: 'Advanced HTML', weight: 1, description: "Welcome to the Web Stack specialization. The 3 first projects will give you all basics of the Web development: HTML, CSS and Developer tools. In this project, you will learn how to use HTML tags to structure a web page. No CSS, no styling - don't worry, the final page will be “ugly” it's normal, it's not the purpose of this project. Important note: details are important! lowercase vs uppercase / wrong letter… be careful!" },
  { id:'2', title: 'Bootstrap', weight: 1, description: "Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS and JavaScript design templates for typography, forms, buttons, navigation, and other interface components."}
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
      resolve(parent, args) {
        // Code to get task from database
        // Dummy data for now
        //return tasks.find(task => task.id === args.id);
        return Task.findById(args.id)
      }
    },
    project: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Project.findById(args.id);
      }
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find({});
      }
    },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent, args) {
        return Task.find({});
    }
  }

  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProject: {
      type: ProjectType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString)},
        weight: { type: new GraphQLNonNull(GraphQLInt)},
        description: { type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parent, args) {
        //create a new Project instance
        const newProject = new Project({
          title: args.title,
          weight: args.weight,
          description: args.description
        });
        //Save the new project to the database
        return newProject.save();
      }
    },
    addTask: {
      type: TaskType, 
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        projectId: { type: new GraphQLNonNull(GraphQLString) } // Assuming project ID is required
      },
      resolve(parent, args) {
        // Create a new Task instance
        const newTask = new Task({
          title: args.title,
          weight: args.weight,
          description: args.description,
          projectId: args.projectId
        });

        // Save the new task to the database
        return newTask.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation // Add this line to include Mutation in the schema
});
