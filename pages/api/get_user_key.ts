import withSession from "../../lib/withSession";


function handler(req, res) {
    res.send({ key: req.session.userKey });
}

export default withSession(handler);

