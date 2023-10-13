import './app.css'
import Header from '../header/header'
import Home from '../home/home'
import {Routes, Route } from 'react-router-dom'
import Register from '../registr/registr'
import Login from '../login/login'
import NewModal from '../newModal/newmodal'
import TodoList from '../to-do-list/to-do-list'

const App = () => {

    return (
        <>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='tasks' element={
            <div className="app">
                <div className="wrapper">
                    <Header/>
                    <TodoList />
                </div>
            </div>
            } />
            <Route path='registration' element={<Register/>}/>
            <Route path='login' element={<Login/>}/>
        </Routes>

        <NewModal/>
                
        </>
    )
}

export default App