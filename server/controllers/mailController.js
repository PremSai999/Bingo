const transporter = require('../models/mail.model')

exports.sendWinnerMail = async(req, res)=>{
    const {name, email} = req.body
    let mailOptions = {
        from: 'Bingo Game',
        to: email,
        subject: `Hello ${name}`,
        html: `<b>You've Won the bingo game</b>`
    };
    const data = await transporter.sendMail(mailOptions)
    console.log(data)
    if(data)
    res.json({ status: 'ok' , message:'Email sent successfully'})
    else
    res.json({ status: 'error' , message:'Error sending email:'});
}