import axios from "axios"
import "../styles/BronzePlan.css"

function BronzePlan() {

    const handleActivateBronze = async () => {

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

            // CREATE ORDER

            const orderResponse =
            await axios.post(

                "https://community-platform-backend-xdo1.onrender.com/api/subscriptions/create-order",

                {

                    amount: 100

                }

            )

            const { data } = orderResponse

            // GET RAZORPAY KEY

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
                "Bronze Plan Subscription",

                order_id: data.id,

                handler: async function(response) {

    alert("Razorpay Success");

    console.log("RAZORPAY RESPONSE:", response);

    try {

        const buyPlanResponse =
        await axios.put(

            "https://community-platform-backend-xdo1.onrender.com/api/subscriptions/buy-plan",

            {

                userId,

                plan: "Bronze"

            }

        )

        console.log(
            "BUY PLAN RESPONSE:",
            buyPlanResponse.data
        )

        alert(
            buyPlanResponse.data.message
        )

    }

    catch(error) {

        console.log(
            "BUY PLAN ERROR:",
            error.response?.data || error
        )

        alert(
            error.response?.data?.message ||
            error.message
        )

    }

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

