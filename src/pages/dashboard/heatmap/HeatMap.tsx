import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import { useState } from 'react';
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { useAppSelector } from '@/app/store/features/store';
import { dailyHabitData } from "@/app/mockHabitDailyData";

const HeatMap = () => {
    const [year, setYear] = useState("2024");
    const [startDate, setStartDate] = useState(new Date("2024-01-01"));

    const [selectedHabit, setSelectedHabit] = useState(1);
    const habitsList = useAppSelector(state=>state.habits.habits);
    const handleHabitSelection = (event?: any) => {
        setSelectedHabit(event?.target?.value)
    }

    const handleChange = (event?: any) => {
        setYear(event?.target?.value)
        if (event?.target.value === "2023") {
            setStartDate(new Date("2023-01-01"));
        } else {
            setStartDate(new Date("2024-01-01"));
        }
    }

  let qwertyDateSet: any[] = [];

  dailyHabitData.forEach((el: any) => {
    let habitNme = habitsList.filter((x: any)=> {
        return x.id === selectedHabit;
    })[0]["name"];
    let obj: any = {};
    obj['date'] = new Date(el.timeStamp);
    obj[habitNme] = el[habitNme]
    let checkStatus = el['habits'].filter((x: any) => x.habit_id === selectedHabit)[0]['status'];
    (checkStatus) ? obj['count'] = selectedHabit : obj['count'] = 0;
    qwertyDateSet.push(obj)
  })

  return (
    <>
    <div style={{padding: "2rem 6rem"}}>
      <h1>Heatmaps</h1>
      <div style={{display: "flex", justifyContent: "center"}}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Year</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={year}
                label="Year"
                onChange={handleChange}
            >
                <MenuItem value={"2023"}>2023</MenuItem>
                <MenuItem value={"2024"}>2024</MenuItem>
            </Select>
    </FormControl>

    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Habit</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={selectedHabit}
                label="Habit"
                onChange={handleHabitSelection}
            >
                {
                    habitsList.map((habit: any) => {
                        if (habit.active) {
                            return(
                                <MenuItem key={habit.id} value={habit.id}>{habit.name}</MenuItem>
                            )
                        }
                    })
                }
            </Select>
    </FormControl>
      </div>
      
      <Card>
        <CalendarHeatmap
            startDate={startDate}
            endDate={new Date()}
            values={qwertyDateSet}
            weekdayLabels={["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]}
            showWeekdayLabels
            gutterSize={2}
            classForValue={(value) => {
                if (!value) {
                  return 'color-empty';
                }
                return `color-github-${value.count}`;
              }}
            titleForValue={(value) => {
            return  `${value?.date}` + "_" + `${value?.count}`
            }}
        />
      </Card>
      </div>
    </>
  );
};

export default HeatMap;
