import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Title";
import FormDialog from "./FormDialog";

const API_ROUTE = `https://jamsession-cs467-w2023.uw.r.appspot.com/users`;

const INSTRUMENT_HEADERS = [
  "Instrument",
  "Experience",
  "Years Played",
  "Delete",
];

const GENRE_HEADERS = ["", ""];

const MY_POSTS = ["", "Edit"];

// Generate Order Data
function createData(name, type) {
  return { name, type };
}

function preventDefault(event) {
  event.preventDefault();
}

const rows = [
  createData(0, "16 Mar, 2020", "Low-Fi Beats", "Guitar", 312),
  createData(1, "16 Dec, 2022", "GR8Full DED", "Bass", 840),
];

export default function ContentCard({ title, userID }) {
  const [userAttributes, setUserAttributes] = useState([]);
  const [attributeAdded, setAttributeAdded] = useState(false);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`${API_ROUTE}/${userID}/${title}`, options)
      .then((response) => response.json())
      .then((data) => setUserAttributes(data[`_embedded`][`${title}`]))
      .catch((err) => console.error(err));
  }, [attributeAdded]);

  const setTableHeaders = () => {
    let tableHeaders = [];
    if (title == "instruments") {
      tableHeaders = INSTRUMENT_HEADERS;
    }
    if (title == "genres") {
      tableHeaders = GENRE_HEADERS;
    }
    if (title == "posts") {
      tableHeaders = MY_POSTS;
    }

    return (
      console.log(userAttributes),
      (
        <TableHead>
          <TableRow>
            {tableHeaders.map((header) => (
              <TableCell key={tableHeaders.indexOf(header)}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
      )
    );
  };

  return (
    console.log(attributeAdded),
    (
      <React.Fragment>
        <Title>
          {title.charAt(0).toUpperCase() + title.slice(1)}
          <FormDialog
            userID={userID}
            setAttributeAdded={setAttributeAdded}
            title={title}
          />
        </Title>
        <Table size="small">
          {setTableHeaders()}
          <TableBody>
            {userAttributes ? (
              userAttributes.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  {row.type ? <TableCell>{row.type}</TableCell> : null}
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>Set your {title} here!</TableRow>
            )}
          </TableBody>
        </Table>
      </React.Fragment>
    )
  );
}