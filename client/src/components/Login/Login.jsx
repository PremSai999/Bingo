import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import '../../App.css'

function Login() {
    const {email, setEmail, password, setPassword} = useContext(UserContext)
    async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:4000/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()

		if (data.user) {
            sessionStorage.setItem('token',data.user)
			sessionStorage.setItem('name',data.name)
			alert('Login successful')
			window.location.href = '/'
		} else {
			alert('Please check your username and password')
		}
	}

	return (
		<div className='register-form'>
			<h1>Login</h1>
			<form onSubmit={loginUser}>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
				<input type="submit" value="Login" />
			</form>
		</div>
	)
}

export default Login