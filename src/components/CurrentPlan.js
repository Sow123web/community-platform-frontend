import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "../styles/CurrentPlan.css"
import translations from "../translations"

function CurrentPlan() {

    const [plan, setPlan] = useState("")
    const navigate = useNavigate()
    const [language, setLanguage] =
useState("English")

const t = {

    ...translations.English,

    ...(translations[language] || {})

}

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const token =
                localStorage.getItem("token")

                const response =
                await axios.get(

                    "https://community-platform-backend-xdo1.onrender.com/api/users/profile",

                    {

                        headers: {

                            authorization: token

                        }

                    }

                )

                console.log(response.data)

                setPlan(
                    response.data.plan
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

    const planDetails = {

    Free: {

        price: "₹0",

        features:
        t.freeFeature

    },

    Bronze: {

        price: "₹100",

        features:
        t.bronzeFeature

    },

    Silver: {

        price: "₹300",

        features:
        t.silverFeature

    },

    Gold: {

        price: "₹1000",

        features:
        t.goldFeature

    }

}

    return (

        <div className="current-plan-card">

            <h1>{t.currentPlan}</h1>

            <h2>{plan}</h2>

            <h3>

                {

                    planDetails[plan]?.price

                }

            </h3>

            <p>

                {

                    planDetails[plan]?.features

                }

            </p>

            <button

                onClick={() =>

                    navigate(
                        "/plan-explorer"
                    )

                }

            >

                {t.explorePlans}

            </button>

        </div>

    )

}

export default CurrentPlan