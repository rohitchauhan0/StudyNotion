const Contact = require("../models/Contact")

exports.createContact = async (req,res)=>{
    try {
        const {firstname, lastname, email, message, phoneNum} = req.body

        if(!firstname || !email || !message || !phoneNum){
            res.json({
                success:false,
                message:"All fields are required"
            })
        }
        const createContactDetails = await Contact.create({
            firstname, lastname, email, phoneNum, message
        })
        console.log(createContactDetails)
        res.status(200).json({
            success:true,
            message:"Message successfully sent",
            data:createContactDetails
        })
        

    } catch (error) {
            console.log(error)
            res.status(500).json({
                success:false,
                message:"Error while sending message"
            })
    }
}