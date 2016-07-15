var express = require('express');
var router = express.Router();
var usr=require('dao/dbConnect');

/* GET home page. */
router.get('/', function(req, res) {
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
if(req.session.islogin){
    res.locals.islogin=req.session.islogin;
}
  res.render('index', { title: 'HOME',test:res.locals.islogin});
});


router.route('/login')
    .get(function(req, res) {
        if(req.session.islogin){
            res.locals.islogin=req.session.islogin;
        }

        if(req.cookies.islogin){
            req.session.islogin=req.cookies.islogin;
        }
        res.render('/index', { title: '用户登录' ,test:res.locals.islogin});
    })
    .post(function(req, res) {
        client=usr.connect();
        result=null;
        console.log(req.body.username);
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
                            username: req.body.username
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

router.get('/logout', function(req, res) {
    res.clearCookie('islogin');
    req.session.destroy();
    res.redirect('/');
});

router.get('/home', function(req, res) {
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
    res.render('home', { title: 'Home', user: res.locals.islogin });
});

router.route('/')
    .get(function(req,res){
        res.render('index',{title:'注册'});
    })
    .post(function(req,res) {
        client = usr.connect();

        usr.insertFun(client,req.body.username ,req.body.password2, req.body.email, function (err) {
              if(err) throw err;
              //res.send('注册成功');
              res.redirect('/');
        });
    });

module.exports = router;

