import express from 'express'; 
import habitsRouter from './routes/habits'
import dailyTrackEntryRouter from './routes/dailyTrackEntry'
import eventRouter  from './routes/events'
const app = express()
app.use(express.json()) // middleware transfoomrs the request body into JSON

const PORT = 3000;

//ping route
app.get('/ping', (_, res) => {
    console.log('someone pinged here!')
    res.send('pong')
});

app.use('/api/habits', habitsRouter)
app.use('/api/dailyTrackEntries', dailyTrackEntryRouter)
app.use('/api/events',eventRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})