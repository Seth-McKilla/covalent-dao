import Link from "next/link";
import { motion } from "framer-motion";
import daoList from "../../constants/daoList";
import _ from "lodash";

// Mui
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import { green } from "@mui/material/colors";

export default function DaoCard({ name, ticker, price, imgUrl }) {
  const dao = _.find(daoList, {
    contractTicker: _.toUpper(ticker),
  });

  return (
    <Link
      href={`/${dao.chainId}/${dao.contractAddress}`}
      passHref
      prefetch={false}
    >
      <Card
        sx={{ maxWidth: 250 }}
        component={motion.div}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.1 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        <CardActionArea>
          <CardMedia component="img" height="175" image={imgUrl} alt={name} />
          <CardContent>
            <Typography gutterBottom variant="h4" sx={{ width: "100%" }}>
              {`${name.replace("Token", "")}`}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {ticker}
            </Typography>
            <Typography variant="h4" sx={{ color: green[500] }}>
              {`$${price}`}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
