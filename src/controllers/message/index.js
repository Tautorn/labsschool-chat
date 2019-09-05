const Message = require("../../schemas/Message");
const storeValidation = require("./validation");
const Session = require("../../schemas/Session");
const mongoose = require("mongoose");

class MessageController {
    async index(_, res) {
        let messages = await Message.find()
            .sort({ createdAt: "desc" })
            .limit(30);

        return res.json(messages);
    }

    async store(req, res) {
        if (!(await storeValidation.isValid(req.body)))
            return res
                .status(400)
                .json({ error: "Required fields was not informed." });

        const { sessionId, content } = req.body;
        if (!mongoose.Types.ObjectId.isValid(sessionId))
            return res.status(400).json({ error: "SessionId is not valid." });

        const sessionExists = await Session.findById(sessionId);

        if (!sessionExists)
            return res.status(404).json({
                error: "Session does't exist."
            });

        const { name: userName } = sessionExists;
        const message = await Message.create({
            sessionId,
            content,
            userName
        });

        req.socket.emit("newMessage", message);

        return res.json(message);
    }
}

module.exports = new MessageController();
