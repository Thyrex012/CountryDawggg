import {Routes, Route} from "react-router-dom"
import HomePage from "./pages/HomePage.jsx";
import LoginAndSignup from "./pages/LoginAndSignup.jsx";

function App() {

    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/loginandsignup" element={<LoginAndSignup/>}/>
                <Route path="/"/>
            </Routes>
        </div>
    )
}

export default App