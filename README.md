## What is this? 

This application was created for pta admins, to be able manage organisation (manage users, see reports, etc).

## Technologies
  
This application was created with React 18. We don't use create-react-app. So, you need to use Webpack (we already have configs for it, see details below). Please be sure that you have installed Webpack cli locally (run npm install --save-dev webpack). 
For application state management we use Redux Toolkit. 
For unit testing – Jest and React testing library.  
For styling – Material UI and Styled components. 
Full list of libraries and dependencies see on the file package.json ('dependencies’ and ‘devDependencies’). 
For routing – React router. 
For auth – MSAL.js 

## How to  

## Application start:  

1. You need to install all dependencies via npm i 
2. Afterthat you need to initialize tinymce via npm run "postinstall-tiny-mce" 
3. Run npm start. It will run applications on local server, on 4000 port. Underhood it runs webpack server with dev config. Note: you mustn't have any applications that were run in the time 4000 port, otherwise you will have an error. Application will be available on http://localhost:4000 

## Application build: 

You need to run npm run build. It will run underhood webpack with production config. After that you will have ‘dist’ directory, on the folder you will have production bundles that will be used when application is deployed. 
 
## Application testing: 

To be sure that the application satisfies existing business requirements or wasn't broken run npm run test. It will run unit tests and generate reports. You will find the report on ‘reports’ folder.  
 
## Application linting:  

To support one code style and prettify your code base we are using Eslint and prettier. To run linter npm run lint. It will show warnings, errors and file path where do you have a problem. Using this is not necessary but better to run time to time. 
 
## Application containerization: 

You need to have on your machine docker and docker-compose run docker-compose up (if you want just to run on docker image, if you want to rebuild docker image run docker-compose up –-build). Note: you mustn't have any applications that were running in the time 4000 port, otherwise you will have an error. Application will be available on http://localhost:4000 
Rules for Docker described on Dockerfile 
