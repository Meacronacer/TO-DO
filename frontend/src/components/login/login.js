import { useDispatch, useSelector } from 'react-redux'
import { userDataChange } from '../store/actions'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import './login.css'
import { useAuthUserMutation } from '../../api/apiSlice'

const Login = () => {

    const {username, password} = useSelector(state => state.reducer.userData)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [authUser] = useAuthUserMutation()

    const submitLogin = (e) => {
        e.preventDefault();
        authUser({username,password}).unwrap()
            .then((payload) => {
                localStorage.setItem("isAuth", true)
                localStorage.setItem("user", username)
                navigate('../tasks')
            })
            .catch((error) => console.error('rejected', error));
    }



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
                         name='username'
                         value={username}
                         onChange={(e) => dispatch(userDataChange(e.target))}
                        className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                         type='password'
                         name='password'
                         value={password}
                         onChange={(e) => dispatch(userDataChange(e.target))}
                         className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>

                    <button type="submit" className="btn btn-primary s-btn">Log in</button>
                    </form>

                <Link className='d-flex justify-content-center link-acc' to='../registration'>I don't have an account</Link>
            </div>
        </div>

    )
}

export default Login;