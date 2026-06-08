import { useState } from "react"
import axios from "axios"
import "../styles/ResetPassword.css"

function ResetPassword() {

    const [email, setEmail] = useState("")

    const [tempPassword, setTempPassword] = useState("")

    const [newPassword, setNewPassword] = useState("")

    const [confirmPassword, setConfirmPassword] = useState("")

    const handleUpdatePassword = async () => {

    if(newPassword !== confirmPassword) {

        alert("Passwords do not match")

        return

    }

    try {

        const response = await axios.put(

            "https://community-platform-backend-xdo1.onrender.com/api/users/update-password",

            {

                email,

                tempPassword,

                newPassword

            }

        )

        alert(response.data.message)

    }

    catch(error) {

        console.log(error)

        alert(

            error.response?.data?.message ||

            "Something went wrong"

        )

    }

}

    return (

        <div className = "reset-password-container">

            <h1>

                Reset Password

            </h1>

            <p>
                Enter the email, temporary password sent to your email, and your new password to reset your password.
            </p>

            <input

                type="email"

                placeholder="Enter Email"

                value={email}

                onChange={(e) =>

                    setEmail(e.target.value)

                }

            />

            <input

                type="text"

                placeholder="Enter Temporary Password"

                value={tempPassword}

                onChange={(e) =>

                    setTempPassword(e.target.value)

                }

            />

            <input

                type="password"

                placeholder="Enter New Password"

                value={newPassword}

                onChange={(e) =>

                    setNewPassword(e.target.value)

                }

            />

            <input

                type="password"

                placeholder="Confirm Password"

                value={confirmPassword}

                onChange={(e) =>

                    setConfirmPassword(e.target.value)

                }

            />

            <button onClick={handleUpdatePassword}>

    Update Password

</button>

        </div>

    )

}

export default ResetPassword