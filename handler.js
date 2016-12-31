'use strict';
const Jiho = require("./src/jiho")

const topicArn = process.env.SLS_TOPICARN

const jiho = new Jiho(topicArn)

module.exports.jiho = (event, context, cb)=>{
    jiho.run(event, context, cb)
}