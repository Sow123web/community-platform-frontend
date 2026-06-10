import axios from "axios"
import "../styles/GoldPlan.css"

function GoldPlan() {

    const handleActivateGold = async () => {

        const now = new Date()

const indianTime =
new Date(
    now.toLocaleString(
        "en-US",
        {
            timeZone: "Asia/Kolkata"
        }
    )
)

const hour = indianTime.getHours()

if(hour < 10 || hour >= 11) {

    alert(
        "Payments allowed only between 10 AM and 11 AM IST"
    )

    return

}

        try {

            const userId =
            localStorage.getItem("userId")

            const orderResponse =
            await axios.post(

                "https://community-platform-backend-xdo1.onrender.com/api/subscriptions/create-order",

                {

                    amount: 1000

                }

            )

            const { data } = orderResponse

            const keyResponse =
            await axios.get(

                "https://community-platform-backend-xdo1.onrender.com/api/subscriptions/key"

            )

            const options = {

                key: keyResponse.data.key,

                amount: data.amount,

                currency: data.currency,

                name: "Internship Platform",

                description:
                "Gold Plan Subscription",

                order_id: data.id,

                handler: async function() {

                    const response =
                    await axios.put(

                        "https://community-platform-backend-xdo1.onrender.com/api/subscriptions/buy-plan",

                        {

                            userId,

                            plan: "Gold"

                        }

                    )

                    alert(
                        response.data.message
                    )

                },

                theme: {

                    color: "#3399cc"

                }

            }

            const razorpay =
            new window.Razorpay(options)

            razorpay.open()

        }

        catch(error) {

            if(error.response) {

                alert(
                    error.response.data.message
                )

            }

            else {

                console.log(error)

            }

        }

    }

    return (

        <div className="gold-container">

            <h1>Gold Plan</h1>

            <h2>₹1000</h2>

            <ul>

                <li>Unlimited Internship Applications</li>

                <li>Community Access</li>

                <li>Resume Builder</li>

                <li>Priority Support</li>

            </ul>

            <button

                onClick={handleActivateGold}

            >

                Activate Gold Plan

            </button>

        </div>

    )

}

export default GoldPlan