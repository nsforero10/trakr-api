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

export interface Event {
    id?: string
    name: string
    description: string
    startDate: Date | number
    finishDate: Date | number
    userId: string
}