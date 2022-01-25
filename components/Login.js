import React,{useState} from 'react';


function Login(props) {
	const init_email = ""
	const init_pwd = ""
	const [email, setemail] = useState(init_email);
	const [password, setpassword] = useState(init_pwd);

	const registerUser = event => {
		event.preventDefault() // don't redirect the page
		// where we'll add our form logic
	      }

	const handleOnEmailChange = (e) => {
		const email_in = e.target.value
		console.log(email_in)
		setemail(prevState => {
			return {
				...prevState,
				email:email_in
			}

		})
	}

	const handleOnPwdChange = (e) => {
		const password_in = e.target.value
		setpassword(prevState => {
			return {
				...prevState,
				password: password_in
			}
		})

	}
  return (<div>
	  
	  <form onSubmit={registerUser} className={props.custom_styles.login_form}>
		  <div className={props.custom_styles.label_input_wrapper}>
			  <label className={props.custom_styles.label}>email</label>
			  <input className={props.custom_styles.input} type="text" value={email} onChange={handleOnEmailChange}></input>
		  </div>
		  <div className={props.custom_styles.label_input_wrapper}>
			  <label className={props.custom_styles.label}>password</label>
			  <input className={props.custom_styles.input} type="password" value={password} onChange={handleOnPwdChange}></input>
		  </div>
		  <button className={props.custom_styles.login_btn} type="submit">login</button>
		  
	  </form>
  </div>);
}

export default Login;
