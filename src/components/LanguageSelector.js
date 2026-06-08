import { useState, useEffect } from "react"
import axios from "axios"
import translations from "../translations"
import "../styles/LanguageSelector.css"

function LanguageSelector() {

    const [language, setLanguage] = useState("English")

    const [otp, setOtp] = useState("")

    const [showOtpBox, setShowOtpBox] =
    useState(false)

const t = {

    ...translations.English,

    ...(translations[language] || {})

}

    const handleLanguageChange =
    async () => {

        try {

            if(language === "French") {

                const token =
localStorage.getItem("token")

await axios.put(

    "http://localhost:3000/api/users/change-language",

    {

        language

    },

    {

        headers: {

            authorization: token

        }

    }

)

                alert("OTP Sent to Email")

                setShowOtpBox(true)

            }

            else {

    const token =
    localStorage.getItem("token")

    const response =
    await axios.put(

        "http://localhost:3000/api/users/change-language",

        {

            language

        },

        {

            headers: {

                authorization: token

            }

        }

    )

    alert(response.data.message)

    window.location.reload()

}

        }

        catch(error) {

            console.log(error)

        }

    }

    const verifyOtp = async () => {

    try {

        const token =
        localStorage.getItem("token")

        const response =
        await axios.put(

            "http://localhost:3000/api/users/verify-french-otp",

            {

                otp

            },

            {

                headers: {

                    authorization: token

                }

            }

        )

        alert(response.data.message)

        window.location.reload()

        setShowOtpBox(false)

    }

    catch(error) {

        console.log(error)

    }

}

useEffect(() => {

    const fetchProfile = async () => {

        try {

            const token =
            localStorage.getItem("token")

            const response =
            await axios.get(

                "http://localhost:3000/api/users/profile",

                {

                    headers: {

                        authorization: token

                    }

                }

            )

            setLanguage(

                response.data.language ||

                "English"

            )

        }

        catch(error) {

            console.log(error)

        }

    }

    fetchProfile()

}, [])

    return (

        <div className="language-container">

            <h1>{t.languageSelector}</h1>

            <select

                value={language}

                onChange={(e) =>
                setLanguage(e.target.value)}
            >

                <option>English</option>

                <option>Hindi</option>

                <option>Spanish</option>

                <option>Portuguese</option>

                <option>Chinese</option>

                <option>French</option>

            </select>

            <button
                onClick={handleLanguageChange}
            >

                {t.saveLanguage}

            </button>

            {

                showOtpBox && (

                    <div className="otp-box">

                        <input
                            type="text"

                            placeholder={t.enterLanguageOtp}

                            value={otp}

                            onChange={(e) =>
                            setOtp(e.target.value)}
                        />

                        <button
                            onClick={verifyOtp}
                        >

                            {t.verifyLanguageOtp}

                        </button>

                    </div>

                )

            }

        </div>

    )

}

export default LanguageSelector