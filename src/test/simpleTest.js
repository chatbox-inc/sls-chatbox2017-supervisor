
const Supervisor = require("../supervisor")

const handler = (url)=>{
    return (request)=>{
        return request.get(url)
    }
}

const expect = (status)=>{
    return [(response)=>{
        if(response.status !== status){
            throw new Error(`statusCode expected ${status} But get ${response.status}`)
        }
        return true;
    }];
}

const factory = (url,status)=>{
    status = status || 200;
    const h = handler(url);
    const e = expect(status);
    const name = `Entry should send statusCode ${status}: ${url}`
    return new Supervisor(name,h,e)
}

module.exports = factory