import React from "react";
import { useTheme } from "../Context/ThemeContext";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const UserTable = ({ data }) => {
    const { theme } = useTheme();
    const tableHeaderStyle = {
        color: theme.textBoxColor,
        textAlign: 'center',
        fontSize: '1.2rem',
        fontWeight: 'bold',
    };

    const tableCellStyle = {
        color: theme.color,
        textAlign: 'center',
        fontSize: '1rem'
    }
    // console.log(data)

    return(
        <div className="user-table">
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={tableHeaderStyle}>WPM</TableCell>
                            <TableCell style={tableHeaderStyle}>Accuracy</TableCell>
                            <TableCell style={tableHeaderStyle}>Characters</TableCell>
                            <TableCell style={tableHeaderStyle}>TimeStamp</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.map((metaData, index) => {
                                return(
                                    <TableRow key={index}>
                                        <TableCell style={tableCellStyle}>{metaData.wpm}</TableCell>
                                        <TableCell style={tableCellStyle}>{metaData.accuracy}</TableCell>
                                        <TableCell style={tableCellStyle}>{metaData.charaters}</TableCell>
                                        <TableCell style={tableCellStyle}>{metaData.timeStamp.toDate().toLocaleString()}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default UserTable;