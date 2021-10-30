import { useContext } from "react";
import { Context } from "../../context";
import Link from "next/link";
import { motion } from "framer-motion";
import _ from "lodash";

// Mui
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import { green } from "@mui/material/colors";

export default function DaoCard({ name, ticker, price, address, imgUrl }) {
  name = name.replace("Token", "");
  const { dispatch } = useContext(Context);
  const handleClick = () => {
    dispatch({
      type: "SET_DAO",
      payload: { name, ticker, address, imgUrl },
    });
  };

  return (
    <Link href={`/${_.toLower(ticker)}`} passHref prefetch={false}>
      <Card
        sx={{ maxWidth: 250 }}
        component={motion.div}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.1 },
        }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
      >
        <CardActionArea>
          <CardMedia component="img" height="175" image={imgUrl} alt={name} />
          <CardContent>
            <Typography gutterBottom variant="h4" sx={{ width: "100%" }}>
              {`${name}`}
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
