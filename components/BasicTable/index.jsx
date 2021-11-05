import clsx from "clsx";

// Mui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";

// Utils
import { numbersWithCommas } from "../../utils/numbers";

export default function BasicTable({ title, rows }) {
  const { total_supply } = rows[0];

  const style = {
    header: {
      fontSize: 20,
      fontWeight: 600,
    },
    cell: {
      fontSize: 18,
    },
  };

  return (
    <Paper elevation={10} sx={{ height: "100%" }}>
      <TableContainer>
        <Typography variant="h5" gutterBottom m={1} align="center">
          {title}
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={style.header}>Address</TableCell>
              <TableCell align="right" sx={style.header}>
                Balance
              </TableCell>
              <TableCell align="right" sx={style.header}>
                Percentage
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.address}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row" sx={style.cell}>
                  <Link
                    href={`https://etherscan.io/address/${row.address}`}
                    passHref
                  >
                    <a>{row.address}</a>
                  </Link>
                </TableCell>
                <TableCell align="right" sx={style.cell}>
                  {numbersWithCommas(
                    Math.floor(row.balance * Math.pow(10, -18))
                  )}
                </TableCell>
                <TableCell align="right" sx={style.cell}>
                  {`${Number((row.balance / total_supply) * 100).toFixed(2)}%`}{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
