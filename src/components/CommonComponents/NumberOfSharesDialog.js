import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function NumberOfSharesDialog({
  open,
  closeFunction,
  content: { title, description, btnTitle },
  maxUnits,
}) {
  const [units, setUnits] = useState();
  const [perUnitValue, setPerUnitValue] = useState();
  const [error, setError] = useState({ units: "", perUnitValue: "" });

  const changeUnits = (value) => {
    setUnits(value);
    if (value > parseFloat(maxUnits) || value < 1) {
      setError({
        ...error,
        units: `Number of Units should be between 1-${maxUnits}`,
      });
    } else {
      setError({ ...error, units: "" });
    }
  };

  const changePerUnitValue = (value) => {
    setPerUnitValue(value);
    if (value <= 0) {
      setError({
        ...error,
        perUnitValue: `Enter value greater than 0`,
      });
    } else {
      setError({ ...error, perUnitValue: "" });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={closeFunction}
      aria-labelledby="form-dialog-title"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          closeFunction(units, perUnitValue, "ok");
        }}
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>

          <TextField
            autoFocus
            type="number"
            label="Number of units"
            fullWidth
            value={units}
            required
            onChange={({ target: { value } }) => changeUnits(value)}
            error={error.units !== ""}
            helperText={error.units}
          />
          <TextField
            autoFocus
            type="number"
            label="Selling price per unit"
            fullWidth
            value={perUnitValue}
            required
            onChange={({ target: { value } }) => changePerUnitValue(value)}
            style={{ marginTop: "10px" }}
            error={error.perUnitValue !== ""}
            helperText={error.perUnitValue}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeFunction} color="primary">
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            disabled={error.units !== "" || error.perUnitValue !== ""}
          >
            {btnTitle}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
