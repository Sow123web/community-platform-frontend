import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import translations from "../translations"
import "../styles/SubscriptionPlans.css"

function SubscriptionPlans() {

    const navigate = useNavigate()
    const [language, setLanguage] = useState("English")
    const t = {

        ...translations.English,

        ...(translations[language] || {})

    }
    const plans = [

    {

        name: t.freePlan,

        route: "free",

        price: "₹0",

        features: t.freeFeature

    },

    {

        name: t.bronzePlan,

        route: "bronze",

        price: "₹100",

        features: t.bronzeFeature

    },

    {

        name: t.silverPlan,

        route: "silver",

        price: "₹300",

        features: t.silverFeature

    },

    {

        name: t.goldPlan,

        route: "gold",

        price: "₹1000",

        features: t.goldFeature

    }

]

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

        <div className="plans-container">

            <h1>{t.subscriptionPlans}</h1>

            <div className="plans-grid">

                {

                    plans.map((plan) => (

                        <div
    className="plan-card"
    key={plan.name}
>

    <h2>{plan.name}</h2>

    <h3>{plan.price}</h3>

    <p>{plan.features}</p>

    <button

        onClick={() =>

            navigate(

                `/${plan.name.toLowerCase()}-plan`

            )

        }

    >

        {t.subscribe}

    </button>

</div>

                    ))

                }

            </div>

        </div>

    )

}

export default SubscriptionPlans