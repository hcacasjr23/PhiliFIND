import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';

export default function DataTable(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(7);

    const columns = [
        {
            id: 'id',
            label: 'ID',
            width: 40,
            align: 'center',
        },
        {
            id: `${props.itemPrefix}_item`,
            label: `Item ${props.itemType}`,
            minWidth: 160,
        },
        {
            id: `${props.itemPrefix}_brand`,
            label: 'Brand/Breed',
            minWidth: 100,
        },
        {
            id: `${props.itemPrefix}_date`,
            label: `Date ${props.itemType}`,
            minWidth: 120,
        },
        {
            id: `${props.itemPrefix}_time`,
            label: `Time ${props.itemType}`,
            minWidth: 120,
        },
        {
            id: `${props.itemPrefix}_color`,
            label: 'Color',
            minWidth: 100,
        },
        {
            id: `${props.itemPrefix}_category`,
            label: 'Category',
            minWidth: 170,
        },
        {
            id: `${props.itemPrefix}_addinfo`,
            label: 'Additional Information',
            minWidth: 200,
            sortable: false,
        },
        {
            id: `${props.itemPrefix}_place`,
            label: 'Location/Place',
            minWidth: 240,
        },
        {
            id: `${props.itemPrefix}_name`,
            label: 'Contact Person Name',
            minWidth: 200,
        },
        {
            id: `${props.itemPrefix}_email`,
            label: 'Email Address',
            minWidth: 280,
        },
        {
            id: `${props.itemPrefix}_pcontact`,
            label: 'Primary Contact No.',
            minWidth: 170,
        },
        {
            id: `${props.itemPrefix}_scontact`,
            label: 'Secondary Contact No.',
            minWidth: 200,
        },
    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: 'var(--color-white-dirty' }}>
            <TableContainer
                sx={{
                    height: 'auto',
                    minHeight: '100%',
                    maxHeight: '100%',
                    padding: 0,
                    margin: 0,
                    boxSizing: 'border-box',
                    backgroundColor: 'var(--color-white-dirty',
                }}
            >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={4} sx={{ fontSize: '20pt', fontWeight: 'bold' }}>
                                {props.tableHeader} {props.itemType} Item
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.itemData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .reverse()
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell>
                                            {(props.buttonType === 'delete') && (
                                                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => { props.handleEvent(row.id) }}>
                                                    Delete
                                                </Button>
                                            )}
                                            {(props.buttonType === 'restore') && (
                                                <Button variant="outlined" startIcon={<RestoreIcon />} onClick={() => { props.handleEvent(row.id) }}>
                                                    Restore
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={props.itemData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
