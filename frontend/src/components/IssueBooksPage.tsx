import {
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useHistory, useLocation } from "react-router";
import type { Book } from "./HomePageTable";
const IssueBooksPage = () => {
  const [issue, setIssue] = React.useState("Issue");
  const { state } = useLocation();
  const { books } = state as any;
  const handleIssue = () => {
    axios
      .post(
        "/api/books/issue/",
        {
          books: books.map((book: Book) => book.id),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => setIssue("Issued"));
  };
  const history = useHistory();
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 800,
      minWidth: 500,
      width: 800,
      marginTop: theme.spacing(2),
      marginLeft: "auto",
      marginRight: "auto",
    },
    paper: {
      width: "100%",
    },
    table: {
      minWidth: 750,
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <br />
        <Typography variant="h4" align="center">
          Confirm Books
        </Typography>
        <br />
        <Table className={classes.table} size="medium">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Author&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book: Book) => (
              <TableRow key={book.id}>
                <TableCell align="center">{book.id}</TableCell>
                <TableCell align="center">{book.name}</TableCell>
                <TableCell align="center">{book.author}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={2} />
              <TableCell colSpan={1}></TableCell>
              <TableCell align="center">
                <Button color="secondary" onClick={() => history.goBack()}>
                  Back
                </Button>
                <Button
                  color="secondary"
                  onClick={() => handleIssue()}
                  disabled={issue === "Issued"}
                >
                  {issue}
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default IssueBooksPage;
