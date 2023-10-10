import './login.css'
import { Link, Navigate } from 'react-router-dom'

const Login = (props) => {

    const {name, password, setName, setPassword, submitLogin, error, setErr} = props

    if (localStorage.getItem("isAuth") === 'true') {
        return <Navigate to='../tasks' />
    }


    return (
        <div className="app">
            <div className="wrapper">
            <Link to='../' className="go-back" href="#">go back</Link>
                <h1 className='justify-content-center d-flex'>Login</h1>
                <form className='reg-form' onSubmit={(e) => submitLogin(e)}>
                    <div className="form-group">
                        <label>Username</label>
                        <input 
                         type="username"
                         name='username'
                         value={name}
                         onChange={(e) => setName(e.target.value)}
                        className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                         type="password"
                         name='password'
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                         className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>

                    <button type="submit" className="btn btn-primary s-btn">Log in</button>
                    </form>
                    {error ? <div className='error' >invalid login or password</div> : null}
                <Link className='d-flex justify-content-center link-acc' to='../registration'>I don't have an account</Link>
            </div>
        </div>

    )
}

export default Login;