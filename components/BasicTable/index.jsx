import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

// Utils
import { numbersWithCommas } from "../../utils/numbers";

export default function BasicTable({ title, rows }) {
  const { total_supply } = rows[0];

  return (
    <Paper elevation={10} sx={{ height: "100%" }}>
      <TableContainer>
        <Typography variant="h5" gutterBottom m={1} align="center">
          {title}
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell size="medium">Address</TableCell>
              <TableCell align="right" size="medium">
                Balance
              </TableCell>
              <TableCell align="right" size="medium">
                Percentage
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.contract_address}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.contract_address}
                </TableCell>
                <TableCell align="right">
                  {numbersWithCommas(
                    Math.floor(row.balance * Math.pow(10, -18))
                  )}
                </TableCell>
                <TableCell align="right">{`${Number(
                  (row.balance / total_supply) * 100
                ).toFixed(2)}%`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
