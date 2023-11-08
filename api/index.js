import express from 'express'

const app = express()

app.listen(3000, () => {                            //it can be any port
    console.log('Server is running on port 3000')
})