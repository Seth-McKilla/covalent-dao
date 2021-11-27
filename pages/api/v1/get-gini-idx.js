export default function handler(req, res) {
  const data = {
    "giniIdx": 0.9978383282475679,
  };

  res.status(200).json({ ...data });
}
