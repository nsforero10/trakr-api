import express from 'express'; 
import habitsRouter from './routes/habits'
import dailyTrackEntryRouter from './routes/dailyTrackEntry'

const app = express()
app.use(express.json()) // middleware transfoomrs the request body into JSON

const PORT = 3000;

//ping route
app.get('/ping', (_, res) => {
    console.log('someone pinged here!')
    res.send('pong')
});

app.use('/api/habits', habitsRouter)
app.use('/api/dailyTrackEntry', dailyTrackEntryRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})