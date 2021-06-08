# Collaborative-Coding-IDE

## Getting Started

Clone the repository:

```
git clone https://github.com/tushargoyal22/Collaborative-Coding-IDE
```

and install the dependencies

```
npm install
```

#### MongoDB

The project uses MongoDB as a database. Install [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)

#### Docker

The project uses Docker containers to run the user provided source files.

Make sure that you have docker installed. Run the `createimage.sh` script and it will create a docker image according to the commands given in the `Dockerfile` which will be used to create the docker containers.

### Run the Application

The project is preconfigured with a simple development web server.

The simplest way to start this server is:
`npm start`

- Open [http://localhost:3000](http://localhost:3000/) and take a look around.
