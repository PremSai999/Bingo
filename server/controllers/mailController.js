const transporter = require('../models/mail.model')
const emailExistence = require('email-existence');

exports.sendWinnerMail = async(req, res)=>{
    const {name, email} = req.body
    let mailOptions = {
        from: '"Bingo Game" <prem9774@gmail.com>',
        to: email,
        subject: `Hello ${name}`,
        html: `<b>You've Won the bingo game</b>`
    };
    emailExistence.check(email, async function(err, data) {
        if (err) {
            res.json({ status: 'error' , error:err.message});
        } 
        else {
            if(data){
                try{
                    await transporter.sendMail(mailOptions)
                    res.json({ status: 'ok' , message:'Email sent successfully'})
                }
                catch(error){
                    res.json({ status: 'error' , error:error.message});
                }
            }
            else{
                res.json({ status: 'error' , message:'Wrong email'});
            }
        }
    }); 
}

exports.sendMailInvite = async(req, res)=>{
    const {name, email, room} = req.body
    let mailOptions = {
        from: '"Bingo Game" <premdb9774$@gmail.com>',
        to: email,
        subject: `Hello ${name}`,
        html: `<h3>You've been invited to the game</h3> <b>Room Code: <p>${room}</p></b>`
    };
    emailExistence.check(email, async function(err, data) {
        if (err) {
            res.json({ status: 'error' , error:err.message});
        } 
        else {
            if(data){
                try{
                    await transporter.sendMail(mailOptions)
                    res.json({ status: 'ok' , message:'Email sent successfully'})
                }
                catch(error){
                    res.json({ status: 'error' , error:error.message});
                }
            }
            else{
                res.json({ status: 'error' , message:'Wrong email'});
            }
        }
    }); 
}