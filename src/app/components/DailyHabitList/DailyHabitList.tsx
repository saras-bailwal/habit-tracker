import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useAppDispatch, useAppSelector } from "@/app/store/features/store";
import { Button, IconButton, TextField } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { addDailyHabit, updateDailyHabit } from "@/app/store/features/dailyHabitsSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from 'moment';
import { timeStamp } from "console";

const DailyHabitList = () => {
  const dailyHabitsList = useAppSelector((state) => state.dailyHabits.value);

  let sortedList = [...dailyHabitsList].sort((a,b) => {
    return b.timeStamp - a.timeStamp;
  });
  const habitsList = useAppSelector((state) => state.habits.habits);
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [dateParam, setDateParam] = React.useState("");
  const [habitsData, setHabitsData] = React.useState([]);

  const [todayExists, setTodayExistence] = React.useState(false);

  const fetchMoreData = () => {
    setTimeout(() => {
           dailyHabitsList.concat(Array.from({ length: 20 }))
      }, 1500);
  }
  const handleChangedStatus = (dailyHabits: any) => {
    console.log("ahablsdls ", dailyHabits);
  }
  const handlePrintSection = (dailyHabDate: any) => {
    let formattedDate = moment(dailyHabDate).format("YYYY-MM-DD");
    let today = moment();
    let yesterday = moment().subtract(1, 'day');

    if (Date.now() != sortedList[0].timeStamp) {
      let fromDt = moment(sortedList[0].timeStamp);
      let endDt = moment();
      
      while (fromDt.isBefore(endDt)) {
        let arr2: any = habitsList.map((v: any) => ({ habit_id: v.id, status: 0 }));
        fromDt.add(1, 'day');
        let fromDtFormatted = moment(fromDt).valueOf();
        if (fromDtFormatted === sortedList[0].timeStamp ) return;
        dispatch(addDailyHabit({
          timeStamp: fromDtFormatted,
          habits: arr2
        }))
      }
       
    }
    
    if(moment(formattedDate).isSame(today, 'day')) {
        return "Today";
    } else if(moment(formattedDate).isSame(yesterday, 'day')) {
        return ("Yesterday" +' - ' + formattedDate);
    } else {
        return (moment(formattedDate).format('dddd') + ' - '+formattedDate);
    }
  }
  return (
    <InfiniteScroll
          dataLength={dailyHabitsList.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
    <List sx={{ width: "100%", maxWidth: 960, bgcolor: "darkslategray" }}>
      {sortedList.map((dailyHab: any, index: any) => {
        return (
          <>
            <div key={dailyHab.id} style={{display: 'flex', alignItems: 'center',
    justifyContent: 'space-evenly'}}>
            <p>{handlePrintSection(dailyHab.timeStamp)}</p>
            </div>
            <div style={{display: 'flex',
    justifyContent: 'center'}}>
            {
                dailyHab.habits.map((hab: any, idx: any) => {
                    const habitValue = habitsList.filter((x: any) => x.id === hab.habit_id)[0];
                    return (
                      <>
                        <React.Fragment key={habitValue.id}>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox key={idx}
                                  defaultChecked={hab.status ? true : false}
                                  onChange={() => handleChangedStatus(hab)}
                                />
                              }
                              label={habitValue.name}
                            />
                          </FormGroup>
                        </React.Fragment>
                      </>
                    );
                  })}
            </div>
            <Divider variant="inset" component="li" />
          </>
        );
      })}
    </List>
    </InfiniteScroll>
  );
};

export default DailyHabitList;
