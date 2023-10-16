import './newmodal.css'
import { useDispatch, useSelector } from "react-redux";
import { activeModal } from "../store/actions";
import { modalDataChange } from "../store/actions"
import { useCreateTaskMutation, useUpdateTaskMutation } from '../../api/apiSlice';

const NewModal = () => {

    const dispatch = useDispatch()
    const active = useSelector(state => state.reducer.activeModal)

    if (active) {
        document.body.classList.add('overlay-active')
    } else {
        document.body.classList.remove('overlay-active')
    }


    return (
        <div onClick={() => dispatch(activeModal(false))} className={active ? "overlay overlay-active": "overlay"}>
            <div onClick={(e) => (e.stopPropagation())} className={active ? "modal__content content-active": 'modal__content'}>
                    <TaskModelContentMutation/>
            </div>
        </div>
    )
}

const TaskModelContentMutation = () => {
    
    const dispatch = useDispatch()
    const data = useSelector(state => state.reducer.modalData)
    const modalMethod = useSelector(state => state.reducer.activeModalMethod)

    const [createTask] = useCreateTaskMutation()
    const [updateTask] = useUpdateTaskMutation()

    const submitMutation = (e) => {
        e.preventDefault()

        const item = {
            "title": e.target.title.value,
            "complete": JSON.parse(e.target.complete.value)
        }

        if (modalMethod === 'Create') {
            createTask(item).unwrap()
            dispatch(activeModal(false))
        }   

        if (modalMethod === 'Update') {
            updateTask({'id': data.id, item})
            dispatch(activeModal(false))
        }
    }

    return (
        <>
            <h4>{modalMethod} task for user: {data.user}</h4>
            <hr/>
            <form method='POST' onSubmit={(e) => submitMutation(e)}>
                    <div className="form-group" style={{marginTop: '10px'}}>
                        <h4>Title</h4>
                        <input name='title'
                         value={data.title}
                         onChange={(e) => dispatch(modalDataChange(e.target))}
                        className="form-control" placeholder="Title"/>
                    </div>
                    <div className="form-check" style={{marginTop: '10px'}}>
                        <input name='complete'
                         value={data.complete}
                         checked={data.complete}
                         onChange={(e) => dispatch(modalDataChange(e.target))}
                         type="checkbox" className="form-check-input"
                         id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Complete</label>
                    </div>
                    <button type="submit" style={{marginTop: '10px'}}
                     className="button-5 btn-update">{modalMethod}</button>
            </form>
        </>
    )
}



export default NewModal
