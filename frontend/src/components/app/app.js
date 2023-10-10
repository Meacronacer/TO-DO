import './app.css'
import Header from '../header/header'
import Home from '../home/home'
import { useState, useEffect } from 'react'
import {Routes, Route, useNavigate  } from 'react-router-dom'
import Register from '../registr/registr'
import Login from '../login/login'
import axios from 'axios'
import Modal from '../modal/modal'
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000'
});


const App = () => {
   // const [currentUser, setCurrentUser] = useState(localStorage.getItem('isAuth') || false)
    const [err, setErr] = useState(false)
    const [data, setData] = useState([])
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [wasUpdate, setWasUpdate] = useState(false)
    const [activeFilter, setActiveFilter] = useState('all')
    const [crud, setCrud] = useState(null)
    const [search, setSearch] = useState('')

    let navigate = useNavigate();
    const [updateItem, setUpdateItem] = useState({})


    useEffect(() => {
        if (err) {
            setTimeout(() => {
                setErr(false)
            }, 3500)
        }
    }, [err])
    
    useEffect(() => {
        if (window.location.href === 'http://127.0.0.1:3000/tasks') {
            client.get(
                '/api/tasks/',
            ).then(res => {
                setData(res.data)
            }).catch(error => {
            }) 
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.location.href, wasUpdate])


    const filterData = (data, filter) => {
        switch (filter) {
            case 'all':
                return data
            case 'complete':
                return data.filter(item => item.complete)
            case 'incomplete':
                return data.filter(item => !item.complete)
            default:
                return data
        }   

    }


    const submitRegestrtion = (e) => {
        e.preventDefault();
        client.post(
            '/api/register/',
            {
                'username': name,
                'password': password
            },
            {withCredentials: true}
        ).then(() => {
            submitLogin(e)
        }).catch(error => console.log(error))
    }

    const submitLogin = (e) => {
        e.preventDefault();
        client.post(
            '/api/login/',
            {
                'username': name,
                'password': password,
            },
            {withCredentials: true}
        ).then(res => {
            if (res.data.username) {
                localStorage.setItem("isAuth", true)
                localStorage.setItem("user", res.data.username)
            }
            setName('')
            setPassword('')
        }).catch(error => {
            console.log(error)
            setErr(error)
        })
    }

    const submitLogout = (e) => {
        e.preventDefault();
        client.get(
            '/api/logout/',
            {withCredentials: true}
        ).then(res => {
        }).catch(error => {
        })
        localStorage.setItem('user', 'notAuth')
        localStorage.setItem("isAuth", false)

        navigate("../");
    }

    const submitUpdate = (e, crud) => {
        e.preventDefault()

        const item = {
            "title": e.target.title.value,
            "complete": e.target.complete.value
        }

        if (crud === 'Create') {
            client.post(
                '/api/tasks/',
                item
            ).then(res => {
                console.log('item was created', res)
                modalTonggle('none')
                setWasUpdate(!wasUpdate)
            })
            .catch(err => console.log('was failed', err))
        }

        if (crud === 'Update') {
            client.put(
                `/api/tasks/${updateItem.id}/`,
                item,
                {withCredentials: true}
            ).then(res => {
                console.log('item was updated', res)
                modalTonggle('none')
                setWasUpdate(!wasUpdate)
            })
            .catch(err => console.log('was failed', err))
        }
    }
    

    const deleteTask = (id) => {
        client.delete(
            `/api/tasks/${id}/`
        ).then(() => {
            console.log('item was succsses deleted')
            setWasUpdate(!wasUpdate)
        })
         .catch(err => console.log(err))
    }

    
    const modalTonggle = (block, type, items) => {
        document.querySelector('.modal').style.display = block

        if (block === 'block') {
            document.body.classList.add('active-modal')
          
        } 
        if (block === 'none') {
            document.body.classList.remove('active-modal')
        }

        if (type === 'Update') {
            setCrud(type)
            setUpdateItem({...items})
        } else {
            setCrud('Create')
            setUpdateItem({
                'user': localStorage.getItem('user'),
                'title': '',
                'complete': false
            })
        }
    }


    const searchFilter = (data, name) => {
        return data.filter(item =>
            item.title.toLowerCase().indexOf(name) > -1)
    }

    const filteredData = searchFilter(filterData(data, activeFilter), search)
    const countIncompleted = filterData(data, 'incomplete').length
    
    return (
        <>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='tasks' element={
            <div className="app">
                <div className="wrapper">
                    <Header
                     search={search}
                     setSearch={setSearch}
                     deleteTask={deleteTask}
                     activeFilter={activeFilter}
                     setActiveFilter={setActiveFilter}
                     countIncompleted={countIncompleted}
                     modalTonggle={modalTonggle}
                     data={filteredData}
                     submitLogout={submitLogout}/>
                </div>
            </div>
            } />
            <Route path='registration' element={<Register
             name={name}
             setName={setName}
             password={password}
             setPassword={setPassword}
             submitRegestrtion={submitRegestrtion}/>} />
            <Route path='login' element={<Login
             setErr={setErr}
             error={err}
             name={name}
             setName={setName}
             password={password}
             setPassword={setPassword}
             submitLogin={submitLogin}/>}/>
        </Routes>

        <Modal submitUpdate={submitUpdate}
         crud={crud}
         updateItem={updateItem}
         setUpdateItem={setUpdateItem}
         modalTonggle={modalTonggle} />

        </>
    )
}

export default App