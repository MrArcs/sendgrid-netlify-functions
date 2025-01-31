const client = require("@sendgrid/mail")

function sendEmail(client, message, senderEmail, senderName) {
    return new Promise((fulfill, reject) => {
        const data = {
            from: {
                email: senderEmail,
                name: senderName
            },
            subject: 'SendGrid Form React',
            to: 'arcs_mr@outlook.com',
            html: `New form submission<br/> ${message}`

        }

        client
            .send(data)
            .then(([response, body]) => {
                fulfill(response)
            })
            .catch(error => reject(error))
    })
}

exports.handler = function(event, context, callback) {
    const {
        SENDGRID_API_KEY,
        SENDGRID_SENDER_EMAIL,
        SENDGRID_SENDER_NAME
    } = process.env

    const body = JSON.parse(event.body)
    const message = body.message
    
    console.log(body)
    console.log(body.message)
    console.log(typeof(body))
    console.log(typeof(body.message))

    client.setApiKey(SENDGRID_API_KEY)

    sendEmail(
        client,
        message,
        SENDGRID_SENDER_EMAIL,
        SENDGRID_SENDER_NAME
    )
    .then(response => callback(null, { statusCode: response.statusCode }))
    .catch(err => callback(err, null))
}
