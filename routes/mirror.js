export default function handler(req, res) {
  res.json({ mode: "READ_ONLY", data: "mirror snapshot" });
}
