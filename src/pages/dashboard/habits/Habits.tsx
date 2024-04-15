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

export type HabitsProps = {
  onClickEditOpen: (selectedObj: any) => void;
};

const Habits = (props: HabitsProps) => {
  const { onClickEditOpen } = props;

    const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);

  const [habitName, setHabitName] = React.useState("");
  const [habitId, setHabitId] = React.useState();

  const [habitStatusActive, setHabitStatusActive] = React.useState(false);

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
    console.log("currentHabit", !currentHabit.active)
    dispatch(changeHabitStatus({
      id: currentHabit.id,
      name: currentHabit.name,
      active: !currentHabit.active
    }))
  }

  const habitsList = useAppSelector(state=>state.habits.habits)
  const habitsCount = useAppSelector(state=>state.habits.habits.length)

  return (
    <div className={scss.main}>
      <Button variant="outlined" onClick={handleClickOpen}>
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


<div>

      {habitsList.map((habit: any, index: any) => {
            return (
              <div key={habit.id} style={{display: "flex", justifyContent: "space-between"}}>
                  <><div style={{ padding: '10px' }}>{index + 1}</div><div style={{ padding: '10px' }}>{habit.name}</div><div style={{ padding: '10px' }}>
                  <FormControl component="fieldset" variant="standard">
                    <FormGroup>
                      <FormControlLabel
                        control={ <Switch checked={habit.active} onChange={() => handleChangeStatus(habit)} name="" />}
                        label="" />
                    </FormGroup>
                  </FormControl>
                </div><IconButton onClick={() => { handleClickEditOpen(habit); } }><EditOutlinedIcon /></IconButton><IconButton onClick={() => dispatch(deleteHabit({ id: habit.id }))}><DeleteIcon /></IconButton></>
              </div>
          )})}
    </div>
    </div>
  );
}

export default Habits