/*
 * Serve JSON to our AngularJS client
 */

var config = require('./conf'),
    http = require('http');

exports.name = function (req, res) {
  res.json({
    name: 'Bob'
  });
};

exports.login = function (request, response) {
  var name_test = 'admin@6able.com';
  var password_test = 'password';
  var userName = request.body.userName;
  var password = request.body.password;
  var isAdmin = request.body.isAdmin;
  console.log('request body = ' + request.body);
  var data = JSON.stringify(request.body);
  console.log('data = ' + data);

  var options = {
    host: config.server.url,
    port: config.server.port,
    path: '/api/auth/login',
    method: 'POST'
  };

  var req = http.request(options, function (res) {
    //console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    var body = '';
    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function () {
      console.log('body = ' + body);
      response.end(body);
    })
  }).on('error', function (e) {
    response.json({
      errno: 3,
      token: '123456789'
    });
  });
  req.write(data + "\n");
  req.end();
};

exports.check_site_undo = function (request, response) {

  console.log(request.query);
  var page = request.query.page;
  var token = request.query.token;
  var pageSize = request.query.pageSize;
  var options = {
    host: config.server.url,
    port: config.server.port,
    path: '/api/check/site/undo?page=' + page + "&pageSize=" + pageSize + "&token=" + token,
    method: 'GET'
  };

  var req = http.get(options, function(res) {
    //console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));
    var bodyChunks = [];
    res.on('data', function(chunk) {
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = Buffer.concat(bodyChunks);
      //var result = JSON.parse(body);
      //console.log('BODY: ' + body);
      response.end(body);
    })
  });

  req.on('error', function(e) {
    console.log('ERROR: ' + e.message);
  });
};



exports.check_site_action = function (request, response) {
  /*var name_test = 'admin@6able.com';
  var password_test = 'password';
  var userName = request.body.userName;
  var password = request.body.password;
  var isAdmin = request.body.isAdmin;*/

  console.log('request body = ' + request.body);
  var data = JSON.stringify(request.body);
  var token = request.query.token;
  var options = {
    host: config.server.url,
    port: config.server.port,
    path: '/api/check/site/action?token='+token,
    method: 'POST'
  };


  var req = http.request(options, function (res) {
    //console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));
    var body = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      body = body + chunk;
    });
    res.on('end', function () {
      //var body = Buffer.concat(bodyChunks);
      //console.log('body: ' + body);
      response.end(body);
    })
  }).on('error', function (e) {
    response.json({
      errno: 1
    });
  });
  req.write(data + "\n");
  req.end();
};


exports.check_site_done = function (request, response) {

  console.log(request.query);
  var page = request.query.page;
  var token = request.query.token;
  var pageSize = request.query.pageSize;
  var options = {
    host: config.server.url,
    port: config.server.port,
    path: '/api/check/site/done?page=' + page + "&pageSize=" + pageSize + "&token=" + token,
    method: 'GET'
  };

  var req = http.get(options, function(res) {
    //console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));
    var bodyChunks = [];
    res.on('data', function(chunk) {
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = Buffer.concat(bodyChunks);
      //var result = JSON.parse(body);
      //console.log('BODY: ' + body);
      response.end(body);
    })
  });

  req.on('error', function(e) {
    console.log('ERROR: ' + e.message);
  });
};



exports.check_app_undo = function (request, response) {

  console.log(request.query);
  var page = request.query.page;
  var token = request.query.token;
  var pageSize = request.query.pageSize;
  var options = {
    host: config.server.url,
    port: config.server.port,
    path: '/api/check/app/undo?page=' + page + "&pageSize=" + pageSize + "&token=" + token,
    method: 'GET'
  };

  var req = http.get(options, function(res) {
    //console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));
    var bodyChunks = [];
    res.on('data', function(chunk) {
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = Buffer.concat(bodyChunks);
      //var result = JSON.parse(body);
      console.log('BODY: ' + body);
      response.end(body);
    })
  });

  req.on('error', function(e) {
    console.log('ERROR: ' + e.message);
  });
};

exports.check_app_done = function (request, response) {

  console.log(request.query);
  var page = request.query.page;
  var token = request.query.token;
  var pageSize = request.query.pageSize;
  var options = {
    host: config.server.url,
    port: config.server.port,
    path: '/api/check/app/done?page=' + page + "&pageSize=" + pageSize + "&token=" + token,
    method: 'GET'
  };

  var req = http.get(options, function(res) {
    //console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));
    var bodyChunks = [];
    res.on('data', function(chunk) {
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = Buffer.concat(bodyChunks);
      //var result = JSON.parse(body);
      //console.log('aaaBODY: ' + body);
      response.end(body);
    })
  });

  req.on('error', function(e) {
    console.log('ERROR: ' + e.message);
  });
};

