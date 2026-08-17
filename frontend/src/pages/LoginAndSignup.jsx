import LoginCard from "../components/loginandregister/LoginCard.jsx";
import SignupCard from "../components/loginandregister/SignupCard.jsx";
import countryDawgggLogin from "../assets/countrydawggg-login.jpg";
import {useState} from "react";

function LoginAndSignup() {

    const [isLogin, setIsLogin] = useState(true);

    return <div className="flex items-center justify-center md:grid md:grid-cols-2 min-h-screen">

        {isLogin ? <LoginCard onSwitch={() => setIsLogin(false)} /> : <SignupCard onSwitch={() => setIsLogin(true)} />}

        {/* Mobile-only: full-bleed background image */}
        <img
            className="absolute inset-0 w-full h-full object-fill -z-10 md:hidden"
            src={countryDawgggLogin}
            alt="Country Dawggg login background"
        />

        {/* Desktop-only: normal grid column image */}
        <img
            className="hidden md:block w-full h-full object-cover"
            src={countryDawgggLogin}
            alt="Country Dawggg login background"
        />
    </div>
}

export default LoginAndSignup