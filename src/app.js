const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRouter');
const connectDB = require('./config/db');
var cors = require('cors')
const authRouter = require('./routes/authRouter');
const petRouter = require('./routes/petRouter');
const { validationResult } = require('express-validator');

dotenv.config();

const app = express();

app.use(morgan('combined'));

app.use(express.json());

/* app.use(cors());
 */

app.use(cors({
    origin: 'http://localhost:5173',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type', 'Authorization']
}));

//routes
app.use('/', userRouter)

app.use('/api/auth', authRouter)

app.use('/', petRouter)


app.use((req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
});


connectDB();

const port = process.env.PORT;

app.listen(port, () => {
    console.log('app corriendo en el puerto: ', port);
})


