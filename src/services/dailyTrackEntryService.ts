import { db } from "../config/firebase";
import { collection, addDoc, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { DailyTrackEntry } from "../types";


const dailyTracksEntryRef = collection(db, "daily-tracks");

export const createDailyTrackEntry = async (newDailyTrackEntry: DailyTrackEntry) => {
    return await addDoc(dailyTracksEntryRef, newDailyTrackEntry);
}

export const getDailyTrackEntriesByUserId = async (userId: string) => {

    const response: DailyTrackEntry[] = [];
    const q = query(dailyTracksEntryRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        const dailyTrackEntry = doc.data() as DailyTrackEntry;
        dailyTrackEntry.id = doc.id;
        response.push(dailyTrackEntry);
    });
    return response;
}

export const deleteDailyTrackEntry = async (dailyTrackEntryId: string) => {
    const dailyTrackEntryRef = doc(dailyTracksEntryRef, dailyTrackEntryId);
    return await deleteDoc(dailyTrackEntryRef);
}