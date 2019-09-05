const { Router } = require("express");

const SessionController = require("./controllers/session/index");
const MessageController = require("./controllers/message/index");

const routes = new Router();

routes.get("/sessions", SessionController.index);
routes.post("/sessions", SessionController.store);

routes.get("/messages", MessageController.index);
routes.post("/messages", MessageController.store);

module.exports = routes;
