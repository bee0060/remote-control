/**
 * 
 * Services:
 * 
 * address:     /input
 * use socket.
 * 
 * address:     /
 * main page, list data table.
 */
const WEB_SOCKET_PORT = 6200;
const SERVER_PORT = 6100;

const Koa = require("koa");
const fs = require("fs");
const WebSocket = require("ws");
const path = require('path');

const server = new Koa();
const serve = require('koa-static');


// create the WebSocket connection.
const wsServer = new WebSocket.Server({
  port: WEB_SOCKET_PORT
});

let controlledInstance;

wsServer.on("connection", ws => {
  controlledInstance = ws;
  ws.on("message", message => {
    console.log("===> ", message);
    ws.send(message);
  });
});

const publicFiles = serve(path.join(__dirname, '../client'), { extensions: ['html'] });
publicFiles._name = 'static /client';
server.use(publicFiles);

/**
 * WebSocket automatically sends the message text to main.html
 * /input?command=yourCommand
 */
server.use(async (context, next) => {
  if (context.request.path.startsWith('/input')) {
    commandHandler(context, next)
  } else {
    await next();
  }
});

server.use(async (context) => {
  context.response.body = "<h1>Page not found!</h1>";
});

server.listen(SERVER_PORT);

const validCommands = ['UP', 'DOWN', 'LEFT', 'RIGHT'];

function commandHandler(context, next) {
  const command = context.request.query.command;
  if (!validCommands.includes(command.toLocaleUpperCase())) {
    next();
  }

  controlledInstance && controlledInstance.send(command);
  console.log('Received command from input:', command)
  context.response.body = 'Success';
  context.response.status = 200;
}

console.log('server startup!')