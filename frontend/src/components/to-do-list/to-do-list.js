import TodoItem from '../to-do-item/to-do-item';


const TodoList = (props) => {

    const listOfItems = props.data.map((item, index) => {
        return <TodoItem 
        deleteTask={props.deleteTask}
        modalTonggle={props.modalTonggle}
        key={index}
        item={item} />
    })

    return (
        <div style={{paddingBottom: '15px'}}>
            {listOfItems}
        </div>
    )
}

export default TodoList;