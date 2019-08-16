import React from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

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
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={modalOpen}
          onClose={modalClose}
        >
          <div className="FeatureModal">
            <div className={classes.paper}>
              <h5 id="modal-title">Features</h5>
            </div>
          </div>
        </Modal>
      </>
    );
  }
  return null;
};

export default SwitchModal;
