import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { useNavigate } from "react-router-dom";
import { signup } from "../../utils/gameFuncs";
import {toast} from "react-toastify"
import '../../App.css'
import { Input } from "../ui/input";
import { Button } from "../ui/button";


function Signup() {
	const navigate = useNavigate()

	const {name, setName, email, setEmail, password, setPassword} = useContext(UserContext);

	async function registerUser(event) {
		event.preventDefault()

		const data = await signup(name, email, password);
		if (data.status === 'ok') {
			toast.success('Account registered successfully.')
			navigate('/login')
		}
		else{
			toast.error('Problem occured. Try again.')
		}
	}

	return (
		<div className="register-form">
			<h1>Register</h1>
			<form onSubmit={registerUser}>
				<Input
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="text"
					placeholder="Name"
				/>
				<br />
				<Input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
				/>
				<br />
				<Input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
				<Button type="submit">Register</Button>
			</form>
		</div>
	)
}

export default Signup