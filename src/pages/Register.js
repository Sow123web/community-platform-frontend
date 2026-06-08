import axios from "axios"
import { useState } from "react"
import "../styles/Register.css"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function Register() {

    const [name, setName] = useState("")

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")

    const [phone, setPhone] = useState("")

    const navigate = useNavigate()

    const handleRegister = async (e) => {

    e.preventDefault()

    try {

        const response = await axios.post(

            "http://localhost:3000/api/users/register",

            {

                name,
                email,
                password,
                phone

            }

        )

        alert(response.data.message)
        navigate("/")

    }

    catch(error) {

        console.log(error.response)

        alert(error.response.data.message)

    }

}

    return (

        <div className="register-container">

            <h1>Register</h1>

            <form onSubmit={handleRegister}>

                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) =>
                    setName(e.target.value)}
                />

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

                <input
                    type="text"
                    placeholder="Enter Phone Number"
                    value={phone}
                    onChange={(e) =>
                    setPhone(e.target.value)}
                />

                <button type="submit">

                    Register

                </button>

                <p>

    Already have an account?

    <Link to="/">

        Login

    </Link>

</p>

            </form>

        </div>

    )

}

export default Register