// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from "iron-session/next";
const ironOptions = {
  cookieName: "myapp_cookiename",
  password: "complex_password_at_least_32_characters_long",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
export default withIronSessionApiRoute(handler, ironOptions);
async function handler(req, res) {

  // get user from database then:
  // req.session.user = {
  //   id: 230,
  //   admin: true,
  // };
  // await req.session.save();
  res.send({ test: 'saved' });
}
