var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var registerConfirmRouter = require('./routes/register/confirm');
var coursesRouter = require('./routes/courses');
var coursesIdRouter = require('./routes/courses/_id');
var coursesDeleteRouter = require('./routes/courses/_delete');
var coursesModifyRouter = require('./routes/courses/_modify');
var coursesCreateRouter = require('./routes/courses/create');
var uploadRouter = require('./routes/uploads/create');
var loginRouter = require('./routes/login');
var meRouter = require('./routes/me');
var schoolsRouter = require('./routes/schools');
var subjectsRouter = require('./routes/subjects');

var app = express();

app.use(cors());
app.options(['https://newsletter-client.mathieuranc.fr', 'http://localhost:3000'], cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/register/confirm', registerConfirmRouter);
app.use('/courses', coursesRouter);
app.use('/courses', coursesIdRouter);
app.use('/courses', coursesDeleteRouter);
app.use('/courses', coursesModifyRouter);
app.use('/courses', coursesCreateRouter);
app.use('/upload', uploadRouter);
app.use('/login', loginRouter);
app.use('/me', meRouter);
app.use('/schools', schoolsRouter);
app.use('/subjects', subjectsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
