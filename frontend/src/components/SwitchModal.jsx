import React from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
    outline: "none"
  }
}));

const SwitchModal = props => {
  const { modalOpen, modalClose } = props;

  const classes = useStyles();

  if (modalOpen) {
    return (
      <>
        <Modal open={modalOpen} onClose={modalClose}>
          <div className="SwitchModal">
            <div className={classes.paper}>
              <Typography variant="h2">Time to Switch!</Typography>
            </div>
          </div>
        </Modal>
      </>
    );
  }
  return null;
};

export default SwitchModal;
