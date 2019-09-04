require("dotenv/config");

const express = require("express");
const Youch = require("youch");
const cors = require("cors");
const http = require("http");
const io = require("socket.io");

require("express-async-errors");

const routes = require("./routes");

require("./database");

class App {
    constructor() {
        this.server = express();
        this.httpServer = http.Server(this.server);
        this.socket = io(this.httpServer);

        this.middlewares();
        this.routes();
        this.exceptionHandler();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(cors());
        this.server.use((req, res, next) => {
            req.socket = this.socket;

            next();
        });
    }

    routes() {
        this.server.use(routes);
    }

    exceptionHandler() {
        this.server.use(async (err, req, res, next) => {
            if (process.env.NODE_ENV === "development") {
                const errors = await new Youch(err, req).toJSON();
                return res.status(500).json(errors);
            }

            return res.status(500).json({ error: "Internal server error." });
        });
    }
}

module.exports = new App().httpServer;
