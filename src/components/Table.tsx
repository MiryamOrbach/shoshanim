import React, { useEffect } from "react";
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el: T, index: number) => [el, index]);
  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export interface HeadCell {
  id: string;
  label?: string;
  type?: string;
  handleClickIcon?: any;
  isSortable?: boolean;
}

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  headCells: HeadCell[];
  // numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderBy?: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = (property: HeadCell) => (
    event: React.MouseEvent<unknown>
  ) => {
    if (property.isSortable) onRequestSort(event, property.id);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align="left"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.isSortable ? (
              <TableSortLabel
                className={classes.header}
                active={orderBy === headCell.id}
                direction={
                  orderBy === headCell.id && headCell.isSortable ? order : "asc"
                }
                onClick={createSortHandler(headCell)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            ) : (
                headCell.label
              )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      // width: "90%",
      direction: "ltr",
      // margin: "2% 5%",
    },
    header: {
      paddingLeft: "0",
    },
    table: {
      minWidth: 750,
    },
    tableContainer: {
      direction: "ltr",
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);
interface TableProps {
  headCells: HeadCell[];
  rows: any[];
}
export default function EnhancedTable(props: TableProps) {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("");
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    setPage(0);
  }, [props.rows]);
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const renderComponent = (row: any, item: HeadCell) => {
    if (!item.type) return row[item.id];
    switch (item.type) {
      case "icon":
        return (
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={() => item.handleClickIcon(row.item)}
          >
            <EditIcon />
          </IconButton>
        );

      default:
        return row[item.id];
    }
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, props.rows.length - page * rowsPerPage);
  let cells = props.headCells;
  return (
    // <div className={classes.root}>
    <Paper className={classes.paper}>
      <TableContainer
      // style={{ direction: "rtl" }}
      // className={classes.tableContainer}
      >
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size={dense ? "small" : "medium"}
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            headCells={cells}
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={props.rows.length}
          />
          <TableBody>
            {stableSort(props.rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover key={row.name}>
                    {cells.map((item, idx) => {
                      return (
                        <TableCell>{renderComponent(row, item)}</TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        count={props.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        labelDisplayedRows={({ from, to, count }) =>
          `${from} - ${to} מתוך ${count}`
        }
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    // </div>
  );
}
