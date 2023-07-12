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
import { JournalEntry } from '../types'

const journalEntriesRef = collection(db, 'journalEntries')

export const createJournalEntry = async (newJournalEntry: JournalEntry) => {
    return await addDoc(journalEntriesRef, newJournalEntry)
}

export const getJournalEntriesByUserId = async (userId: string) => {
    const response: JournalEntry[] = []
    const q = query(journalEntriesRef, where('userId', '==', userId))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        const journalEntry = doc.data() as JournalEntry
        journalEntry.id = doc.id
        response.push(journalEntry)
    })
    return response
}

export const updateJournalEntry = async (
    journalEntry: JournalEntry,
    journalEntryId: string,
) => {
    const journalEntryRef = doc(journalEntriesRef, journalEntryId)
    await setDoc(journalEntryRef, journalEntry)
    return journalEntryId
}

export const deleteJournalEntry = async (journalEntryId: string) => {
    const journalEntryRef = doc(journalEntriesRef, journalEntryId)
    return await deleteDoc(journalEntryRef)
}
