import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiHandler } from "next";
const ironOptions = {
  cookieName: "myapp_cookiename",
  password: "complex_password_at_least_32_characters_long",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
export default function withSession(handler) {
    return withIronSessionApiRoute(handler, ironOptions);
}