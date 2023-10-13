import './newmodal.css'
import { useHttp } from "../axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { activeModal, taskCreate, taskUpdate } from "../store/actions";
import { modalDataChange } from "../store/actions"

const NewModal = () => {

    const dispatch = useDispatch()
    const active = useSelector(state => state.activeModal)

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
    const data = useSelector(state => state.modalData)
    const modalMethod = useSelector(state => state.activeModalMethod)

    const {request} = useHttp()

    const submitMutation = (e) => {
        e.preventDefault()

        const item = {
            "title": e.target.title.value,
            "complete": JSON.parse(e.target.complete.value)
        }

        if (modalMethod === 'Create') {
            request('post', '/api/tasks/', item)
                .then(() => dispatch(taskCreate(item)))
                .then(dispatch(activeModal(false)))
                .catch(err => console.log('was failed to create', err))
        }

        if (modalMethod === 'Update') {
            request('put', `/api/tasks/${data.id}/`, item)
                .then(() => dispatch(taskUpdate(data.id, {...data, ...item})))
                .then(dispatch(activeModal(false)))
                .catch(err => console.log('was failed to update', err))
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
