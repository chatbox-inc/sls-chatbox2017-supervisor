'use strict';

const request = require("superagent")

/**
 * 単一のエントリーを検証する
 */
class Supervisor{

    constructor(name,handler,expected)
    {
        this.name = name
        this.handler = handler
        this.expected = expected
        this.response = null
    }

    request()
    {
        return new Promise((resolve)=>{
            let req = this.handler(request)
            req.end((err,res)=>{
                if(res){
                    this.response = res
                    resolve(this)
                }else{
                    throw err
                }
            })
        })
    }

    getErrors(){
        let errors = [];
        this.expected.forEach((expectedFunc)=>{
            try{
                expectedFunc(this.response)
            }catch(e){
                errors.push(e)
            }
        })
        return errors;
    }
}



module.exports = Supervisor
