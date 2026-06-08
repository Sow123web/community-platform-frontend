import axios from "axios"
import "../styles/GoldPlan.css"

function GoldPlan() {

    const handleActivateGold = async () => {

        try {

            const userId =
            localStorage.getItem("userId")

            const orderResponse =
            await axios.post(

                "http://localhost:3000/api/subscriptions/create-order",

                {

                    amount: 1000

                }

            )

            const { data } = orderResponse

            const keyResponse =
            await axios.get(

                "http://localhost:3000/api/subscriptions/key"

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

                        "http://localhost:3000/api/subscriptions/buy-plan",

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