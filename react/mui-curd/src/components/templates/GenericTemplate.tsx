import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AssignmentIcon from '@material-ui/icons/Assignment';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    toolbar: {
      paddingRight: 24,
    },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: "none",
    },
    title: {
      flexGrow: 1,
    },
    pageTitle: {
      marginBottom: theme.spacing(1),
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
    },
    link: {
      textDecoration: "none",
      color: theme.palette.text.secondary,
    },
  })
);


const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/">
        管理画面
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export interface GenericTemplateProps {
  children: React.ReactNode;
  title: string;
}

const GenericTemplate: React.FC<GenericTemplateProps> = ({
  children,
  title,
}) => {
  console.log(children);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };



  return (

    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} className={clsx(
            classes.menuButton, open && classes.menuButtonHidden)}>
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            管理画面
          </Typography>
          {/* <IconButton
              edge="end"
              color="inherit"
              aria-label="About"
              onClick={handleAboutOpen}
            > */}
          <Link to="/About" className={classes.link}>
            <InfoIcon htmlColor="#a76642" fontSize="large" />
          </Link>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }} open={open}>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="トップページ" />
            </ListItem>
          </Link>
          <Link to="/products" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="商品ページ" />
            </ListItem>
          </Link>
          <Link to="/Sections" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="部門の管理" />
            </ListItem>
          </Link>
        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Typography component="h2" variant="h5" color="inherit" noWrap className={classes.pageTitle}>
            {title}
          </Typography>
          {children}
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>

    </div>

  );
};

export default GenericTemplate;