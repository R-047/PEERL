var push = require('web-push')

// let vapidKeys = push.generateVAPIDKeys();//these are the public and the private keys

let vapidKeys = {
    publicKey: 'BARBX6QEn2bbHLOtRLNSreDlHNRH7XqkDB2oJ4Kwrxz_Clbq1jlteQigCN6VP7p0sg1mXmywHDTYfirxWN9gIR0',
    privateKey: 'rXNGDyMJhIQY5Pob3MAAtPXvo37xHnPLf31M1AUYmhE'
}

push.setVapidDetails('mailto:test@code.co.uk', vapidKeys.publicKey, vapidKeys.privateKey)


let sub={};//database of the stored people that is pulled out from the DB
push.sendNotification(sub, "test message")

console.log(vapidKeys)