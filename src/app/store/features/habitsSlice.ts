import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { habitsData } from '../../mockHabits';
export interface Habits {
    id: number;
    name: string;
    active: boolean;
}

interface HabitsState {
    habits: Habits[]
}

const initialState: HabitsState = {
    habits: habitsData
}

export const HabitsSlice = createSlice({
    name: 'habits',
    initialState,
    reducers: {
        addHabits: (state, action: PayloadAction<Habits>) => {
            let isPresent = state.habits.some((el) => { return el.name === action.payload.name});
            if (!isPresent) {
                state.habits.push({
                    id: state.habits.length + 1,
                    name: action.payload.name,
                    active: action.payload.active
                })
            }
          
        },
        deleteHabit: (state, action: PayloadAction<{id:number}>) => {
            state.habits = state.habits.filter((habit) => habit.id !== action.payload.id);
        },
        changeHabitStatus: (state, action) => {
            state.habits.map((habit) => {
              if (habit.id === action.payload.id) {
                habit.name = action.payload.name;
                habit.active = action.payload.active;
              }
            });
        },
        updateHabitName: (state, action) => {
            state.habits.map((habit) => {
              if (habit.id === action.payload.id) {
                habit.name = action.payload.name;
              }
            });
        }
    }
})

export default HabitsSlice.reducer;
export const { addHabits, deleteHabit, changeHabitStatus, updateHabitName } = HabitsSlice.actions;