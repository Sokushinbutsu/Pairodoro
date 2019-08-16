import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import GithubLogin from "github-login";
import Timer from "./Timer";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  timer: {
    flexGrow: 1
  }
}));

const TimerBar = props => {
  const {
    onSuccess,
    onFailure,
    setModalOpen,
    end,
    submitted,
    setSubmitted
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Pairodoro
          </Typography>
          <Typography variant="h5" className={classes.timer}>
            <Timer
              end={end}
              setModalOpen={setModalOpen}
              submitted={submitted}
              setSubmitted={setSubmitted}
            />
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
