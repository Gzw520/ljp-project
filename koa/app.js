const Koa = require('koa')
const Router = require('koa-router')()
const Db = require('./mongo.js')
const bodyParser = require('koa-bodyparser')
const cors = require('koa-cors')
const Static = require('koa-static')
// const sendmsg = require('./sendmsg')
const multer = require('koa-multer')
const views = require('koa-views')
const svgCaptcha = require('svg-captcha')
const SMSClient = require('@alicloud/sms-sdk') //阿里云接口
const accessKeyId = ' '//你自己在阿里云后台的accessKeyId
const secretAccessKey = 'K你自己在阿里云后台的'//secretAccessKey


const app = new Koa()

const storage = multer.diskStorage({
  //文件服务端存储位置
  destination(req, file, cb) {
    cb(null, 'public/uploads')
  },
  //文件名
  filename(req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

Router.get('/code', async (ctx, next) => {
  next()
  const cap = svgCaptcha.create({
    size: 4,
    width: 74,
    height: 28,
    fontSize: 40,
    ignoreChars: '0oO1ilI',
    noise: 2,
    color: true,
    background: '#eee'
  })
  let img = cap.data
  let text = cap.text.toLowerCase()
  ctx.type = 'html'
  ctx.body = {
    result: `${img}`,
    text: text
  }
})

Router.get('/sendmsg', async (ctx, next) => {
  next()
  const tel = ctx.query.tel
  var number = "";
  for (var i = 0; i < 6; i++) {
    number += Math.floor(Math.random() * 10)
  }
  //初始化sms_client
  let smsClient = new SMSClient({ accessKeyId, secretAccessKey })
  //发送短信
  var s = await smsClient.sendSMS({
    PhoneNumbers: tel,
    SignName: '影子是流年的心',
    TemplateCode: 'SMS_189623625',
    TemplateParam: `{"code":'${number}'}`
  })
  if (s.Code == "OK") {
    ctx.body = { code: 1, msg: number }
  } else {
    ctx.body = { code: 0 }
  }
});

Router.get('/uplode', async (ctx, next) => {
  next()
  await ctx.render('uplode')
})

Router.post('/upload', upload.single('file'), async (ctx, next) => {
  next()
  const { shopname, price, description, pid, id } = ctx.req.body;
  const img = ctx.request.origin + '/uploads/' + ctx.req.file.originalname;
  await Db.insert('navdetail', { shopname, pid, img })
  await Db.insert('navdetail', { shopname, price, description, pid, id, img })

  // console.log(ctx.req.file);
  // console.log(ctx.req.body);
  // console.log(ctx.request.origin);
  // console.log(ctx.request.origin + '/uploads/' + ctx.req.file.originalname);

})

Router.get('/demo', async (ctx, next) => {
  next()
  const result = await Db.findmuch('type', 'list', 'pid', 'pid')
  ctx.body = {
    result: result
  }
})

Router.get('/nav', async (ctx, next) => {
  next()
  const result = await Db.find('navlist', {})
  ctx.body = {
    result: result
  }
})

Router.get('/type', async (ctx, next) => {
  next()
  const id = ctx.query.pid
  const result = await Db.findtype('navlist', 'navdetail', 'pid', 'pid', id)
  ctx.body = {
    result: result
  }
})

Router.get('/homeDetail', async (ctx, next) => {
  next()
  const detailid = {}
  detailid.id = ctx.query.id
  const result = await Db.find('list', detailid)
  ctx.body = {
    result: result
  }
})

Router.get('/typeDetail', async (ctx, next) => {
  next()
  const detailid = {}
  detailid.id = ctx.query.id
  const result = await Db.find('navdetail', detailid)
  ctx.body = {
    result: result
  }
})

Router.get('/search', async (ctx, next) => {
  next()
  const result = await Db.find('navdetail', {})
  ctx.body = {
    result: result
  }
})

Router.post('/cart', async (ctx, next) => {
  next()
  try {
    const { num, img, shopname, price } = ctx.request.body
    const hasData = await Db.find('cart', { 'shopname': shopname })
    if (hasData.length > 0) {
      await Db.update('cart', { 'shopname': shopname, 'img': img, 'price': price }, { 'num': parseInt(hasData[0].num) + parseInt(num) })
    } else {
      await Db.insert('cart', { 'num': parseInt(num), img, shopname, price })
    }
    ctx.body = { 'success': true, 'mes': '增加购物车成功！' };
  } catch (err) {
    ctx.body = { 'success': false, 'mes': '增加购物车失败！' };
  }
})

Router.post('/register', async (ctx, next) => {
  next()
  const { username, password, email, tel } = ctx.request.body
  const hasUser = await Db.find('user', { 'username': username })
  if (hasUser.length > 0) {
    ctx.body = {
      state: '用户名重复！'
    }
  } else {
    await Db.insert('user', { username, password, email, tel })
    ctx.body = {
      state: '注册成功！'
    }
  }
})

Router.post('/login', async (ctx, next) => {
  next()
  const { username, password } = ctx.request.body
  const hasName = await Db.find('user', { 'username': username })
  if (hasName.length == 0) {
    ctx.body = {
      state: '用户名错误！'
    }
  }
  const hasPass = await Db.find('user', { 'password': password })
  if (hasPass.length == 0) {
    ctx.body = {
      state: '密码错误！'
    }
  }
  if (hasName.length > 0 && hasPass.length > 0) {
    ctx.body = {
      state: '登陆成功！'
    }
  }
})

Router.post('/findtel', async (ctx, next) => {
  next()
  const { tel } = ctx.request.body
  const result = await Db.find('user', { 'tel': tel })
  if (result.length > 0) {
    ctx.body = {
      success: true
    }
  } else {
    ctx.body = {
      success: '电话号码不存在！'
    }
  }
})

Router.post('/newpass', async (ctx, next) => {
  next()
  const { tel, newpass } = ctx.request.body
  await Db.update('user', { 'tel': tel }, { 'password': newpass })
  ctx.body = {
    success: '修改成功！'
  }
})

app.use(views('views', { extension: 'ejs' }))
app.use(bodyParser())

app.use(Router.routes())
  .use(Router.allowedMethods())
  .use(cors())
  .use(Static(__dirname + '/public'))


app.listen(8000, _ => {
  console.log('app running in http://localhost:8000');
})







