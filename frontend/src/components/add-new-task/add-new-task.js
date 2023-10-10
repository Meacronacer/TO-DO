

const AddTask = (props) => {
    
    return (
        <button 
        onClick={() => props.modalTonggle('block', 'add')}
        style={{marginLeft: "20px"}} className="btn btn-primary">Add Task</button>
    )
}

export default AddTask;