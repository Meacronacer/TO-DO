import './to-do-item.css'


const TodoItem = (props) => {


    return (
        <div className="item d-flex justify-content-between align-items-center">
            {props.item.complete ? <del>{props.item.title}</del> : <h6>{props.item.title}</h6>}
            <div className="d-flex">
                <button onClick={() => props.modalTonggle('block', 'Update', props.item)}  type="button" className="button-5 btn-update">Update</button>
                <button onClick={() => props.deleteTask(props.item.id)} type="button" className="button-5 btn-delete">Delete</button>
            </div>
        </div>
    )
}

export default TodoItem;