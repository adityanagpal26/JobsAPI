require('dotenv').config();
require('express-async-errors');
const connectDb = require('./db/connect');
const helmet = require('helmet');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const url = process.env.DB_URL;

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authentication= require('./middleware/authentication');
const authRouter = require('./routes/auth');
const jobRouter= require('./routes/jobs');
var cors = require('cors');

app.use(helmet());
app.use(cors());
app.use(express.json());
// extra packages

// routes
app.get('/', (req, res) => {
  res.send('jobs api');
});

app.use('/api/v1/', authRouter);

app.use('/api/v1/',authentication, jobRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

connectDb(url)
   .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
   .catch((error) => {
        console.error("Failed to connect to the database:", error);
    });
