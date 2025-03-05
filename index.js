const express = require('express')
const { getConnection } = require('./db/connect-mongo')
require('dotenv').config()


const app = express()
const port = process.env.PORT;

getConnection();

app.use(express.json());

app.use('/user', require('./routes/user'))
app.use('/brand', require('./routes/brand'))
app.use('/equipment-state', require('./routes/equipmentState'))
app.use('/equipment-type', require('./routes/equipmentType'))
app.use('/inventory', require('./routes/inventory'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})