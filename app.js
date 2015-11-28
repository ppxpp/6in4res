
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('express-error-handler'),
  morgan = require('morgan'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  multipart = require('connect-multiparty'),
  path = require('path');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
//app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(multipart({
  uploadDir: './tmp'
}));


app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  app.locals.pretty = true;
  app.use(errorHandler());
}

// production only
if (env === 'production') {
  // TODO
  app.locals.pretty = false;
}


/**
 * Routes
 */
// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('/partials/account/:name', routes.account);

// JSON API
app.get('/api/name', api.name);
//账号登录
app.post('/api/account/login', api.login);
//站点审核
app.get('/api/check/site/undo', api.check_site_undo);
app.post('/api/check/site/action', api.check_site_action);
app.get('/api/check/site/done', api.check_site_done);
//APP审核
app.get('/api/check/app/undo', api.check_app_undo);
app.get('/api/check/app/detail', api.check_app_undo_detail);
app.post('/api/check/app/action', api.check_app_action);
app.get('/api/check/app/done', api.check_app_done);
//文件上传
app.post('/api/file/upload', api.file_upload);

//新建站点
app.post('/api/site/create', api.site_create);
//我的站点列表
app.get('/api/site/my', api.site_my);


//新建APP
app.post('/api/app/create', api.app_create);
//我的APP列表
app.get('/api/app/my', api.app_my);


// redirect all others to the index (HTML5 history)
app.get('*', routes.index);



/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
