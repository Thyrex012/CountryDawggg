import countryDawgggLogo from '../../assets/CountryDawggg-logo-white-fill.svg';
import googleLogo from '../../assets/google.svg'

function LoginCard({onSwitch}) {
    return <form className="z-10 flex flex-col items-center bg-white p-3 gap-4 m-10 rounded-2xl md:rounded-none">
        <img className="animate-spin-y w-50" src={countryDawgggLogo} alt="Country Dawggg logo"/>
        <h1>Login to CountryDawggg</h1>
        <input className="text-left p-2 rounded-2xl w-full border-1 border-black" type="email" placeholder="Email"/>
        <input className="text-left p-2 rounded-2xl w-full border-1 border-black" type="password" placeholder="Password"/>
        <button className="h-10 w-1/3 bg-blue-500 !rounded-4xl">Login</button>
        <div className="flex flex-row justify-center items-center text-2xl gap-2">
            <span>or login with </span>
            <button className="flex items-center justify-center">
                <img className="w-10 h-10" src={googleLogo} alt="Google logo" />
            </button>
        </div>
        <h3>Dont have an account? <span onClick={onSwitch} className="text-blue-500 underline cursor-pointer">Signup</span></h3>
    </form>
}

export default LoginCard