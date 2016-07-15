var express = require('express');
var router = express.Router();
var usr=require('dao/dbConnect');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res) {
	client=usr.connect();
        result=null;
        usr.selectFun(client,req.body.username, function (result) {
            if(result[0]===undefined){
                res.send('没有该用户');
            }else{
                if(result[0].password===req.body.password){
                    req.session.islogin=req.body.username;
                    res.locals.islogin=req.session.islogin;
                    res.cookie('islogin',res.locals.islogin,{maxAge:60000});
                    //res.redirect('/');
                    res.json({
                        state: 'success',
                        datas: {
                            name: req.body.username
                        }
                    });
                }else
                {
                    //res.redirect('/');
                    res.json({
                        state: 'failure',
                        datas: null
                    });
                }
               }
        });
    
});

module.exports = router;
