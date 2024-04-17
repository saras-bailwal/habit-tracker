import { dailyHabitData } from "@/app/mockHabitDailyData";
import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";


export interface DailyHabits {
    timeStamp: number;
    habits: []
}

interface DailyHabitsState {
    dailyHabits: DailyHabits[]
}

// const initialState: DailyHabitsState =  {
//     dailyHabits: { value: dailyHabitData }
// }

export const DailyHabitsSlice = createSlice({
    name: 'dailyHabits',
    initialState: { value: dailyHabitData },
    reducers: {
        addDailyHabit: (state, action:PayloadAction<DailyHabits>) => {
            let isPresent = state.value.some((el) => { return el.timeStamp === action.payload.timeStamp});
            if (!isPresent) {
                state.value.push({
                    timeStamp: action.payload.timeStamp,
                    habits: action.payload.habits
                })
            }
        },
        updateDailyHabit: (state, action: PayloadAction<DailyHabits>) => {
            state.value.map((dailyData,indx) => {
                    if (dailyData.timeStamp === action.payload.timeStamp) {
                        state.value[indx]['habits'] = action.payload.habits;
                      }
            })
        }
    }
})

export default DailyHabitsSlice.reducer;
export const { addDailyHabit, updateDailyHabit } = DailyHabitsSlice.actions;