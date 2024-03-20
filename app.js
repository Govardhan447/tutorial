const express = require('express')
const path = require('path')

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const app = express()

const dbpath = path.join(__dirname, 'cricketTeam.db')

let db = null

const initializDBAndServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server Running at http//:localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error:${e.message}`)
    process.exit(1)
  }
}

initializDBAndServer()

app.get('/players/', async (request, response) => {
  const getTeamQuary = `
    SELECT
      *
    FROM 
      cricket_team
    ;`

  const teamArray = await db.all(getTeamQuary)
  response.send(teamArray)
})
