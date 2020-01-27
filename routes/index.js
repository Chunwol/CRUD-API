var express = require('express');
var User = require('../models');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.redirect("/users");
});


router.get('/users', function(req, res, next) {
  User.user.findAll().then( result => {
    res.render('show', {
      users : result
    });
  });
});

router.post('/users', function(req, res, next) {
  let body = req.body;

  User.user.create({
    userid: body.inputID,
    password: body.inputPW,
    name: body.inputName
  })
  .then( result => {
    console.log("데이터 추가 완료");
    res.redirect("/users");
  })
  .catch( err => {
    console.log("공백이 있거나 중복된 사용자가 존재합니다.");
  })
});

router.delete('/users/:id', function(req, res, next) {
  let postID = req.params.id;
  
  User.user.destroy({
    where: {userid: postID}
  })
  .then( result => {
    res.redirect("/users")
  })
  .catch( err => {
    console.log("데이터 삭제 실패");
  });
});

router.get('/edit/:id', function(req, res, next) {
  let postID = req.params.id;

  User.user.findOne({
    where: {userid: postID}
  })
  .then( result => {
    res.render("edit", {
      user: result
    });
  })
  .catch( err => {
    console.log("데이터 조회 실패");
  });
});

router.put('/users/:id', function(req, res, next) {
  let  postID = req.params.id;
  let body = req.body;

  User.user.update({
    userid: body.editID,
    password: body.editPW,
    name: body.editName
  },{
    where: {userid: postID}
  })
  .then( result => {
    console.log("데이터 수정 완료");
    res.redirect("/users");
  })
  .catch( err => {
    console.log("데이터 수정 실패");
  });
});






module.exports = router;
