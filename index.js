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

    /*
    * Odeslani emailu na jednoho uzivatele. Predpoklada jako parametr struktutu
    * {mailingListId, campaignId, email, subject, messageData, content: {}, 
    *  user:{ vocative, lastName, firstName }}
    *  
    * https://www.mailkit.eu/cz/napoveda-pomoc/dokumentace/api/dorucovani-kampane/mailkitsendmail/
    * */
    sendmail(par){
        let params = []
        params.push(this.clientId)
        params.push(this.clientMD5)
        params.push(par.mailingListId)  //kde vezmeme?
        params.push(par.campaignId)     //kde vezmeme?
        params.push({
            "send_to" : par.email,
            "subject" : par.subject,
            "message_data" : par.messageData, // co to sakra je?
            "content" : {}, // tady mohou byt promene. Asi název akce??

        })
        params.push({
            "vocative": par.user.vocative, //to se sem musí posílat?
            "prefix": par.user.prefix,    
            "last_name": par.user.lastName,
            "first_name": par.user.firstName
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
