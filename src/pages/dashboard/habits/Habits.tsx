import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useAppDispatch } from '@/app/store/features/store';
import { addHabits, deleteHabit, updateHabitName, changeHabitStatus } from '@/app/store/features/habitsSlice';
import IconButton from "@mui/material/IconButton";
import { useAppSelector } from '@/app/store/features/store';
import scss from "@/app/page.module.css";
import { Switch } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const Habits = () => {

  const dispatch = useAppDispatch();
  let statusChangedName = "";
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);

  const [habitName, setHabitName] = React.useState("");
  const [habitId, setHabitId] = React.useState();

  const [snackOpen, setSnackOpen] = React.useState(false);

  const handleSnackClose = (event?: React.SyntheticEvent | Event) => {
    setSnackOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setHabitName("");
    setIsEdit(false);
  };

  const handleClickEditOpen = (selectedObj: any) => {
    setIsEdit(true);
    setOpen(true);
    setHabitName(selectedObj.name);
    setHabitId(selectedObj.id);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeStatus = (currentHabit: any) => {
    // console.log("ab yahan ho kya rha hai", event.target)
    setIsActive(!currentHabit.active);
    statusChangedName = currentHabit.name;
    dispatch(changeHabitStatus({
      id: currentHabit.id,
      name: currentHabit.name,
      active: !currentHabit.active
    }))
    setSnackOpen(true);
  }

  const habitsList = useAppSelector(state=>state.habits.habits)

  return (
    <div className={scss.main}>
      <Button variant="contained" onClick={handleClickOpen}>
        {/* { habitsCount === 4 ?  "Max 4 habits can be added, please delete a habit to add new": "Create Habit" }
     */}
        Add Habit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{isEdit ? 'Edit Habit' : 'Add New Habit'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Habit Name"
            type="text"
            fullWidth
            variant="standard"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={() => {
            if (isEdit) {
              dispatch(updateHabitName({
                name: habitName,
                id: habitId
              }));
            } else {
              dispatch(addHabits({
                name: habitName,
                id: 0,
                active: true
              }));
            }
            handleClose();
          } }>{isEdit ? 'Edit' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
        <Snackbar open={snackOpen} autoHideDuration={2000}  onClose={handleSnackClose}
          anchorOrigin={{vertical: 'top', horizontal: 'right' }}
          >
            {isActive ? 
            <Alert
            onClose={handleSnackClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            Habit Activated!
          </Alert> :
          <Alert
          onClose={handleSnackClose}
          severity="warning"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Habit De-activated!
        </Alert>}
        
      </Snackbar>
      <div>
      {habitsList.map((habit: any, index: any) => {
            return (
              <div key={habit.id} style={{display: "flex", justifyContent: "space-between"}}>
                  <>
                  <div style={{ padding: '20px', width:'20%' }}>{index + 1}</div>
                  <div style={{ padding: '20px', width:'40%' }}>{habit.name}</div>
                  <div style={{ padding: '20px', width:'10%' }}>
                  <FormControl component="fieldset" variant="standard">
                    <FormGroup>
                      <FormControlLabel
                        control={ <Switch checked={habit.active} onChange={() => handleChangeStatus(habit)} name="" />}
                        label="" />
                    </FormGroup>
                  </FormControl>
                </div>
                <div style={{ padding: '20px', width:'10%' }}>
                  <IconButton onClick={() => { handleClickEditOpen(habit); } }><EditOutlinedIcon /></IconButton>
                </div>
                <div style={{ padding: '20px', width:'10%' }}>
                  <IconButton onClick={() => dispatch(deleteHabit({ id: habit.id }))}><DeleteIcon /></IconButton>
                </div>
                </>
              </div>
          )})}
    </div>
    </div>
  );
}

export default Habits