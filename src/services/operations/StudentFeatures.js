import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import rzplogo from "../../assets/Logo/Logo-Full-Light.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API  } = studentEndpoints;
console.log(process.env.RAZORPAY_KEY)

const loadScript = (src)=>{
    return new Promise((resolve)=>{
        const script = document.createElement("script")
        script.src = src
        script.onload = ()=>{
            resolve(true)
        }

        script.onerror = ()=>{
            resolve(false)
        }

        document.body.appendChild(script)

    })
}

export async function buyCourse(token,courses, navigate, dispatch, userDetails ){
    const toastId = toast.loading("Loading...")
    try {
        ///load script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")    

        if(!res){
            toast.error("Razorpay SDk failed to load")
            return
        }

        //initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, {courses}, 
            {
                Authorization:`Bearer ${token}`
            }
        )

        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message)
        }

        console.log("order.....",orderResponse.data)
        //options
        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.message.currency,
            amount: `${orderResponse.data.message.amount}`,
            order_id: orderResponse.data.message.id,
            name:"StudyNotion",
            descripton: "Thank you for purchasing the course",
            image:rzplogo,
            prefill:{
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler: function(response){
                //send successfull mail
                    sendPaymentMailResponse(response, orderResponse.data.message.amount, token)

                //verifyPayment
                verifyPayment({...response, courses}, token, navigate, dispatch)
            }
        } 

        console.log(options)

        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
        paymentObject.on("Payment Failed", function(response){
            toast.error("Oops, Payment failed")
        })






    } catch (error) {
        console.log("PAYMENT API ERROR.....", error)
        
        toast.error("Could not make payment")
    }

    toast.dismiss(toastId)
}

async function sendPaymentMailResponse (response, amount, token){
    try{
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },{
            Authorization: `Bearer ${token}`
        })
    }
    catch(error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}

async function verifyPayment(bodydata, token, navigate, dispatch){
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try{
        const response  = await apiConnector("POST", COURSE_VERIFY_API, bodydata, {
            Authorization:`Bearer ${token}`,
        })

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, ypou are addded to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }   
    catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}
