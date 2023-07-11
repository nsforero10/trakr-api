export interface Habit { 
    id?: string
    name: string,
    frequency: [string],
    userId: string
}

export interface DailyTrackEntry {
    id?: string
    date: Date
    habitList: [string, boolean][] // [habitId, isCompleted]
    userId: string
}