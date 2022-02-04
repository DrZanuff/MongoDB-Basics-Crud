const router = require('express').Router()
const Person = require('../models/Person')

router.post('/', async (req, res) => {
  const { name, salary, approved } = req.body

  const person = {
    name,
    salary,
    approved,
  }

  try {
    await Person.create(person)

    res.status(201).json({ person })
  } catch (e) {
    res.status(500).json({ error: e })
  }
})

router.get('/', async (req, res) => {
  try {
    const people = await Person.find({}, { __v: 0 })

    res.status(200).json({ people })
  } catch (e) {
    res.status(500).json({ error: e })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    console.log(id)

    const person = await Person.findOne({ _id: id })

    if (!person) {
      res.status(422).json({ message: 'User not found...' })
      return
    }

    res.status(200).json(person)
  } catch (e) {
    res.status(500).json({ error: e })
  }
})

router.patch('/:id', async (req, res) => {
  const id = req.params.id
  const { name, salary, approved } = req.body

  const person = {
    name,
    salary,
    approved,
  }

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person)

    if (updatedPerson.matchedCount === 0) {
      res.status(422).json({ message: 'User not found...' })
      return
    }

    res.status(200).json(person)
  } catch (e) {
    res.status(500).json({ error: e })
  }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const removedPerson = await Person.deleteOne({ _id: id })

    if (removedPerson.matchedCount === 0) {
      res.status(422).json({ message: 'User not found...' })
      return
    }

    res.status(200).json(removedPerson)
  } catch (e) {
    res.status(500).json({ error: e })
  }
})

module.exports = router
