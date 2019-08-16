import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import GithubLogin from "github-login";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const TimerBar = props => {
  const { onSuccess, onFailure } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Pairodoro
          </Typography>
          <GithubLogin
            className="login-btn"
            clientId="19f93a9095410be79efa"
            redirectUri="http://localhost:3000"
            scope="user:email public_repo"
            onSuccess={onSuccess}
            onFailure={onFailure}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TimerBar;
