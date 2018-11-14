const koa = require('koa');
const koaRouter = require('koa-router');
const jwt = require('jsonwebtoken');
const userdb = require('./usersdb');
const port = process.env.PORT || 3000;
const key = 'secretkey';
const app = new koa();
const router = new koaRouter();

userdb.init();

router.get('/', async ctx =>{
    ctx.body = 'Welcome to jsonwebtoken API';
});

router.post('/api/private', verifysignature, async (ctx, next) =>{
    jwt.verify(ctx.request.token, key, (err, authData) => {
        if(err) {
            ctx.response.status = 403;
    } else {
    ctx.body = {message:"Private area",authData};
    }
  });
});

router.post('/api/login', async ctx =>{
    const user = userdb.userById(1);
    console.log(user);
    jwt.sign({ user }, key,  { expiresIn: '1h' }, (err, token)=>{
        console.log(token);
        ctx.body = {token};
      });
      
});

async function verifysignature(ctx, next){
    const bearerHeader = ctx.headers['authorization'];

    if(typeof bearerHeader !== 'undefined')
        {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            ctx.request.token = bearerToken;
            await next();
        }
        else{
            ctx.response.status = 403;

        }

}

app.use(router.routes()).use(router.allowedMethods);

app.listen(port, () => console.log(`Server start on port ${port}`));