var xmlrpc = require('xmlrpc')

const apiEndpointJSON = "https://api.mailkit.eu/json.fcgi"
const apiEndpointRPC = "https://api.mailkit.eu/rpc.fcgi"

class Mailkit{
    constructor(clientId, clientMD5){
        this.version = "0.1.1"
        this.clientId = clientId
        this.clientMD5 = clientMD5

        this.xmlrpcClient = xmlrpc.createClient({ host: "api.mailkit.eu", port: 80, path: '/rpc.fcgi'})
 
    }

    sendmail(par){
        let params = []
        params.push(this.clientId)
        params.push(this.clientMD5)
        params.push(par.mailingListId)  //kde vezmene
        params.push(par.campaignId)     //kde vezmem
        params.push({
            "send_to" : par.email,
            "subject" : par.subject,
            "message_data" : par.messageData,
            "content" : {}, // tady mohou byt promene. Asi název akce??

        })
        params.push({
            "vocative": par.vocative,
            "prefix": par.prefix,
            "last_name": par.lastName,
            "first_name": par.firstName
        })

        xmlrpcClient.methodCall('sendmail', params, function (error, value) {
            console.log('Method response for \'anAction\': ' + value)
        })
    }

    getVersion(){
        return "Mailkit ["+this.version+"]"
    }


}

module.exports = Mailkit
