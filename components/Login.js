import React,{useState} from 'react';


function Login(props) {
	const init_data = {email: "", password: ""}
	const [data, setdata] = useState(init_data);

	const registerUser = event => {
		event.preventDefault() // don't redirect the page
		// where we'll add our form logic
		console.log(data)
	      }

  return (<div>
	  
	  <form onSubmit={registerUser} className={props.custom_styles.login_form}>
		  <div className={props.custom_styles.label_input_wrapper}>
			  <label className={props.custom_styles.label}>email</label>
			  <input className={props.custom_styles.input} type="text" value={data.email} onChange={(e) => setdata({...data, email:e.target.value})}></input>
		  </div>
		  <div className={props.custom_styles.label_input_wrapper}>
			  <label className={props.custom_styles.label}>password</label>
			  <input className={props.custom_styles.input} type="password" value={data.password} onChange={(e) => setdata({...data, password:e.target.value})}></input>
		  </div>
		  <button className={props.custom_styles.login_btn} type="submit">login</button>
		  
	  </form>
  </div>);
}

export default Login;
