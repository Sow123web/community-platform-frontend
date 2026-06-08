import axios from "axios"
import "../styles/SilverPlan.css"

function SilverPlan() {

    const handleActivateSilver = async () => {

        try {

            const userId =
            localStorage.getItem("userId")

            const orderResponse =
            await axios.post(

                "https://community-platform-backend-xdo1.onrender.com/api/subscriptions/create-order",

                {

                    amount: 300

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
                "Silver Plan Subscription",

                order_id: data.id,

                handler: async function() {

                    const response =
                    await axios.put(

                        "https://community-platform-backend-xdo1.onrender.com/api/subscriptions/buy-plan",

                        {

                            userId,

                            plan: "Silver"

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

        <div className="silver-container">

            <h1>Silver Plan</h1>

            <h2>₹300</h2>

            <ul>

                <li>5 Internship Applications / Month</li>

                <li>Community Access</li>

                <li>Resume Builder</li>

                <li>Email Support</li>

            </ul>

            <button

                onClick={handleActivateSilver}

            >

                Activate Silver Plan

            </button>

        </div>

    )

}

export default SilverPlan