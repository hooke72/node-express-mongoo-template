const express = require ('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()
app.use(express.json({ extended: true }))


app.use('/api/', require('./routes/index'))

async function mongooseConnect() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        const PORT = config.get('port') || 5000
        app.listen(PORT, () => console.log(`Started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

mongooseConnect().then( () => console.log("Base is connected"))
