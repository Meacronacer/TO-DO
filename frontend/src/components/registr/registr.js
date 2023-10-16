import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { userDataChange } from '../store/actions'
import { useAuthUserMutation, useRegisterUserMutation } from '../../api/apiSlice'
import './registr.css'

const Register = () => {

    const {username, password} = useSelector(state => state.reducer.userData)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [registerUser] = useRegisterUserMutation()
    const [authUser] = useAuthUserMutation()

    if (localStorage.getItem("isAuth") === 'true') {
        return <Navigate to='../tasks' />
    }
    
    const submitRegestrtion = (e) => {
        e.preventDefault();
        registerUser({username, password}).unwrap()
            .then(() => authUser({username, password}).unwrap()
                    .then((payload) => {
                        console.log(payload)
                        localStorage.setItem("isAuth", true)
                        localStorage.setItem("user", username)
                        navigate('../tasks')
                    })
            )
    }


    return (
        <div className="app">
            <div className="wrapper">
            <Link to='../' className="go-back">go back</Link>
                <h1 className='justify-content-center d-flex'>Registration</h1>
                <form method='post' className='reg-form' onSubmit={(e) => submitRegestrtion(e)}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                        name='username'
                        value={username}
                        onChange={(e) => dispatch(userDataChange(e.target))}
                        type="username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                        name='password'
                        value={password}
                        onChange={(e) => dispatch(userDataChange(e.target))}
                        type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>

                    <button type="submit" className="btn btn-primary s-btn">Submit</button>
                    </form>
            
            <Link to='../login' className='d-flex justify-content-center link-acc'>I already have a account</Link>
            </div>
        </div>

    )
}

export default Register;