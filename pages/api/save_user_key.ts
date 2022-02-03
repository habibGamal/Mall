import withSession from "../../lib/withSession";


async function handler(req, res) {

    req.session.userKey = req.body.key;
    await req.session.save();
    res.send({ key: req.session.userKey });
}

export default withSession(handler);

