var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Comet Studio' });
});

router.post('/', function(req, res, next) {
  res.send(req.body);
  console.log(req.body);
});

router.get('/app/:appName', function(req, res, next) {
  res.render(req.params.appName, { title: req.params.appName });
});

router.get('/game/:gameName', function(req, res, next) {
  res.render(req.params.gameName, { title: req.params.gameName });
});

router.get('/AD', function(req, res, next) {
  res.render('AD', { title: 'AD' });
});

router.get('/access', function(req, res, next) {
  res.render('access');
});

router.post('/access', function(req, res, next) {

  var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'c9'
  });
  
  connection.connect();
  var loc = req.body.loc.split(',');
  console.log(loc[0]);
  console.log(loc[1]);
  connection.query('INSERT INTO access_recode (ip, city, country, latitude, longitude) VALUE (?, ?, ?, ?, ?)',
    [
      req.body.ip,
      req.body.city,
      req.body.country,
      loc[0],
      loc[1]
    ],
    function(err, rows, fields) {
    if (err) throw err;
  });

  connection.end();
  res.end();
});

/*router.get('/access_amount', function(req, res, next) {

  var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'c9'
  });
  
  connection.connect();

  connection.query("SELECT COUNT(*) FROM access_recode", function(err, rows, fields) {
    if (err) throw err;
    res.json({"amount": rows[0]["COUNT(*)"]});
  });

  connection.end();
});

router.get('/tuya_cruiser', function(req, res, next) {
  res.render('content', {content: "test content"});
});*/

module.exports = router;
