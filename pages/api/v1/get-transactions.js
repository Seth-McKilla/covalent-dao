export default function handler(req, res) {
  const data = {
    "transactions": [
      {
        "date": "10/23",
        "transactions": 3,
      },
      {
        "date": "10/24",
        "transactions": 16,
      },
      {
        "date": "10/25",
        "transactions": 10,
      },
      {
        "date": "10/26",
        "transactions": 12,
      },
      {
        "date": "10/27",
        "transactions": 14,
      },
      {
        "date": "10/28",
        "transactions": 2,
      },
      {
        "date": "10/29",
        "transactions": 7,
      },
      {
        "date": "10/30",
        "transactions": 1,
      },
      {
        "date": "10/31",
        "transactions": 11,
      },
      {
        "date": "11/01",
        "transactions": 11,
      },
      {
        "date": "11/02",
        "transactions": 8,
      },
      {
        "date": "11/03",
        "transactions": 9,
      },
      {
        "date": "11/04",
        "transactions": 2,
      },
      {
        "date": "11/05",
        "transactions": 5,
      },
      {
        "date": "11/06",
        "transactions": 12,
      },
      {
        "date": "11/07",
        "transactions": 7,
      },
      {
        "date": "11/08",
        "transactions": 11,
      },
      {
        "date": "11/09",
        "transactions": 4,
      },
      {
        "date": "11/10",
        "transactions": 6,
      },
      {
        "date": "11/11",
        "transactions": 6,
      },
      {
        "date": "11/12",
        "transactions": 5,
      },
      {
        "date": "11/13",
        "transactions": 6,
      },
      {
        "date": "11/14",
        "transactions": 8,
      },
      {
        "date": "11/15",
        "transactions": 7,
      },
      {
        "date": "11/16",
        "transactions": 8,
      },
      {
        "date": "11/17",
        "transactions": 4,
      },
      {
        "date": "11/18",
        "transactions": 6,
      },
      {
        "date": "11/19",
        "transactions": 1,
      },
      {
        "date": "11/20",
        "transactions": 9,
      },
      {
        "date": "11/21",
        "transactions": 10,
      },
      {
        "date": "11/22",
        "transactions": 3,
      },
      {
        "date": "11/23",
        "transactions": 7,
      },
      {
        "date": "11/24",
        "transactions": 6,
      },
      {
        "date": "11/25",
        "transactions": 2,
      },
      {
        "date": "11/26",
        "transactions": 5,
      },
      {
        "date": "11/27",
        "transactions": 6,
      },
    ],
  };

  res.status(200).json({ ...data });
}
