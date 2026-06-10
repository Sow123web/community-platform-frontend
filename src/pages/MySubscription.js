import CurrentPlan from "../components/CurrentPlan"
import ResumeForm from "../components/ResumeForm"
import { useEffect, useState } from "react"
import axios from "axios"

function MySubscription() {

    const [plan, setPlan] = useState("")

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

                setPlan(response.data.plan)

            }

            catch(error) {

                console.log(error)

            }

        }

        fetchProfile()

    }, [])

    const isPremium =

        plan === "Bronze" ||
        plan === "Silver" ||
        plan === "Gold"

    return (

        <div>

            <CurrentPlan />

            {

                isPremium &&

                <ResumeForm />

            }

        </div>

    )

}

export default MySubscription