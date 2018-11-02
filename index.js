var xmlrpc = require('xmlrpc')

const apiEndpointJSON = "https://api.mailkit.eu/json.fcgi"
const apiEndpointRPC = "https://api.mailkit.eu/rpc.fcgi"

class Mailkit{
    constructor(clientId, clientMD5) {
        this.version = "0.1.1"
        this.clientId = clientId
        this.clientMD5 = clientMD5
        this.xmlrpcClient = xmlrpc.createSecureClient({ host: "api.mailkit.eu", port: 443, path: '/rpc.fcgi'})
    }

    /*
    * Odeslani emailu na jednoho uzivatele. Predpoklada jako parametr strukturu dle dokumentace na:
    * https://www.mailkit.eu/cz/napoveda-pomoc/dokumentace/api/dorucovani-kampane/mailkitsendmail/
    * Base64 encodování není potřeba.
    */
    sendmail(par) {
        return new Promise((resolve, reject) => {
            let params = []
            params.push(this.clientId)
            params.push(this.clientMD5)
            params.push(par.mailinglist_id)  //kde vezmeme?
            params.push(par.campaign_id)     //kde vezmeme?
            params.push({
                "send_to" : par.send_to,
                "subject" : par.subject,
                "content" : {}, // FIXME: tady mohou byt promene. Asi název akce??
            })
            params.push({
                "company" : par.company ? Buffer.from(par.company).toString("base64") : "",
                "first_name" : par.first_name ? Buffer.from(par.first_name).toString("base64") : "",
                "last_name" : par.last_name ? Buffer.from(par.last_name).toString("base64") : "",
                "prefix" : par.prefix ? Buffer.from(par.prefix).toString("base64") : "",
                "reply_to" : par.reply_to ? Buffer.from(par.reply_to).toString("base64") : "",
                "status" : par.status ? Buffer.from(par.status).toString("base64") : "",
                "vocative" : par.vocative ? Buffer.from(par.vocative).toString("base64") : ""
            })
            params.push({
                "city" : par.city ? Buffer.from(par.city).toString("base64") : "",
                "country" : par.country ? Buffer.from(par.country).toString("base64") : "",
                "fax" : par.fax ? Buffer.from(par.fax).toString("base64") : "",
                "gender" : par.gender ? Buffer.from(par.gender).toString("base64") : "",
                "mobile" : par.mobile ? Buffer.from(par.mobile).toString("base64") : "",
                "nick_name" : par.nick_name ? Buffer.from(par.nick_name).toString("base64") : "",
                "phone" : par.phone ? Buffer.from(par.phone).toString("base64") : "",
                "state" : par.state ? Buffer.from(par.state).toString("base64") : "",
                "street" : par.street ? Buffer.from(par.street).toString("base64") : "",
                "zip" : par.zip ? Buffer.from(par.zip).toString("base64") : ""
            })
            params.push({
                "custom1" : par.custom1 ? Buffer.from(par.custom1).toString("base64") : "",
                "custom2" : par.custom2 ? Buffer.from(par.custom2).toString("base64") : "",
                "custom3" : par.custom3 ? Buffer.from(par.custom3).toString("base64") : "",
                "custom4" : par.custom4 ? Buffer.from(par.custom4).toString("base64") : "",
                "custom5" : par.custom5 ? Buffer.from(par.custom5).toString("base64") : "",
                "custom6" : par.custom6 ? Buffer.from(par.custom6).toString("base64") : "",
                "custom7" : par.custom7 ? Buffer.from(par.custom7).toString("base64") : "",
                "custom8" : par.custom8 ? Buffer.from(par.custom8).toString("base64") : "",
                "custom9" : par.custom9 ? Buffer.from(par.custom9).toString("base64") : "",
                "custom10" : par.custom10 ? Buffer.from(par.custom10).toString("base64") : "",
                "custom11" : par.custom11 ? Buffer.from(par.custom11).toString("base64") : "",
                "custom12" : par.custom12 ? Buffer.from(par.custom12).toString("base64") : "",
                "custom13" : par.custom13 ? Buffer.from(par.custom13).toString("base64") : "",
                "custom14" : par.custom14 ? Buffer.from(par.custom14).toString("base64") : "",
                "custom15" : par.custom15 ? Buffer.from(par.custom15).toString("base64") : "",
                "custom16" : par.custom16 ? Buffer.from(par.custom16).toString("base64") : "",
                "custom17" : par.custom17 ? Buffer.from(par.custom17).toString("base64") : "",
                "custom18" : par.custom18 ? Buffer.from(par.custom18).toString("base64") : "",
                "custom19" : par.custom19 ? Buffer.from(par.custom19).toString("base64") : "",
                "custom20" : par.custom20 ? Buffer.from(par.custom20).toString("base64") : "",
                "custom21" : par.custom21 ? Buffer.from(par.custom21).toString("base64") : "",
                "custom22" : par.custom22 ? Buffer.from(par.custom22).toString("base64") : "",
                "custom23" : par.custom23 ? Buffer.from(par.custom23).toString("base64") : "",
                "custom24" : par.custom24 ? Buffer.from(par.custom24).toString("base64") : "",
                "custom25" : par.custom25 ? Buffer.from(par.custom25).toString("base64") : "",
            })
            params.push({
                "name" : par.name,
                "data" : par.data ? Buffer.from(par.data).toString("base64") : ""
            })

            this.xmlrpcClient.methodCall('mailkit.sendmail', params, function (error, value) {
                if (error) {
                    console.log(error)
                    reject(error)
                } else {
                    console.log (value)
                    resolve(value)
                }
            })
        })
    }

    getVersion() {
        return "Mailkit [" + this.version + "]"
    }
}

module.exports = Mailkit
