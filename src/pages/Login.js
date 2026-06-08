import { useState } from "react"
import axios from "axios"
import "../styles/Login.css"
import { UAParser } from "ua-parser-js"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"


function Login() {

    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    const [password, setPassword] = useState("")
    const [otp, setOtp] = useState("")

const [showOtpBox, setShowOtpBox] =
useState(false)

const [loginData, setLoginData] =
useState(null)
    const handleLogin = async(e)=>{
        e.preventDefault()

        try {

            const parser = new UAParser()
            const result = parser.getResult()
            const response = await axios.post(

                "https://community-platform-backend-xdo1.onrender.com/api/users/login",

                {

    email,

    password,

    browser: result.browser.name,

    operatingSystem: result.os.name,

    device: result.device.type || "Desktop",

}

            )

            if(

    response.data.message ===

    "OTP sent for Chrome login verification"

) {

    const parser = new UAParser()

    const result = parser.getResult()

    setLoginData({

        email,

        browser:
        result.browser.name,

        operatingSystem:
        result.os.name,

        device:
        result.device.type ||
        "Desktop"

    })

    setShowOtpBox(true)

    alert(
        response.data.message
    )

}

else {

    localStorage.setItem(

        "token",

        response.data.token

    )

    localStorage.setItem(

        "userId",

        response.data.userId

    )

    navigate("/dashboard")

}

        }

        catch(error) {

            alert(error.response.data.message)

        }

    }

    const handleVerifyOtp =
async () => {

    try {

        const response =
        await axios.post(

            "https://community-platform-backend-xdo1.onrender.com/api/users/verify-login-otp",

            {

                email:
                loginData.email,

                otp,

                browser:
                loginData.browser,

                operatingSystem:
                loginData.operatingSystem,

                device:
                loginData.device,

                ipAddress:
                "Frontend"

            }

        )

        localStorage.setItem(

            "token",

            response.data.token

        )

        localStorage.setItem(

            "userId",

            response.data.userId

        )

        alert(
            response.data.message
        )

        navigate("/dashboard")

    }

    catch(error) {

        alert(

            error.response.data.message

        )

    }

}

    return (

        <div className="login-container">

            <h1>Login</h1>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) =>
                    setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) =>
                    setPassword(e.target.value)}
                />

                <button type="submit">

                    Login

                </button>

                {

showOtpBox && (

    <>

        <input

            type="text"

            placeholder="Enter OTP"

            value={otp}

            onChange={(e) =>

                setOtp(

                    e.target.value

                )

            }

        />

        <button

            type="button"

            onClick={

                handleVerifyOtp

            }

        >

            Verify OTP

        </button>

    </>

)

}

                <Link to="/forgot-password">

    Forgot Password?

</Link>

                <p>

    Don't have an account?

    <Link to="/register">

        Register

    </Link>

</p>

            </form>

        </div>

    )

}

export default Login