import express from 'express'
import { getDailyTrackEntriesByUserId, deleteDailyTrackEntry, createDailyTrackEntry } from '../services/dailyTrackEntryService'
import { DailyTrackEntry } from '../types'

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const newDailyTrackEntry = req.body as DailyTrackEntry
        await createDailyTrackEntry(newDailyTrackEntry)
        res.send(`Created a new daily track entry: ${newDailyTrackEntry.id}`)
    } catch (error) {
        console.log(error)
        res.status(400).send('Daily track entry should include date, habitList, and userId')
    } 
})

router.get('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id
        const userDailyTrackEntries = await getDailyTrackEntriesByUserId(userId)
        res.send(userDailyTrackEntries)
    } catch(error) {
        console.log(error)
        res.status(400).send('Invalid user id')
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const dailyTrackEntryId = req.params.id
        await deleteDailyTrackEntry(dailyTrackEntryId)
        res.send(`Deleted daily track entry: ${dailyTrackEntryId}`)
    } catch(error) {
        console.log(error)
        res.status(400).send('Invalid daily track entry id')
    }
})

export default router
