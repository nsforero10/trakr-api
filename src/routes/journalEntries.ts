import express from 'express'
import { createJournalEntry, deleteJournalEntry, getJournalEntriesByUserId, updateJournalEntry } from '../services/journalEntryService'
import { JournalEntry } from '../types'

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const newJournalEntry = req.body as JournalEntry
        const newJournalEntryDoc = await createJournalEntry(newJournalEntry)
        res.send(`Created a new journal entry: ${newJournalEntryDoc.id}`)
    } catch (error) {
        console.log(error)
        res.status(400).send('Journal entry should include title, content, and userId')
    }
})

router.get('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id
        const userJournalEntries = await getJournalEntriesByUserId(userId)
        res.send(userJournalEntries)
    } catch (error) {
        console.log(error)
        res.status(400).send('Invalid user id')
    }
})

router.put('/:id', async (req, res) => {
    try {
        const journalEntry = req.body as JournalEntry
        const journalEntryId = req.params.id

        const updatedJournalEntryId = await updateJournalEntry(journalEntry, journalEntryId)
        res.send(`Updated journal entry: ${updatedJournalEntryId}`)
    } catch (error) {
        console.log(error)
        res.status(400).send('Invalid journal entry id')
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const journalEntryId = req.params.id
        await deleteJournalEntry(journalEntryId)
        res.send(`Deleted journal entry: ${journalEntryId}`)
    } catch (error) {
        console.log(error)
        res.status(400).send('Invalid journal entry id')
    }
})

export default router