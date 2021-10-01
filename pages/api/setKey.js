// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.setHeader('Set-Cookie', ['key='+req.body.key+'; path=/; HttpOnly']);
  // console.log(req.body);
  res.status(200).json();
}

export const config = {
  api: {
    externalResolver: true,
  },
}