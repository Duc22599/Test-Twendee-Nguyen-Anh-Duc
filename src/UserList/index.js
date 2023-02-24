import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { instance } from "../getApi";
import { updateUser } from "../store";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import { Container } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";

export const UserList = () => {
  const [page, setPage] = useState(1);
  const [pagePaper, setPagePaper] = useState(10);
  const [loading, setLoading] = useState(false);
  const [fetchData, setFetchData] = useState("");

  // totalUser
  const totalUser = 100;

  // get CurrentUser and action by store redux
  const user = useSelector((state) => state.currentUsers);
  const dispatch = useDispatch();

  // CallApi get data user
  useEffect(() => {
    setLoading(false);
    instance
      .get(`?page=${page}&results=${pagePaper}&seed=abc`)
      .then((res) => {
        dispatch(updateUser(res.data.results));
        setLoading(true);
      })
      .catch((err) => {
        setLoading(false);
        setFetchData(
          "Uh oh, something has gone wrong. Please tweet us @randomapi about the issue. Thank you."
        );
      });
  }, [page, pagePaper]);

  // action Pagination
  const handleChangePage = (page) => {
    setPage(page);
  };

  if (fetchData) return <Box>{fetchData}</Box>;

  return (
    <Container>
      {loading ? (
        <>
          <Typography fontWeight="700" fontSize="50px" my={2}>
            UserList
          </Typography>

          <TableContainer component={Paper}>
            <Table
              size="small"
              sx={{ minWidth: 650 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow sx={{ th: { border: 1 } }}>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">FullName</TableCell>
                  <TableCell align="center">Username</TableCell>
                  <TableCell align="center">Thumbnail Icon</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.map((item, index) => (
                  <TableRow key={index} sx={{ " td,  th": { border: 1 } }}>
                    <TableCell align="center" component="th" scope="row">
                      {index + 1 + (page - 1) * pagePaper}
                    </TableCell>
                    <TableCell align="center">
                      {item.name.title} {item.name.first} {item.name.last}
                    </TableCell>
                    <TableCell align="center">{item.login.username}</TableCell>
                    <TableCell
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <Avatar alt="Remy Sharp" src={item.picture.thumbnail} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        </>
      )}

      <Box mt={3} mr={2} sx={{ float: "right" }}>
        <Pagination
          hidePrevButton
          hideNextButton
          onChange={(e) => {
            handleChangePage(e.target.innerText);
          }}
          count={Math.ceil(totalUser / pagePaper)}
          color="primary"
        />
      </Box>
    </Container>
  );
};
