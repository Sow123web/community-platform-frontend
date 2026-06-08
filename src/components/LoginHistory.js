import { useEffect, useState } from "react"
import axios from "axios"
import translations from "../translations"
import "../styles/LoginHistory.css"

function LoginHistory() {

    const [history, setHistory] =
    useState([])

    const [language, setLanguage] =
useState("English")

const t = {

    ...translations.English,

    ...(translations[language] || {})

}

    useEffect(() => {

        const fetchProfile =
        async () => {

            try {

                const token =
                localStorage.getItem("token")

                const response =
                await axios.get(

                    "http://localhost:3000/api/users/profile",

                    {

                        headers: {

                            authorization:
                            token

                        }

                    }

                )

                setHistory(

                    response.data
                    .loginHistory || []

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

        <div
            className=
            "login-history-container"
        >

            <h2>

    {t.loginHistory}

</h2>

        <div className="history-grid">
            {

                history.length === 0 ?

                (

                    <p>

    {t.noLoginHistory}

</p>

                )

                :

                history.map((item, index) => (

                    <div

                        key={index}

                        className=
                        "history-card"

                    >

                        <p>

                            {t.browser}:

                            {item.browser}

                        </p>

                        <p>

                            {t.operatingSystem}:

                            {item.operatingSystem}

                        </p>

                        <p>

                            {t.device}:

                            {item.device}

                        </p>

                        <p>

                            {t.ipAddress}:

                            {item.ipAddress}

                        </p>

                        <p>

                            {t.loginTime}:

                            {

                                new Date(

                                    item.loginTime

                                )

                                .toLocaleString()

                            }

                        </p>

                    </div>

                ))

            }

            </div>

        </div>

    )

}

export default LoginHistory