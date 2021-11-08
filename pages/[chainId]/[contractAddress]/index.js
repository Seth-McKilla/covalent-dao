import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../../utils/fetcher";
import daoList from "../../../constants/daoList";
import _ from "lodash";

// Mui
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { green, red, grey } from "@mui/material/colors";
// @ Icons
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupIcon from "@mui/icons-material/Group";

// Layout
import { DashboardLayout } from "../../../layouts";

// Components
import {
  PieChartSentiment,
  PieChartHolders,
  StatCard,
  LineGraph,
  Loader,
} from "../../../components";

// Utils
import { numbersWithCommas } from "../../../utils/numbers";

export default function DaoDashboard() {
  const {
    query: { chainId, contractAddress },
    isReady,
  } = useRouter();

  const dao = _.find(daoList, { contractAddress });

  // API Calls
  // @ Token Holders & Market Cap
  const { data: tokenHolders } = useSWR(
    isReady &&
      `/api/v1/get-token-holders?chainId=${chainId}&contractId=${contractAddress}&ticker=${dao.contractTicker}`,
    fetcher
  );

  // @ Spot Prices
  const { data: spotPrices } = useSWR(
    isReady && `/api/v1/get-spot-prices?ticker=${dao.contractTicker}`,
    fetcher
  );
  const [quoteRate, setQuoteRate] = useState(null);
  useEffect(() => {
    if (!spotPrices) return;
    const spotPrice = _.find(spotPrices.spot_prices, {
      "contract_address": contractAddress,
    });
    spotPrice && setQuoteRate(spotPrice.quote_rate);
  }, [spotPrices, contractAddress]);

  // @ Transactions
  const { data: transactionsByDate } = useSWR(
    isReady &&
      `/api/v1/get-transactions?chainId=${chainId}&contractId=${contractAddress}`,
    fetcher
  );

  // @ Sentiment Analysis
  const { data: sentiment } = useSWR(
    isReady &&
      `/api/v1/get-sentiment?keyword=${dao.contractName.replace("Token", "")}`,
    fetcher
  );

  // @ Gini Index
  const { data: gini } = useSWR(
    isReady &&
      `/api/v1/get-gini-idx?chainId=${chainId}&contractId=${contractAddress}&ticker=${dao.contractTicker}`,
    fetcher
  );

  const dataLoaded =
    !!tokenHolders &&
    !!spotPrices &&
    !!transactionsByDate &&
    !!sentiment &&
    !!gini;

  // Helper functions
  const getSentiment = (type) => {
    if (!sentiment) return 0;
    return Number(sentiment[type]);
  };

  return (
    <div>
      <Head>
        <title>Covalent DAO Dashboard</title>
        <meta name="description" content="DAO Analytics Dashboard" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DashboardLayout>
        <Grid item xs={12} mb={2}>
          {dao && (
            <div style={{ display: "flex" }}>
              <Image
                src={dao.logoUrl}
                height={50}
                width={50}
                alt={`${dao.contractName}-logo`}
              />
              <Typography variant="h4" align="left" ml={1}>
                {dao.contractName}
              </Typography>
            </div>
          )}
        </Grid>

        <Grid item xs={12}>
          {!dataLoaded ? (
            <Loader />
          ) : (
            <Grid container spacing={3} maxWidth="lg">
              <Grid item xs={3}>
                <PieChartSentiment
                  data={[
                    {
                      name: "Positive 😊",
                      value: getSentiment("positive"),
                      color: green[500],
                    },
                    {
                      name: "Negative 😢",
                      value: getSentiment("negative"),
                      color: red[500],
                    },
                    {
                      name: "Neutral 😐",
                      value: getSentiment("neutral"),
                      color: grey[600],
                    },
                  ]}
                  title="Sentiment Analysis"
                  tooltip="Calculates the sentiment of DAO using Twitter data. Restricted to 100 tweets for current version."
                />
              </Grid>
              <Grid item xs={3}>
                <StatCard
                  title={`Current Quote Rate of Asset (${dao.contractTicker})`}
                  value={`$${quoteRate}`}
                  valueColor={green[500]}
                  Icon={AttachMoneyIcon}
                  tooltip="The current quote rate for the DAO token."
                />
              </Grid>
              <Grid item xs={3}>
                <StatCard
                  title="Fully Diluted Market Capitalization"
                  value={`$${numbersWithCommas(
                    Number(tokenHolders.mkt_cap).toFixed(0)
                  )}`}
                  valueColor={green[500]}
                  Icon={AccountBalanceIcon}
                  tooltip="The market capitalization (valuation) if the max supply of a coin is in circulation. It is equal to Current Price x Max Supply."
                />
              </Grid>
              <Grid item xs={3}>
                <StatCard
                  title="Total Number of Members"
                  value={numbersWithCommas(tokenHolders.total_count)}
                  Icon={GroupIcon}
                  tooltip="The total number of members in the DAO."
                />
              </Grid>

              <Grid item xs={8}>
                <LineGraph
                  title="Overall Activity"
                  data={transactionsByDate.transactions}
                  color={green[500]}
                  keyX="date"
                  keyY="transactions"
                  tooltip="The number of transactions per day for the past 250 transactions."
                />
              </Grid>
              <Grid item xs={4}>
                <Grid
                  component={Paper}
                  container
                  sx={{ height: "100%" }}
                  elevation={10}
                >
                  <Grid item xs={12}>
                    <Tooltip title="Shows the inequality in the distribution of power in a DAO. A value of 0 indicates perfect equality and a value of 1 indicates maximal inequality.">
                      <Typography variant="h5" m={1} align="center">
                        Voting Power Concentration (Current Gini Coefficient)
                      </Typography>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h2" m={1} align="center">
                      {gini.giniIdx.toFixed(4)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sx={{ maxHeight: 200 }}>
                <PieChartHolders
                  title="Top 25 Token Holders"
                  data={tokenHolders.token_holders}
                  tooltip="The top 25 token holders in the DAO."
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </DashboardLayout>
    </div>
  );
}
