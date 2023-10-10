import './home.css'
import {Link} from 'react-router-dom'

const Home = () => {

    const local = localStorage.getItem("isAuth") === 'true'

    return (
        <div className='home d-flex'>
            <div className='home-btns d-flex justify-content-center'>
                <Link className='button-5' to={local ? '../tasks' : 'registration'}>Registration</Link>
                <Link className='button-5' to={local ? '../tasks' :'login'}>Login</Link>
            </div>
        </div>
    )
}

export default Home;