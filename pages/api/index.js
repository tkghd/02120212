export default function handler(req, res) {
  res.status(200).json({
    name: "TK Global Bank API",
    version: "1.0.0",
    count: 22
  });
}
