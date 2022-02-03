import withSession from "../../lib/withSession";

async function saveUserInfo(req, res) {
  
  req.session.auth = req.body;
  await req.session.save();
  res.send();
}

export default withSession(saveUserInfo);