var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const registerpersonalRouter = require('./routes/personal');
var indexRouter = require('./routes/index');
const Personal = require('./models/personal');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var app = express();
const Registration = require('./models/register');
const Login = require('./models/login');
const managerDashboardRouter = require('./routes/managerDashboard');
const userDashboardRouter = require('./routes/userDashboard');

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://Karl_Joshua:karljoshua25@cluster0.otuu8is.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/register', registerRouter);
app.use('/', loginRouter);
app.use('/manager-dashboard', managerDashboardRouter);
app.use('/user-dashboard', userDashboardRouter);


// POST route to handle form submission
app.post('/index', (req, res) => {
  const {
    fname,
    mname,
    lname,
    gender,
    address,
    region,
    city,
    civilstatus,
    zipcode,
    hobby,
  } = req.body;

  // Create a new register document
  const newPersonal = new Personal({
    fname,
    mname,
    lname,
    gender,
    address,
    region,
    city,
    civilstatus,
    zipcode,
    hobby,
  });

  // Save the register to the database
  newPersonal
    .save()
    .then(() => {
      res.redirect('/index'); // Redirect to a route that lists all registers
    })
    .catch((error) => {
      console.error('Error saving register:', error);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  const { email, password } = req.body;

  // Create a new registration document
  const newRegistration = new Registration({ email, password });

  // Save the registration to the database
  newRegistration
    .save()
    .then(() => {
      res.redirect('/login'); // Update the redirect to /login
    })
    .catch((error) => {
      console.error('Error saving registration:', error);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/', (req, res) => {
  res.render('login'); // Render the login page for the default route '/'
});

app.get('/personal', (req, res) => {
  Personal.find()
    .then((personals) => {
      res.render('personal', { personals });
    })
    .catch((error) => {
      console.error('Error retrieving registers:', error);
      res.status(500).send('Internal Server Error');
    });
});

app.post('/edit/:id', (req, res) => {
  const { id } = req.params;
  const {
    fname,
    mname,
    lname,
    gender,
    address,
    region,
    city,
    civilstatus,
    zipcode,
    hobby,
  } = req.body;

  Personal.findByIdAndUpdate(
    id,
    {
      fname,
      mname,
      lname,
      gender,
      address,
      region,
      city,
      civilstatus,
      zipcode,
      hobby,
    },
    { new: true }
  )
    .then(() => {
      res.redirect('/personal');
    })
    .catch((error) => {
      console.error('Error updating register:', error);
      res.status(500).send('Internal Server Error');
    });
});

app.use('/', indexRouter);
app.use('/personal', registerpersonalRouter);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send JSON response with error details
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status || 500,
    },
  });
});

module.exports = app;






