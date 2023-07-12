import { db } from '../config/firebase'
import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    doc,
    setDoc,
    deleteDoc,
} from 'firebase/firestore'
import { Habit } from '../types'

const habitsRef = collection(db, 'habits')

export const createHabit = async (newHabit: Habit) => {
    return await addDoc(habitsRef, newHabit)
}

export const getHabitsByUserId = async (userId: string) => {
    const response: Habit[] = []
    const q = query(habitsRef, where('userId', '==', userId))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        const habit = doc.data() as Habit
        habit.id = doc.id
        response.push(habit)
    })
    return response
}

export const updateHabit = async (habit: Habit, habitId: string) => {
    const habitRef = doc(habitsRef, habitId)
    await setDoc(habitRef, habit)
    return habitId
}

export const deleteHabit = async (habitId: string) => {
    const habitRef = doc(habitsRef, habitId)
    return await deleteDoc(habitRef)
}
