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


const ListHabits = () => {
    const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);

  const [habitName, setHabitName] = React.useState("");
  const [habitId, setHabitId] = React.useState();

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

  const habitsList = useAppSelector(state=>state.habits.habits)
  const habitsCount = useAppSelector(state=>state.habits.habits.length)

  return (
    <React.Fragment>
     
      <table suppressHydrationWarning>
        <thead>
            <tr>
                <th style={{padding: '10px'}}>ID</th>
                <th style={{padding: '10px'}}>Name</th>
                <th style={{padding: '10px'}}>Status</th>
            </tr>
        </thead>
        <tbody>
        {habitsList.map((habit: any, index: any) => {
              return (
                <tr key={habit.id}>
                    <><td style={{ padding: '10px' }}>{index + 1}</td><td style={{ padding: '10px' }}>{habit.name}</td><td style={{ padding: '10px' }}>
                    <FormControl component="fieldset" variant="standard">
                      <FormGroup>
                        <FormControlLabel
                          control={ <Switch checked={habit.active} onChange={() =>  dispatch(changeHabitStatus({
                            id: habit.id,
                            name: habit.name,
                            active: !habit.active
                          }))} name="" />}
                          label="" />
                      </FormGroup>
                    </FormControl>
                  </td><IconButton onClick={() => { handleClickEditOpen(habit); } }><EditOutlinedIcon /></IconButton><IconButton onClick={() => dispatch(deleteHabit({ id: habit.id }))}><DeleteIcon /></IconButton></>
                </tr>
            )})}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default ListHabits;