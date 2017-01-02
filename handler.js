'use strict';
const Supervise = require("./src/supervise")

const topicArn = process.env.SLS_TOPICARN

const supervise = new Supervise(topicArn)

module.exports.supervise = (event, context, cb)=>{
    supervise.run(event, context, cb)
}