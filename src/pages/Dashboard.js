import "../styles/Dashboard.css"
import LanguageSelector from "../components/LanguageSelector"
import CreatePost from "../components/CreatePost"
import PostsFeed from "../components/PostsFeed"
import AddFriend from "../components/AddFriend"
import translations from "../translations"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"


function Dashboard() {

    const navigate = useNavigate()
    const [language, setLanguage] = useState("English")
    const t = translations[language] || translations.English

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

            console.log(response.data)

            setLanguage(
                response.data.language
            )

        }

        catch(error) {

            console.log(error)

        }

    }

    fetchProfile()

}, [])

    const handleLogout = () => {

    localStorage.removeItem("token")

    navigate("/")

}

    return (

        <div className="dashboard-container">

            <nav className="navbar">

                <h2>{t.welcome}</h2>

                <button onClick={handleLogout}>{t.logout}</button>

            </nav>

            <div className="dashboard-content">

                <h1>{t.platform}</h1>

                <p>{t.platformDescription}</p>

            </div>

            <CreatePost />

    <PostsFeed />

    <LanguageSelector />

    <AddFriend />

    <div className="dashboard-actions">

    <button
        className="dashboard-btn"
        onClick={() =>
            navigate("/my-subscription")
        }
    >
        {t.mySubscription}
    </button>

    <button
        className="dashboard-btn"
        onClick={() =>
            navigate("/login-history")
        }
    >
        {t.loginHistory}
    </button>

</div>

        </div>

    )

}

export default Dashboard