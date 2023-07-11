import express from 'express'
import { createHabit, getHabitsByUserId, updateHabit, deleteHabit} from '../services/habitService'
import { Habit } from '../types'

const router = express.Router()

router.post('/', async (req, res) => { 
    try {
        const newHabit: Habit = {
            name: req.body.name,
            frequency: req.body.frequency,
            userId: req.body.userId
        }
        const newHabitDoc = await createHabit(newHabit)
        res.send(`Created a new habit: ${newHabitDoc.id}`)
    } catch (error) {
        console.log(error)
        res.status(400).send('Habit should include name, frequency, and userId')
    }
})

router.get('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id
        const userHabits =  await getHabitsByUserId(userId)
        res.send(userHabits)
    } catch (error) {
        console.log(error)
        res.status(400).send('Invalid user id')
    }
})


router.put('/:id', async(req, res) => {
    try {
        const habit = req.body as Habit
        habit.id = req.params.id

        await updateHabit(habit, habit.id)
        res.send(`Updated habit: ${habit.id}`)
    } catch (error) {
        console.log(error)
        res.status(400).send('Invalid habit id')
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const habitId = req.params.id
        await deleteHabit(habitId)
        res.send(`Deleted habit: ${habitId}`)
    } catch (error) {
        console.log(error)
        res.status(400).send('Invalid habit id')
    }
})

export default router