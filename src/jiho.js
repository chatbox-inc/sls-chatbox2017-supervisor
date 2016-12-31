'use strict';
const AWS = require('aws-sdk')
const sns = new AWS.SNS()

const moment = require("moment-timezone")

const textList = {
    9 : "おはようございます。\n9時をお知らせします。\n",
    10 : "10時をお知らせします。\n今日も1日頑張りましょう！",
    11 : "11時をお知らせします。",
    12 : "12時をお知らせします。",
    13 : "進捗はいかがですか？\n13時になりました。\n",
    14 : "14時です。\nお昼はもうとりましたか？",
    15 : "15時をお知らせします。",
    16 : "16時をお知らせします。",
    17 : "17時です。\n進捗をまとめて帰宅の準備を始めましょう。",
    18 : "18時をお知らせします。",
    19 : "お疲れ様でした！19時です。\n明日も1日よろしくお願いします。",
    20 : "20時をお知らせします。",
}

class Jiho{

    constructor(topicArn)
    {
        this.topicArn = topicArn;
    }

    getMessage(text)
    {
        return JSON.stringify({
            channel: "#chatbox",
            text
        })
    }

    getDoneCb(cb)
    {
        return (err, result) => cb(null, {
            statusCode: err ? '500' : '200',
            body: err ? err.message : JSON.stringify(result),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    run(event, context, cb)
    {
        const hour = moment().tz("Asia/Tokyo").hour()
        const text = textList[hour] || "勤務時間外です";
        const Message = this.getMessage(text)
        const TopicArn = this.topicArn
        const done = this.getDoneCb(cb)
        if(text){
            sns.publish({
                Message,
                Subject: "SLS JIHO APPLICATION",
                TopicArn
            }, done)
        }else{
            cb(null)
        }
    }
}

module.exports = Jiho
