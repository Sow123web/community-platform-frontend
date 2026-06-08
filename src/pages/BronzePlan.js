import axios from "axios"
import "../styles/BronzePlan.css" 

function BronzePlan() {

    const handleActivateBronze = async () => {

        try {

            const userId =
            localStorage.getItem("userId")

            // CREATE ORDER

            const orderResponse =
            await axios.post(

                "http://localhost:3000/api/subscriptions/create-order",

                {

                    amount: 100

                }

            )

            const { data } = orderResponse

            // GET RAZORPAY KEY

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
                "Bronze Plan Subscription",

                order_id: data.id,

                handler: async function() {

                    const response =
                    await axios.put(

                        "http://localhost:3000/api/subscriptions/buy-plan",

                        {

                            userId,

                            plan: "Bronze"

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

        <div className="bronze-container">

    <div className="bronze-card">

        <h1>Bronze Plan</h1>

        <h2 className="bronze-price">₹100</h2>

        <ul>

            <li>3 Internship Applications / Month</li>

            <li>Community Access</li>

            <li>Resume Builder</li>

            <li>Email Support</li>

        </ul>

        <button
            className="bronze-btn"
            onClick={handleActivateBronze}
        >
            Activate Bronze Plan
        </button>

    </div>

</div>

    )

}

export default BronzePlan
