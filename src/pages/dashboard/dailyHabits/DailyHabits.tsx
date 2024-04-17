import React from 'react';
import DailyHabitList from '@/app/components/DailyHabitList';
import scss from "@/app/page.module.css"

const DailyHabits = () => {

    return (
        <div className={scss.main}>
            <h1>Daily Habits page</h1>
            <DailyHabitList />
        </div>
    )
}

export default DailyHabits;