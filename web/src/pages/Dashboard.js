import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { mainListItems, secondaryListItems } from '../components/listItems'
import SimpleLineChart from '../components/SimpleLineChart'
import SimpleTable from '../components/SimpleTable'

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto'
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  },
  h5: {
    marginBottom: theme.spacing.unit * 2
  }
})

class Dashboard extends Component {
  static propTypes = {
    handleSignOut: PropTypes.any,
    result: PropTypes.array,
    classes: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      open: true
    }
  }

  async componentDidMount() {}

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props
    // const { handleSignOut, result } = this.props
    // const positiveTopThree = result && result.sort((a, b) => {
    //   const alabels = a[1][0]
    //   const blabels = b[1][0]
    //   const aVal = alabels.filter(arr => arr[0] === '__label__1,')[0][1]
    //   const bVal = blabels.filter(arr => arr[0] === '__label__1,')[0][1]
    //   return bVal - aVal
    // }).slice(0, 10)
    // const negativeTopThree = result && result.sort((a, b) => {
    //   const alabels = a[1][0]
    //   const blabels = b[1][0]
    //   const aVal = alabels.filter(arr => arr[0] === '__label__2,')[0][1]
    //   const bVal = blabels.filter(arr => arr[0] === '__label__2,')[0][1]
    //   return bVal - aVal
    // }).slice(0, 10)
    // console.dir(positiveTopThree)
    // console.dir(negativeTopThree)
    return (
      <div className={classes.root}>
        {/*<div onClick={this.clickScreen}>*/}
        {/*<button className="square_btn" onClick={handleSignOut}>*/}
        {/*ログアウト*/}
        {/*</button>*/}
        {/*</div>*/}
        {/*<p>ポジティブツイートトップ10</p>*/}
        {/*{positiveTopThree && positiveTopThree.map(data => {*/}
        {/*const text = data[0]*/}
        {/*const labels = data[1][0]*/}
        {/*return (<div>*/}
        {/*{labels[0]}*/}
        {/*{text}*/}
        {/*</div>)*/}
        {/*})}*/}
        {/*<p>ネガティブツイートトップ10</p>*/}
        {/*{negativeTopThree && negativeTopThree.map(data => {*/}
        {/*const text = data[0]*/}
        {/*const labels = data[1][0]*/}
        {/*return (<div>*/}
        {/*{labels[0]}*/}
        {/*{text}*/}
        {/*</div>)*/}
        {/*})}*/}
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}
        >
          <Toolbar
            disableGutters={!this.state.open}
            className={classes.toolbar}
          >
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
            )
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">
            Orders
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            <SimpleLineChart />
          </Typography>
          <Typography variant="h4" gutterBottom component="h2">
            Products
          </Typography>
          <div className={classes.tableContainer}>
            <SimpleTable />
          </div>
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(Dashboard)
