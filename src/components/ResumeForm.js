import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import "../styles/ResumeForm.css"
import translations from "../translations"

function ResumeForm() {

    const [name, setName] = useState("")

    const [qualification, setQualification] = useState("")

    const [experience, setExperience] = useState("")

    const [skills, setSkills] = useState("")

    const [photo, setPhoto] = useState("")

    const [otp, setOtp] = useState("")

    const [otpVerified, setOtpVerified] = useState(false)
    
    const [paymentDone, setPaymentDone] = useState(false)

    const [resumeAccess, setResumeAccess] = useState(false)

    const [resumePreview, setResumePreview] = useState(null)

    const [language, setLanguage] = useState("English")

    const t = {

    ...translations.English,

    ...(translations[language] || {})

}

    const handleResume = async (e) => {

    e.preventDefault()

    try {

        const userId =
        localStorage.getItem("userId")

        const response =
        await axios.post(

            "https://community-platform-backend-xdo1.onrender.com/api/subscriptions/create-resume",

            {

                userId,

                name,

                qualification,

                experience,

                skills,

                photo

            }

        )

        alert(
            response.data.message
        )

        setResumePreview({

    name,

    qualification,

    experience,

    skills,

    photo

})

    }

    catch(error) {

        alert(
            error.response.data.message
        )

    }

}

    const handleSendOtp = async () => {

    try {

        const userId =
        localStorage.getItem("userId")

        const response =
        await axios.post(

            "https://community-platform-backend-xdo1.onrender.com/api/subscriptions/send-otp",

            {

                userId

            }

        )

        alert(response.data.message)

    }

    catch(error) {

        alert(
            error.response.data.message
        )

    }

}

const handleVerifyOtp = async () => {

    try {

        const userId =
        localStorage.getItem("userId")

        const response =
        await axios.post(

            "https://community-platform-backend-xdo1.onrender.com/api/subscriptions/verify-otp",

            {

                userId,

                otp

            }

        )

        setOtpVerified(true)

        alert(
            response.data.message
        )

    }

    catch(error) {

        alert(
            error.response.data.message
        )

    }

}

const handleResumePayment = async () => {

    try {

        const userId =
        localStorage.getItem("userId")

        const orderResponse =
        await axios.post(

            "https://community-platform-backend-xdo1.onrender.com/api/subscriptions/create-order",

            {

                amount: 50

            }

        )

        const { data } = orderResponse

        const keyResponse =
        await axios.get(

            "https://community-platform-backend-xdo1.onrender.com/api/subscriptions/key"

        )

        const options = {

            key: keyResponse.data.key,

            amount: data.amount,

            currency: data.currency,

            name: "Internship Platform",

            description:
            "Resume Creation Payment",

            order_id: data.id,

            handler: async function() {

                const response =
                await axios.put(

                    "https://community-platform-backend-xdo1.onrender.com/api/subscriptions/resume-payment",

                    {

                        userId

                    }

                )

                setPaymentDone(true)

                alert(
                    response.data.message
                )

            }

        }

        const razorpay =
        new window.Razorpay(options)

        razorpay.open()

    }

    catch(error) {

        alert(

            error.response?.data?.message ||

            error.message

        )

    }

}

useEffect(() => {

    const checkResumeAccess =
    async () => {

        try {

            const token =
            localStorage.getItem("token")

            const response =
            await axios.get(

                "https://community-platform-backend-xdo1.onrender.com/api/users/profile",

                {

                    headers: {

                        authorization:
                        token

                    }

                }

            )

            setResumeAccess(

                response.data
                .resumePaymentDone

            )

            setLanguage(
    response.data.language || "English"
)

            if(response.data.resume) {

    setResumePreview(

        response.data.resume

    )

}

            if(

                response.data
                .resumePaymentDone

            ) {

                setPaymentDone(true)

            }

        }

        catch(error) {

            console.log(error)

        }

    }

    checkResumeAccess()

}, [])

    return (

        <div className="resume-container">

            <h1>{t.resumeTitle}</h1>

            <form onSubmit={handleResume}>

                <input
                    type="text"
                    placeholder={t.enterName}
                    value={name}
                    onChange={(e) =>
                    setName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder={t.qualification}
                    value={qualification}
                    onChange={(e) =>
                    setQualification(e.target.value)}
                />

                <input
                    type="text"
                    placeholder={t.experience}
                    value={experience}
                    onChange={(e) =>
                    setExperience(e.target.value)}
                />

                <input
                    type="text"
                    placeholder={t.skills}
                    value={skills}
                    onChange={(e) =>
                    setSkills(e.target.value)}
                />

                <input
                    type="text"
                    placeholder={t.photoUrl}
                    value={photo}
                    onChange={(e) =>
                        setPhoto(e.target.value)
                    }
                />

                {

!resumeAccess &&

<>

<button
    type="button"
    onClick={handleSendOtp}
>

    {t.sendOtp}

</button>

<input
    type="text"
    placeholder={t.enterOtp}
    value={otp}
    onChange={(e) =>
        setOtp(e.target.value)
    }
/>

<button
    type="button"
    onClick={handleVerifyOtp}
>

    {t.verifyOtp}

</button>

<button
    type="button"
    onClick={handleResumePayment}
    disabled={!otpVerified}
>

    {t.payResume}

</button>

</>

}

{

resumeAccess &&

<p
    style={{

        color: "black",

        fontWeight: "bold",

        textAlign: "center"

    }}

>

    {t.resumeActivated}

</p>

}

                <button
                    type="submit"
                    disabled={!paymentDone}
                >
                    {t.generateResume}

                </button>

            </form>

            {

resumePreview &&

<div className="resume-preview">

    <h2>

        {t.professionalResume}

    </h2>

    <img

        src={resumePreview.photo}

        alt="Profile"

        className="resume-photo"

    />

    <p>

        <strong>{t.name}:</strong>

        {resumePreview.name}

    </p>

    <p>

        <strong>{t.qualificationLabel}:</strong>

        {resumePreview.qualification}

    </p>

    <p>

        <strong>{t.experienceLabel}:</strong>

        {resumePreview.experience}

    </p>

    <p>

        <strong>{t.skillsLabel}:</strong>

        {resumePreview.skills}

    </p>

</div>

}

        </div>

    )

}

export default ResumeForm