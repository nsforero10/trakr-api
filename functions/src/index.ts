import * as functions from 'firebase-functions'
import express from 'express'
import habitsRouter from './routes/habits'
import dailyTrackEntryRouter from './routes/dailyTrackEntries'
import eventRouter from './routes/events'
import journalEntryRouter from './routes/journalEntries'

const app = express()
app.use(express.json()) // middleware transfoomrs the request body into JSON

// ping route
app.get('/ping', (_, res) => {
    console.log('someone pinged here!')
    res.send('pong')
})

app.use('/api/habits', habitsRouter)
app.use('/api/dailyTrackEntries', dailyTrackEntryRouter)
app.use('/api/events', eventRouter)
app.use('/api/journalEntries', journalEntryRouter)

exports.app = functions.https.onRequest(app)
