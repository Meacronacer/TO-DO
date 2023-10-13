import { useDispatch } from "react-redux";
import { activeModal } from "../store/actions";

const AddTask = () => {
    const dispatch = useDispatch()

    return (
        <button 
        onClick={() => dispatch(activeModal(true, 'Create'))}
        style={{marginLeft: "20px"}} className="btn btn-primary">Add Task</button>
    )
}


export default AddTask;