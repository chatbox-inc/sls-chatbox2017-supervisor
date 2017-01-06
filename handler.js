'use strict';
const Supervise = require("./src/supervise")

const topicArn = process.env.SLS_TOPICARN

const supervise = new Supervise(topicArn)

module.exports.daily = (event, context, cb)=>{
    supervise.daily(event, context, cb)
}

module.exports.hourly = (event, context, cb)=>{
    supervise.hourly(event, context, cb)
}

