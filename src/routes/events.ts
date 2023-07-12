import express from 'express'
import { createEvent, updateEvent, getEventsByUserId, deleteEvent } from '../services/eventService'
import { Event } from '../types'

const router  = express.Router()

router.post('/', async (req, res) => {
    try {
        const newEvent = req.body as Event
        const newEventDoc = await createEvent(newEvent)
        res.send(`Created a new event: ${newEventDoc.id}`)
    } catch (error) {
        console.log(error)
        res.status(400).send('Event should include name, description, startDate, finishDate, and userId')
    }
})

router.get('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id
        const userEvents =  await getEventsByUserId(userId)
        res.send(userEvents)
    } catch (error) {
        console.log(error)
        res.status(400).send('Invalid user id')
    }
})

router.put('/:id', async(req, res) => {
    try {
        const event = req.body as Event
        const eventId = req.params.id

        const updatedEventId = await updateEvent(event, eventId)
        res.send(`Updated event: ${updatedEventId}`)
    } catch (error) {
        console.log(error)
        res.status(400).send('Invalid event id')
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const eventId = req.params.id
        await deleteEvent(eventId)
        res.send(`Deleted event: ${eventId}`)
    } catch (error) {
        console.log(error)
        res.status(400).send('Invalid event id')
    }
})

export default router