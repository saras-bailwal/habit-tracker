import { HabitsSlice } from './habitsSlice';
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

export const store = configureStore({
    reducer: {
        habits: HabitsSlice.reducer
    }
})

export const useAppDispatch:() =>typeof store.dispatch=useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector