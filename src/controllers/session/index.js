const Session = require("../../schemas/Session");
const storeValidation = require("./validation");

class SessionController {
    async index(_, res) {
        const sessions = await Session.find()
            .sort({ createdAt: "desc" })
            .limit(30);

        return res.json(sessions);
    }

    async store(req, res) {
        if (!(await storeValidation.isValid(req.body)))
            return res
                .status(400)
                .json({ error: "Required fields was not informed." });

        const session = await Session.create({
            name: req.body.name
        });

        return res.json(session);
    }
}

module.exports = new SessionController();
