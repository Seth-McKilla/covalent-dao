import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
// import useSWR from "swr";
// import fetcher from "../../utils/fetcher";
import daoList from "../../constants/daoList";
import _ from "lodash";

// Mui
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { green, red, grey } from "@mui/material/colors";
// @ Icons
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import GroupIcon from "@mui/icons-material/Group";
// @ Theme

// Layout
import { DashboardLayout } from "../../layouts";

// Components
import { PieChart, StatCard } from "../../components";

// Utils
import numbersWithCommas from "../../utils/numbersWithCommas";

// DUMMY DATA
// @ Sentiment analysis
const sentimentAnalysisData = [
  { name: "Positive 😊", value: 454, color: green[600] },
  { name: "Negative 😢", value: 261, color: red[600] },
  { name: "Neutral 😐", value: 97, color: grey[600] },
];
// @ AUM
const aumData = 2000000000;
// @ Voter Participation
const voterData = 0.012;
// @ Members
const membersData = 125000;

export default function DaoDashboard() {
  const {
    query: { daoTicker },
    isReady,
  } = useRouter();

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
          <Grid component={Container} container spacing={2}>
            <Grid item xs={3}>
              <PieChart
                data={sentimentAnalysisData}
                title="Sentiment Analysis"
              />
            </Grid>
            <Grid item xs={3}>
              <StatCard
                title="Assets Under Management (AUM)"
                value={`$${numbersWithCommas(aumData)}`}
                valueColor={green[600]}
                Icon={AccountBalanceIcon}
              />
            </Grid>
            <Grid item xs={3}>
              <StatCard
                title="Voter Participation Percentage"
                value={`${Number(voterData * 100).toFixed(2)}%`}
                Icon={HowToVoteIcon}
              />
            </Grid>
            <Grid item xs={3}>
              <StatCard
                title="Total Number of Members"
                value={numbersWithCommas(membersData)}
                Icon={GroupIcon}
              />
            </Grid>
          </Grid>
        </Grid>
      </DashboardLayout>
    </div>
  );
}