exports.check_app_undo_detail = function (request, response) {

  //console.log(request.query);
  var token = request.query.token;
  var id = request.query.id;
  var options = {
    host: config.server.url,
    port: config.server.port,
    path: '/api/check/app/detail?id=' + id + "&token=" + token,
    method: 'GET'
  };

  var req = http.get(options, function(res) {
    //console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));
    var bodyChunks = [];
    res.on('data', function(chunk) {
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = Buffer.concat(bodyChunks);
      //var result = JSON.parse(body);
      //console.log('BODY: ' + body);
      response.end(body);
    })
  });

  req.on('error', function(e) {
    //console.log('ERROR: ' + e.message);
  });
};



exports.check_app_action = function (request, response) {
  /*var name_test = 'admin@6able.com';
   var password_test = 'password';
   var userName = request.body.userName;
   var password = request.body.password;
   var isAdmin = request.body.isAdmin;*/

  //console.log(request.body);
  var data = JSON.stringify(request.body);
  var token = request.query.token;
  //console.log('request body = ' + data);
  var options = {
    host: config.server.url,
    port: config.server.port,
    path: '/api/check/app/action?token='+token,
    method: 'POST'
  };


  var req = http.request(options, function (res) {
    //console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));
    var body = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      body = body + chunk;
    });
    res.on('end', function () {
      //var body = Buffer.concat(bodyChunks);
      //console.log('body: ' + body);
      response.end(body);
    })
  }).on('error', function (e) {
    response.json({
      errno: 1
    });
  });
  req.write(data + "\n");
  req.end();
};

function doPostRequest(url, postData){

}

exports.site_create = function(request, response){
  var data = JSON.stringify(request.body);
  var token = request.query.token;
  //console.log('request body = ' + data);
  var options = {
    host: config.server.url,
    port: config.server.port,
    path: '/api/site/create?token='+token,
    method: 'POST'
  };
  var req = http.request(options, function (res) {
    //console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));
    var body = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      body = body + chunk;
    });
    res.on('end', function () {
      //var body = Buffer.concat(bodyChunks);
      //console.log('body: ' + body);
      response.end(body);
    })
  }).on('error', function (e) {
    response.json({
      errno: 1
    });
  });
  req.write(data + "\n");
  req.end();
};

exports.site_my = function (request, response) {

  console.log(request.query);
  var page = request.query.page;
  var token = request.query.token;
  var pageSize = request.query.pageSize;
  var options = {
    host: config.server.url,
    port: config.server.port,
    path: '/api/site/my?page=' + page + "&pageSize=" + pageSize + "&token=" + token,
    method: 'GET'
  };

  var req = http.get(options, function(res) {
    //console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));
    var bodyChunks = [];
    res.on('data', function(chunk) {
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = Buffer.concat(bodyChunks);
      //var result = JSON.parse(body);
      //console.log('BODY: ' + body);
      response.end(body);
    })
  });

  req.on('error', function(e) {
    console.log('ERROR: ' + e.message);
  });
};

exports.app_create = function(request, response){
  var data = JSON.stringify(request.body);
  var token = request.query.token;
  //console.log('request body = ' + data);
  var options = {
    host: config.server.url,
    port: config.server.port,
    path: '/api/app/create?token='+token,
    method: 'POST'
  };
  var req = http.request(options, function (res) {
    //console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));
    var body = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      body = body + chunk;
    });
    res.on('end', function () {
      //var body = Buffer.concat(bodyChunks);
      //console.log('body: ' + body);
      response.end(body);
    })
  }).on('error', function (e) {
    response.json({
      errno: 1
    });
  });
  req.write(data + "\n");
  req.end();
};

exports.app_my = function (request, response) {

  console.log(request.query);
  var page = request.query.page;
  var token = request.query.token;
  var pageSize = request.query.pageSize;
  var options = {
    host: config.server.url,
    port: config.server.port,
    path: '/api/app/my?page=' + page + "&pageSize=" + pageSize + "&token=" + token,
    method: 'GET'
  };

  var req = http.get(options, function(res) {
    //console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));
    var bodyChunks = [];
    res.on('data', function(chunk) {
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = Buffer.concat(bodyChunks);
      //var result = JSON.parse(body);
      //console.log('BODY: ' + body);
      response.end(body);
    })
  });

  req.on('error', function(e) {
    console.log('ERROR: ' + e.message);
  });
};


var fs = require("fs");

exports.file_upload = function (request, response) {
  console.log(request.body);
  console.log(request.query);
  console.log(request.files);
  var token = request.query.token || 'null';
  var milliseconds = (new Date).getTime();
  var size = 0;// || 0;
  if(request.files.hasOwnProperty('file')){
    size = request.files.file.size;
  }else{
    console.log('no property');
  }
  if(size == 0){
    console.log('no file upload');
    response.json({
      errno: 1//no file uploaded
    });
    return;
  }
  var tmp_path = request.files.file.path;
  //console.log(tmp_path);
  var target_name = milliseconds + '_' + request.files.file.name;
  var target_path = 'file/' + target_name;
  //同步重命名文件名
  fs.rename(tmp_path, './public/' + target_path, function(err) {
    if (err) throw err;
    // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
    fs.unlink(tmp_path, function() {
      if (err) throw err;
      response.json({
        errno: 0,
        url: config.server.localHost + '/' + target_path,
        size: size
      });
    });
  });
};






