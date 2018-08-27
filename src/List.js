import React from 'react';
import firebase from 'firebase';
// import AddForm from './AddForm';
// {id: '', text: '', done: ""}

class List extends React.Component {
    constructor(props){
        super(props);
        
        this.state= {
            tasks: [],
        }
		
		this.handleCheck = this.handleCheck.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleAddTask = this.handleAddTask.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		
		this.handleChildAdded = this.handleChildAdded.bind(this);
		this.handleChildChanged = this.handleChildChanged.bind(this);
		this.handleChildRemoved = this.handleChildRemoved.bind(this);

		const db = firebase.database();
		this.tasksRef = db.ref().child(`tasks/${this.props.user.uid}`);
	}
	

	componentDidMount(){
		this.tasksRef.on('child_added', this.handleChildAdded);
		this.tasksRef.on('child_changed', this.handleChildChanged);
		this.tasksRef.on('child_removed', this.handleChildRemoved);
	}

	handleChildAdded(data){
		const newTask = data.val();
		newTask.id= data.key
		var newTasks = this.state.tasks.concat(newTask);
		this.setState({ tasks: newTasks })
	}

	handleChildChanged(data){
		const newTask = data.val();
		newTask.id= data.key
		var newTasks = this.state.tasks.concat([]);
		const index = newTasks.findIndex(task=> task.id=== data.key);
		newTasks.splice(index,1,newTask);
		this.setState({ tasks: newTasks })
	}

	handleChildRemoved(data){
		var newTasks = this.state.tasks.concat([]);
		const index = newTasks.findIndex(task=> task.id=== data.key);
		newTasks.splice(index,1);
		this.setState({ tasks: newTasks })
	}

	handleAddTask(text) {
		if (!text.length) {
			return;
		}
        const key = this.tasksRef.push().key;
        this.tasksRef.child(key).set({
            text: text,
            done: false,
        });
	}
	
    handleCheck(e){
		const parent = e.target.closest('.task');
		const taskRef = this.tasksRef.child(parent.id);
		taskRef.update({
			done: e.target.checked
		});
	}
	handleDelete(e){
		e.preventDefault();
		const parent = e.target.closest('.task');
		const taskRef = this.tasksRef.child(parent.id);
		taskRef.remove();
	}

	handleEdit(text, id) {
		const taskRef = this.tasksRef.child(id);
		taskRef.update({
			text: text
		});
	}


    render (){
        return (
            <section className="list">
            <h5>{this.props.user.email}</h5>
            <button type="button" onClick={() => firebase.auth().signOut()}>Logout</button>
            <AddForm onAdd={this.handleAddTask}/>
			<Tasks  tasks={this.state.tasks} onDelete={this.handleDelete} onEdit={this.handleEdit} onCheck={this.handleCheck}/>                  
            </section>
        );
    }
}

class AddForm extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			value:""
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleChange(e){
		this.setState({value:e.target.value});
	}

	handleKeyUp(e){
		if(e.keyCode===13) this.handleClick();
	}
	
	handleClick(){
		this.props.onAdd(this.state.value);
		this.setState({value:""});
	}

	render(){
		return (
			<div className="addForm">
				<input type="text" onKeyUp={this.handleKeyUp} onChange={this.handleChange} value={this.state.value} />
				<button type="button"  onClick={this.handleClick}>Agrega tarea</button>
			</div>
		);
	}
}


function Tasks(props) {
    return (
        <div className="tasks">
        {props.tasks.map(task => (
			<Task 
			key={task.id}
            id={task.id}
            text={task.text}
            done={task.done}
            onCheck={props.onCheck}
            onDelete={props.onDelete}
            onEdit={props.onEdit}/>
			))}
		</div>
	)
}


class Task extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            editing: false,
            text: '',
        }
        this.makeEditable= this.makeEditable.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);

        this.inputRef = React.createRef();
    }
    
    handleInputChange(e){
        this.setState({text: e.target.value});
    }

    makeEditable(e) {
        e.preventDefault();
        this.setState({editing: true, text: this.props.text});
    }
    
    handleKeyUp(e){
		if(e.keyCode===13);
	}

    componentDidUpdate(){
        if (this.state.editing) {
            console.log('updating');
            this.inputRef.current.focus();
        }
    }

    render(){
        if(this.state.editing){
            return (
                <div className="task" id={this.props.id}>
                    <input ref={this.inputRef} type="text" id={`input-${this.props.id}`} value={this.state.text} onKeyUp={this.handleKeyUp} onChange={this.handleInputChange}/>
                    <div> <button type="button">Guardar</button></div>
                </div>
            );
        } else {
            return (
                <div className="task" id={this.props.id}>
                    <input type="checkbox" id={`check-${this.props.id}`} onChange={this.props.onCheck} checked={this.props.done}/>
                    <label htmlFor={`check-${this.props.id}`}>{this.props.text}</label>
                    <div className="button-bar"> <button onClick={this.makeEditable}>Editar</button> <button onClick={this.props.onDelete}>Borrar</button></div>
                </div>
            );
        }
    }
}

export default List;


