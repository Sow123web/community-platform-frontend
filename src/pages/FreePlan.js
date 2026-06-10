import "../styles/FreePlan.css"

function FreePlan() {

    const handleActivatePlan = () => {

    alert(

        "Free Plan Activated Successfully"

    )

}

    return (

        <div className = "free-container">

            <h1>Free Plan</h1>

            <h3>₹0</h3>

            <ul>

                <li>Community Access</li>

                <li>Basic Dashboard</li>

                <li>1 Internship Application</li>

            </ul>

            <button

    onClick={handleActivatePlan}

>

    Activate Free Plan

</button>

        </div>

    )

}

export default FreePlan