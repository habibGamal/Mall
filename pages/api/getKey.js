
export default function handler(req, res) {
    const cookie = req.cookies;
    res.status(200).json(cookie);
}
  
  export const config = {
    api: {
      externalResolver: true,
    },
  }