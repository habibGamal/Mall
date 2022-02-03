import withSession from "../../lib/withSession";


function handler(req, res) {
    res.send(req.session.auth);
}

export default withSession(handler);

