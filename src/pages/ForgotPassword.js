import { useState } from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import "../styles/ForgotPassword.css"

function ForgotPassword() {

    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    const handleReset = async () => {

        try {

            const response = await axios.put(

                "https://community-platform-backend-xdo1.onrender.com/api/users/forgot-password",

                {

                    email

                }

            )

            alert(response.data.message)
            navigate("/reset-password")

        }

        catch(error) {

            console.log(error)

        }

    }

    return (

        <div className="forgot-password-container">

    <h1>Forgot Password</h1>

    <p>

        Enter your registered email address.
        A password reset email will be sent to you.

    </p>

    <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) =>
            setEmail(e.target.value)
        }
    />

    <button onClick={handleReset}>

        Send Reset Email

    </button>

</div>

    )

}

export default ForgotPassword