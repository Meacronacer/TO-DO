import './to-do-item.css'
import { useDispatch } from 'react-redux'
import { activeModal } from '../store/actions'
import { useDeleteTaskMutation } from '../../api/apiSlice'

const TodoItem = (props) => {

    const dispatch = useDispatch()
    const [daeleteTask] = useDeleteTaskMutation()

    const deleteTaskById = (id) => {
        daeleteTask(id)
    }


    return (
        <div className="item d-flex justify-content-between align-items-center">
            {props.item.complete ? <del>{props.item.title}</del> : <h6>{props.item.title}</h6>}
            <div className="d-flex">
                <button onClick={() => dispatch(activeModal(true, 'Update', props.item))}  type="button" className="button-5 btn-update">Update</button>
                <button onClick={() => deleteTaskById(props.item.id)} type="button" className="button-5 btn-delete">Delete</button>
            </div>
        </div>
    )
}

export default TodoItem;