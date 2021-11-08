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
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import { green, red, grey } from "@mui/material/colors";
// @ Icons
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupIcon from "@mui/icons-material/Group";

// Layout
import { DashboardLayout } from "../../../layouts";

// Components
import {
  PieChart,
  StatCard,
  LineGraph,
  Loader,
  BasicTable,
} from "../../../components";

// Utils
import { numbersWithCommas } from "../../../utils/numbers";
import dummyData from "../../../temp/dummyData";

export default function DaoDashboard() {
  const theme = useTheme();
  const secondaryColor = theme.palette.secondary.main;

  const {
    query: { chainId, contractAddress },
    isReady,
  } = useRouter();

  const dao = _.find(daoList, { contractAddress });

  // API Calls
  // @ Token Holders
  const { data: tokenHolders } = useSWR(
    isReady &&
      `/api/v1/get-token-holders?chainId=${chainId}&contractId=${contractAddress}`,
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

  const dataLoaded = !!tokenHolders && !!spotPrices && !!transactionsByDate;

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
                <PieChart
                  data={[
                    {
                      name: "Positive 😊",
                      value: Number(sentiment["positive"]),
                      color: green[500],
                    },
                    {
                      name: "Negative 😢",
                      value: Number(sentiment["negative"]),
                      color: red[500],
                    },
                    {
                      name: "Neutral 😐",
                      value: Number(sentiment["neutral"]),
                      color: grey[600],
                    },
                  ]}
                  title="Sentiment Analysis"
                />
              </Grid>
              <Grid item xs={3}>
                <StatCard
                  title={`Current Quote Rate of Asset (${dao.contractTicker})`}
                  value={`$${quoteRate}`}
                  valueColor={green[500]}
                  Icon={AttachMoneyIcon}
                />
              </Grid>
              <Grid item xs={3}>
                <StatCard
                  title="Assets Under Management (AUM)"
                  value={`$${numbersWithCommas(dummyData.aum)}`}
                  valueColor={green[500]}
                  Icon={AccountBalanceIcon}
                />
              </Grid>
              <Grid item xs={3}>
                <StatCard
                  title="Total Number of Members"
                  value={numbersWithCommas(tokenHolders.total_count)}
                  Icon={GroupIcon}
                />
              </Grid>

              <Grid item xs={6}>
                <LineGraph
                  title="Overall Activity"
                  data={transactionsByDate.transactions}
                  color={green[500]}
                  keyX="date"
                  keyY="transactions"
                />
              </Grid>
              <Grid item xs={6}>
                <LineGraph
                  title="Voting Power Concentration"
                  data={dummyData.giniIndex}
                  color={secondaryColor}
                  keyX="month"
                  keyY="Gini-Idx"
                />
              </Grid>

              <Grid item xs={12}>
                <BasicTable
                  title="Top Token Holders"
                  rows={tokenHolders.token_holders}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </DashboardLayout>
    </div>
  );
}
