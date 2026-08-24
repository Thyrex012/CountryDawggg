import countryDawgggLogo from "../../assets/CountryDawggg-logo-white-fill.svg";
import googleLogo from "../../assets/google.svg";
import {isValidCambodianPhoneNumber, getCambodianCarrier} from "../../helper/cambodiaPhoneValidator.js"
import {useState} from "react";

function SignupCard({onSwitch}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [reEnterPassword, setReEnterPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [error, setError] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [showSuccess, setShowSuccess] = useState(false)

    const isPhoneValid = phoneNumber.trim() !== '' && isValidCambodianPhoneNumber(phoneNumber)
    const carrier = isPhoneValid ? getCambodianCarrier(phoneNumber) : null

    async function handleSignup(event) {
        event.preventDefault()
        setError('')

        if (!email.trim() || !password.trim()) {
            setError('Email and password are required.')
            return
        }

        if (verifyPassword(password, reEnterPassword) === false){
            setError('Password and Re-enter password needs to be the same')
            return
        }

        if (!isValidCambodianPhoneNumber(phoneNumber)) {
            setError('Please enter a valid Cambodian phone number.')
            return
        }

        try {
            const response = await fetch("api/auth/register", {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, firstName, lastName, phoneNumber })
            })
            if (!response.ok) {
                throw new Error("invalid details")
            }
            setShowSuccess(true)
        } catch (err) {
            setError(err.message)
        }
    }

    function verifyPassword(password, reEnterPassword){
        if (password !== reEnterPassword) {
            return false
        }
        return true
    }


    return <form
        className="z-10 flex flex-col items-center bg-white p-3 gap-4 m-10 rounded-2xl md:rounded-none"
        onSubmit={handleSignup}

    >
        <img className="animate-spin-y w-50" src={countryDawgggLogo} alt="Country Dawggg logo"/>
        <h1>Signup for CountryDawggg</h1>
        <div className="flex flex-row gap-6 w-full">
            <input className="text-left p-2 rounded-2xl w-full border-1 border-black"
                   type="text"
                   placeholder="First name"
                   value={firstName}
                   onChange={(event) => setFirstName(event.target.value)}
                   required={true}
            />
            <input className="text-left p-2 rounded-2xl w-full border-1 border-black"
                   type="text"
                   placeholder="Last name"
                   value={lastName}
                   onChange={(event) => setLastName(event.target.value)}
                   required={true}
            />
        </div>
        <div className="w-full flex flex-col gap-1">
            <input
                className={`text-left p-2 rounded-2xl w-full border-1 ${
                    isPhoneValid ? 'border-green-500 text-green-600' : 'text-black'
                }`}
                type="tel"
                placeholder="Phone number - Cambodian numbers only"
                value={phoneNumber}
                onChange={(event ) => setPhoneNumber(event.target.value)}
                required={true}
            />
            {isPhoneValid && (
                <span className="text-green-600 text-xs pl-2">
                    Valid {carrier ? `(${carrier})` : ''} number
                </span>
            )}
        </div>
        <input
            className="text-left p-2 rounded-2xl w-full border-1 border-black"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event ) => setEmail(event.target.value)}
            required={true}
        />
        <div className="flex flex-row gap-6 w-full">
            <input className="text-left p-2 rounded-2xl w-full border-1 border-black"
                   type="password"
                   placeholder="Password"
                   value={password}
                   onChange={(event) => setPassword(event.target.value)}
                   required={true}
            />
            <input className="text-left p-2 rounded-2xl w-full border-1 border-black"
                   type="password"
                   placeholder="Please re-enter the password"
                   value={reEnterPassword}
                   onChange={(event) => setReEnterPassword(event.target.value)}
                   required={true}
            />
        </div>

        {error && (
            <p className="text-red-500 text-sm w-full text-center -mt-2">{error}</p>
        )}

        <button className="h-10 w-1/3 bg-blue-500 !rounded-4xl">Signup</button>
        <div className="flex flex-row justify-center items-center text-2xl gap-2">
            <span>or login with </span>
            <button type="button" className="flex items-center justify-center">
                <img className="w-10 h-10" src={googleLogo} alt="Google logo" />
            </button>
        </div>
        <h3>Already have an account? <span onClick={onSwitch} className="text-blue-500 underline cursor-pointer">Login</span></h3>

        {showSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-4 max-w-sm w-full mx-4">
                    <h2 className="text-xl font-semibold">Signup successful!</h2>
                    <p className="text-center text-gray-600">Your account has been created.</p>
                    <button
                        type="button"
                        className="h-10 px-6 bg-blue-500 !rounded-4xl text-white"
                        onClick={() => setShowSuccess(false)}
                    >
                        OK
                    </button>
                </div>
            </div>
        )}
    </form>
}

export default SignupCard
