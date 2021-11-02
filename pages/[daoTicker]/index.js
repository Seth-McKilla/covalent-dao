import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import daoList from "../../constants/daoList";
import _ from "lodash";

// Mui
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import { green } from "@mui/material/colors";
// @ Icons
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import GroupIcon from "@mui/icons-material/Group";
// @ Theme

// Layout
import { DashboardLayout } from "../../layouts";

// Components
import { PieChart, StatCard, LineGraph, BarGraph } from "../../components";

// Utils
import { numbersWithCommas } from "../../utils/numbers";
import dummyData from "../../temp/dummyData";

export default function DaoDashboard() {
  const {
    query: { daoTicker },
    isReady,
  } = useRouter();

  const { data, error } = useSWR("/api/v1/test", fetcher);

  isReady && !error && console.log(data);

  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

  const dao = _.find(daoList, { contractTicker: _.toUpper(daoTicker) });

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
          <Grid container spacing={3} maxWidth="lg">
            <Grid item xs={3}>
              <PieChart data={dummyData.sentiment} title="Sentiment Analysis" />
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
                title="Voter Participation Percentage"
                value={`${Number(dummyData.voter * 100).toFixed(2)}%`}
                Icon={HowToVoteIcon}
              />
            </Grid>
            <Grid item xs={3}>
              <StatCard
                title="Total Number of Members"
                value={numbersWithCommas(dummyData.members)}
                Icon={GroupIcon}
              />
            </Grid>

            <Grid item xs={4}>
              <LineGraph
                title="Overall Activity"
                data={dummyData.activity}
                color={primaryColor}
                keyY="Txs"
              />
            </Grid>
            <Grid item xs={4}>
              <BarGraph
                title="AUM Over Time"
                data={dummyData.aumOverTime}
                color={green[500]}
                keyBar="AUM"
              />
            </Grid>

            <Grid item xs={4}>
              <LineGraph
                title="Voting Power Concentration"
                data={dummyData.gini}
                color={secondaryColor}
                keyY="Gini-Idx"
              />
            </Grid>
          </Grid>
        </Grid>
      </DashboardLayout>
    </div>
  );
}
