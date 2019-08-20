const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const lst =[{
    "key":"1",
    "value":"auth data from API"
},{
    "key":"2",
    "value":"auth data from API"
}
           ]
const bal =[{
    "key":"1",
    "balance":"user list from API"
},
           {
    "key":"2",
    "balance":"user list from API"
}]
let users=[{"username":"prak","password":"prak"}];

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));
app.listen(port, () => console.log(`App listening on port ${port}!`))

app.get('/get-list', function (req, res, next) {
    res.send(bal);
}); 
app.get('/get-authrisedinfo', function (req, res, next) {
    res.send(lst);
}); 

app.post('/login', function (req, res, next) {
    console.log("logs :",req.body);
    var _userName = req.body.username;
    var _pass = req.body.password;
    var _valid = false;
    
    for (var i=0; i < users.length; i++) {
        if (users[i].username === _userName && users[i].password === _pass) {
            
            _valid =true;
        }
    }
    if(_valid){
        res.send({"status": "valid"});
    }else{
        res.send({"status": "inValid"});
    }
});