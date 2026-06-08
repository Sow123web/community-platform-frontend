import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginHistoryPage from "./pages/LoginHistoryPage"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import FreePlan from "./pages/FreePlan"
import BronzePlan from "./pages/BronzePlan"
import SilverPlan from "./pages/SilverPlan"
import GoldPlan from "./pages/GoldPlan"
import PlanExplorer from "./pages/PlanExplorer"
import MySubscription from "./pages/MySubscription"

function App() {

    return (

        <BrowserRouter>

            <Routes>

              <Route

                    path="/register"

                    element={<Register />}

                />

                <Route

                    path="/"

                    element={<Login />}

                />

                <Route

                    path="/dashboard"

                    element={<Dashboard />}

                />

                <Route

                    path="/forgot-password"

                    element={<ForgotPassword />}

                />

                <Route

                    path="/reset-password"

                    element={<ResetPassword />}

                />

                <Route
    path="/free-plan"
    element={<FreePlan />}
/>

<Route
    path="/bronze-plan"
    element={<BronzePlan />}
/>

<Route
    path="/silver-plan"
    element={<SilverPlan />}
/>

<Route
    path="/gold-plan"
    element={<GoldPlan />}
/>

<Route

    path="/plan-explorer"

    element={<PlanExplorer />}

/>

<Route

    path="/my-subscription"

    element={<MySubscription />}

/>

<Route

    path="/login-history"

    element={<LoginHistoryPage />}

/>

            </Routes>

        </BrowserRouter>

    )

}

export default App