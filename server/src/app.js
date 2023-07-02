require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const port = process.env.PORT ?? 4000;
const swaggerUi = require('swagger-ui-express')
const YAML = require('yaml');
const fs = require('fs');
const { sequelize } = require('./models');
sequelize.sync();

// import swagger.yaml
const file  = fs.readFileSync('swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

const indexRouter = require('./routes');
const usersRouter = require('./routes/users');

const app = express();

// server swagger-ui
app.use("/swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);
app.use("/swagger.json", (req, res) => res.json(swaggerDocument));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

