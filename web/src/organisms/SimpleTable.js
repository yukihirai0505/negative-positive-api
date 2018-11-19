import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
}

function SimpleTable(props) {
  const { classes, data } = props

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell numeric>Rank</TableCell>
            <TableCell numeric>Positive Score</TableCell>
            <TableCell numeric>Negative Score</TableCell>
            <TableCell>Tweet</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((n, key) => {
            return (
              <TableRow key={key}>
                <TableCell component="th" scope="row">{key + 1}</TableCell>
                <TableCell numeric>{n.labels.positive}</TableCell>
                <TableCell numeric>{n.labels.negative}</TableCell>
                <TableCell>{n.text}</TableCell>
                <TableCell>{n.date}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Paper>
  )
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array
}

export default withStyles(styles)(SimpleTable)
