import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import classNames from 'classnames';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
const cookies=new Cookies();
const drawerWidth = 240;
const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
      backgroundColor:'#2699FB'
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  backgroundColor:'#2699FB'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
      backgroundColor:'#2699FB'
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
    grow: {
      flexGrow: 1,
      justifyContent:'left'
      
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    backgroundColor:'#2699FB'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    backgroundColor:'#2699FB'
  },
});

class NurseAppbar extends React.Component {
  state = {
    open: false,
    anchorEl: null,
  };
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
logout=()=>{
 
  localStorage.clear();
  window.location.href = '/';
cookies.remove('roles')
cookies.remove('username')
cookies.remove('token')

}
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
route(path){

  window.location.href = path;
}

  render() {
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
    
        <AppBar position="fixed" style={{backgroundColor:'#2699FB'}}
        className={classNames(classes.appBar,{[classes.appBarShift]:this.state.open,
        })}
        >
<Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}
            >
            <MenuIcon/>

            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow} noWrap>
            Prime Specialist Clinic
            </Typography>
            <div style={{paddingLeft:'75%'}}>
            <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle style={{}} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.logout}>logout</MenuItem>
                  
                </Menu>
                </div>
                </Toolbar>
               
                 </AppBar>
   <Drawer
            //  variant="permanent"
            //  className={classNames(classes.drawer, {
            //    [classes.drawerOpen]: this.state.open,
            //    [classes.drawerClose]: !this.state.open,
            //  })}
             classes={{
               paper: classNames({
                 [classes.drawerOpen]                  : this.state.open,
                 [classes.drawerClose]: !this.state.open,
               }),
             }}
             open={this.state.open}
             >
              <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <List>
          <ListItem button onClick={(event) => this.route('/addvitals')} style={{backgroundColor:'#2699FB',}}>
                <ListItemIcon style={{color:'#fff'}}> 
                  Add Vitals
                   </ListItemIcon>
                <ListItemText primary />
              </ListItem>


          </List>
             
             </Drawer>
        
                
      </div>
    );
  }
}

NurseAppbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true } )(NurseAppbar);
