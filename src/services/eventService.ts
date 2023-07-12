import { db } from '../config/firebase'
import { collection, addDoc, doc, setDoc, where, query, getDocs, deleteDoc } from 'firebase/firestore'
import { Event } from '../types'

const eventsRef = collection(db, "events")

export const createEvent = async (newEvent: Event) => {
    newEvent.startDate = new Date(newEvent.startDate)
    newEvent.finishDate = new Date(newEvent.finishDate)
    return await addDoc(eventsRef, newEvent)
}

export const updateEvent = async (event: Event, eventId: string) => {
    const eventRef = doc(eventsRef, eventId)
    await setDoc(eventRef, event)
    return eventId
}

export const getEventsByUserId = async (userId: string) => {
    const response: Event[] = []
    const q =  query(eventsRef, where("userId", "==", userId))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        const event = doc.data() as Event
        event.id = doc.id
        response.push(event)
    });
    return response
}

export const deleteEvent = async (eventId: string) => {
    const eventRef = doc(eventsRef, eventId)
    return await deleteDoc(eventRef)
}