require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const session = require('express-session');
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const db = require('./db');
const pgSession = require('connect-pg-simple')(session);
//npm install express-session dotenv sequelize pg pg-hstore cors
//npm install -D nodemon 
/* -> package.json "scripts": { 
        "dev": "nodemon index.js"  
      },
*/
//npm run dev


const PORT = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(
    session({
      store: new pgSession({
        pool: db, // Your PostgreSQL database connection
      }),
      secret: '12345',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    })
  );

//------------------
app.use(errorHandler) // used as the end hook

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}

start()