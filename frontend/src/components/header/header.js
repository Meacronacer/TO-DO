import './header.css'
import BtnsFilter from '../filters/btns/btns-filter'
import Search from '../filters/search/search'
import { Link, Navigate, useNavigate} from 'react-router-dom'
import AddTask from '../add-new-task/add-new-task'
import { userDataChange } from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutUserMutation } from '../../api/apiSlice'

const Header = () => {
    
    const dispatch = useDispatch()
    const incomplete = useSelector(state => state.reducer.incomplete)
    let navigate = useNavigate()
    const [logoutUser] = useLogoutUserMutation()


    if (localStorage.getItem('isAuth') === 'false') {
        return <Navigate to='../login' />
    }

    const submitLogout = (e) => {
        e.preventDefault();
        logoutUser()
        localStorage.setItem('user', 'notAuth')
        localStorage.setItem("isAuth", false)
        dispatch(userDataChange({name: 'username', value: ''}))
        dispatch(userDataChange({name: 'password', value: ''}))
        navigate("../");
    }


    return (
        <>
        <div className="header">
            <div className='d-flex headers-b'>
                <h4>Hello {localStorage.getItem('user')} !</h4>
                <Link onClick={(e) => submitLogout(e)} className='login'>Logout</Link>
            </div>
            <h3 style={{marginLeft: '10px'}}>You have {incomplete} incomplete task</h3>
        </div>
        
        <div className='d-flex'>
            <BtnsFilter />
            <Search />
            <AddTask />
        </div>
        </>
    )
}

export default Header;