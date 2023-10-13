import './to-do-item.css'
import { useHttp } from '../axios/axios'
import { taskDeleted } from '../store/actions'
import { useDispatch } from 'react-redux'
import { activeModal } from '../store/actions'

const TodoItem = (props) => {

    const {request} = useHttp()
    const dispatch = useDispatch()

    const deleteTask = (id) => {
        request('delete', `/api/tasks/${id}/`)
            .then(() => dispatch(taskDeleted(id)))
            .catch(err => console.log(err))
    }


    return (
        <div className="item d-flex justify-content-between align-items-center">
            {props.item.complete ? <del>{props.item.title}</del> : <h6>{props.item.title}</h6>}
            <div className="d-flex">
                <button onClick={() => dispatch(activeModal(true, 'Update', props.item))}  type="button" className="button-5 btn-update">Update</button>
                <button onClick={() => deleteTask(props.item.id)} type="button" className="button-5 btn-delete">Delete</button>
            </div>
        </div>
    )
}

export default TodoItem;