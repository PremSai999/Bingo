import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { useNavigate } from "react-router-dom";
import { signup } from "../../utils/gameFuncs";
import '../../App.css'


function Signup() {
	const navigate = useNavigate()

	const {name, setName, email, setEmail, password, setPassword} = useContext(UserContext);

	async function registerUser(event) {
		event.preventDefault()

		const data = await signup(name, email, password);
		if (data.status === 'ok') {
			navigate('/login')
		}
	}

	return (
		<div className="register-form">
			<h1>Register</h1>
			<form onSubmit={registerUser}>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="text"
					placeholder="Name"
				/>
				<br />
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
				<input type="submit" value="Register" />
			</form>
		</div>
	)
}

export default Signup