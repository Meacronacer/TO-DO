import './header.css'
import TodoList from '../to-do-list/to-do-list'
import BtnsFilter from '../filters/btns/btns-filter'
import Search from '../filters/search/search'
import { Link, Navigate } from 'react-router-dom'
import AddTask from '../add-new-task/add-new-task'

const Header = (props) => {

    if (localStorage.getItem('isAuth') === 'false') {
        return <Navigate to='../login' />
    }


    return (
        <>
        <div className="header">
            <div className='d-flex headers-b'>
                <h4>Hello {localStorage.getItem('user')} !</h4>
                <Link onClick={(e) => props.submitLogout(e)} className='login'>Logout</Link>
            </div>
            <h3 style={{marginLeft: '10px'}}>You have {props.countIncompleted} incomplete task</h3>
        </div>
        
        <div className='d-flex'>
            <BtnsFilter
            setActiveFilter={props.setActiveFilter}
            activeFilter={props.activeFilter} />
            <Search search={props.search} setSearch={props.setSearch} />
            <AddTask modalTonggle={props.modalTonggle}/>
        </div>
        <TodoList deleteTask={props.deleteTask} modalTonggle={props.modalTonggle} data={props.data}/>
        </>
    )
}

export default Header;