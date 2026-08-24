import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import countryDawgggLogo from '../../assets/CountryDawggg-logo-white-fill.svg'
import googleLogo from '../../assets/google.svg'

function LoginCard({ onSwitch }) {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    function handleGoogleLogin() {
        window.location.href = 'http://localhost:8080/oauth2/authorization/google'
    }

    async function handleLogin(event) {
        event.preventDefault() // prevents the page from refreshing
        setError('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            if (!response.ok) {
                throw new Error('Invalid email or password')
            }

            const user = await response.json()

            navigate(user.role === 'ADMIN' ? '/admin' : '/')
        } catch (err) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleLogin}
            className="z-10 flex flex-col items-center bg-white p-3 gap-4 m-10 rounded-2xl md:rounded-none"
        >
            <img className="animate-spin-y w-50" src={countryDawgggLogo} alt="Country Dawggg logo" />
            <h1>Login to CountryDawggg</h1>

            <input
                className="text-left p-2 rounded-2xl w-full border-1 border-black"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
            />

            <input
                className="text-left p-2 rounded-2xl w-full border-1 border-black"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
            />

            {error && <p className="text-red-600">{error}</p>}

            <button
                type="submit"
                disabled={isLoading}
                className="h-10 w-1/3 bg-blue-500 !rounded-4xl"
            >
                {isLoading ? 'Logging in...' : 'Login'}
            </button>

            <div className="flex flex-row justify-center items-center text-2xl gap-2">
                <span>or login with </span>
                <button onClick={handleGoogleLogin} type="button" className="flex items-center justify-center">
                    <img className="w-10 h-10" src={googleLogo} alt="Google logo" />
                </button>
            </div>

            <h3>
                Dont have an account?{' '}
                <span onClick={onSwitch} className="text-blue-500 underline cursor-pointer">
          Signup
        </span>
            </h3>
        </form>
    )
}

export default LoginCard
