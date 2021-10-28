import daoList from "../../../constants/daoList";
import _ from "lodash";

export default async function handler(req, res) {
  const { daoTicker } = req.query;
  const dao = _.find(daoList, { contractTicker: _.toUpper(daoTicker) });

  try {
    const response = await fetch(
      `https://api.covalenthq.com/v1/${dao.chainId}/tokens/${dao.contractAddress}/token_holders/?key=${process.env.COVALENT_API_KEY}`
    );
    const { data } = await response.json();

    return res.json(data.items);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}
