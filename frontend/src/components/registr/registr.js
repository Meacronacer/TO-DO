import './registr.css'
import { Link, Navigate} from 'react-router-dom'

const Register = (props) => {
    const {name, password, setName, setPassword, submitRegestrtion} = props

    if (localStorage.getItem("isAuth") === 'true') {
        return <Navigate to='../tasks' />
    }

    return (
        <div className="app">
            <div className="wrapper">
            <Link to='../' className="go-back">go back</Link>
                <h1 className='justify-content-center d-flex'>Registration</h1>
                <form className='reg-form' onSubmit={(e) => submitRegestrtion(e)}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                        name='username'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>

                    <button type="submit" className="btn btn-primary s-btn">Submit</button>
                    </form>
            
            <Link className='d-flex justify-content-center link-acc' to='../login'>I already have a account</Link>
            </div>
        </div>

    )
}

export default Register;