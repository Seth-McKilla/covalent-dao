export default function handler(req, res) {
  const data = {
    negative: "2.0",
    neutral: "45.0",
    positive: "22.0",
  };

  res.status(200).json({ ...data });
}
