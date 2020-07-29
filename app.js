// Created by szatpig at 2018/9/13.
const Koa = require('koa');
// const cors = require( 'koa-cors');
const jwt = require('koa-jwt');

const BodyParse = require('koa-bodyparser');
const logger = require('koa-logger');

const config = require('./config');
const route = require('./routes');
const InterfaceBuffer = require('./lib/InterfaceHelper');

const app = new Koa();

app.use(BodyParse());
app.use(logger());
// app.use(cors());

app.use(InterfaceBuffer('^/api'));

app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.status = err.status || 500;
        throw new Error(err);
        // logger.error(`${err.status} -- ${err.message}\n${err.stack}`)
    }
});

app.use(async (ctx, next) => {
    await next();
    if (ctx.status === 404) {
        // ctx.throw(400, 'name required');
        ctx.body = '404 No Found';
    }
});




app.use(route.routes()).use(route.allowedMethods());

app.listen(config.port);

console.log('The first koa project is running : http://localhost:' + config.port);

module.exports = app;