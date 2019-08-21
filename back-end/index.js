const express = require('express');
const bodyParser = require('body-parser');
const jwt =require ('jsonwebtoken');
var cors = require('cors');
const app = express();
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());
app.get('/api',(req,res) =>{
    res.json({
        message:'welcome to the API'
    });
});
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', ['*']);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
var us=[{
    name:"prak",
    pass:"prak"
}]
 const pubList = {"items": [
        {"id":'1' ,"label": "Open"},
        
        {"id": "2", "label": "ZoomIn"},
        {"id": "3", "label": "Zoom Out"},
        {"id": "4", "label": "Original View"},
    ]}
 const authInfo = [ 
     {"id": "6", "label": "Find..."},
        {"id": "7", "label": "Find Again"},
        {"id": "8", "label": "Copy Again"},
        {"id": "9", "label": "Copy SVG"},
        {"id": "10", "label": "View SVG"},
        {"id": "11", "label": "View Source"},
        {"id": "12", "label": "Save As"},
        {"id": "13", "label": "About Adobe CVG Viewer..."}
 ]
app.listen(3000,()=> console.log('server started on port 3000'));
app.post('/api/posts',(req,res)=>{
//    jwt.verify(req.token, 'secretkey', (err,authData)=>{
//        if(err){
//           res.sendStatus(403);
//           }else{
//        res.append('Access-Control-Allow-Origin', ['*']);
//    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//    res.append('Access-Control-Allow-Headers', 'Content-Type');
//    
               res.json({
                   message:pubList
               })
//           }
//    })

})
//app.post('/api/postsLis',(req,res)=>{
//    console.log("res Header",req.headers)
////    jwt.verify(req.token, 'secretkey', (err,authData)=>{
////        if(err){
////           res.sendStatus(403);
////           }else{
////        res.append('Access-Control-Allow-Origin', ['*']);
////    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
////    res.append('Access-Control-Allow-Headers', 'Content-Type');
////    
//               res.json({
//                   message:pubList
//               })
////           }
////    })
//
//})

app.post('/api/postsLis',verifyToken,(req,res)=>{
    jwt.verify(req.token, 'secretkey', (err,authData)=>{
        if(err){
           //res.sendStatus(403);
            res.send({message:"session expired"})
           }else{
               res.json({
                   message:authInfo,
               })
           }
    })

})
app.post('/api/login',(req,res)=>{
    
    var _username = req.body.username;
    var _password = req.body.password;
    
    var found=false;
    if(_username == "" || _password == ""){
        res.json({message:'invalid'});
    }

    for(let i=0;i<us.length;i++){
//        console.log(us);
        console.log("_________",i);
        var te = new Object(us[i]);
         
        if(te.name == _username && te.pass == _password){
            found=true;
    
        }
    }
    if(found){
             const user ={
                username :_username,
                email :_password
            }
            jwt.sign({user:user},'secretkey',{expiresIn:'30s'},(err,token)=>{
                res.json({
                    token
                })
            })  
    }else{
        res.json({
            message:"Not found user"
        })
    }
})
app.post('/api/createUser',(req,res)=>{
    var _username = req.body.username;
    var _password = req.body.password;
    
    if(_username == "" || _password == ""){
        res.end({message:'invalid'});
    }else{
       us.push({
            name:_username,
            pass:_password
      }); 
        res.json({message:'success'});
        
    }
    
//    const user ={
//        username :_username,
//        email :_password
//    }
////    jwt.sign({user:user},'secretkey',{expiresIn:'30s'},(err,token)=>{
////        res.json({
////            token
////        })
////    })
})
function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader != 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearertoken = bearer[1];
        req.token = bearertoken;
        next();
    }else{
        res.sendStatus(403);
    }
}
















