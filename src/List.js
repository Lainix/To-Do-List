import React from 'react';
import firebase from 'firebase';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
    
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            Agrega una tarea
            </label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Add
            </button>
          <button type="button" onClick={() => firebase.auth().signOut()}>Logout</button>
          <AddForm id="new" items={this.state.items} />
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    // const db = firebase.database().ref().child('to-do-list-0');
    // const textRef = db.child('items');
    // textRef.on('value', snap => {
    //   this.setState({
    //     items: snap.items.concat(newItem),
    //     text: ''
    //   });      
    // });
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: ''
    }));
  }
}


class AddForm extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}><input type="checkbox" />{item.text} <button>Add</button></li>
        ))}
      </ul>
    );
  }
}

export default List;



// function List(){    
//     const tasks = [
//         { id: "1", text: "Example Task 1" },
//         { id: "2", text: "Example Task 2" },
//         { id: "3", text: "Example Task 3" },

//     ];
//     return (
//             <div className="list">
//             <AddForm />
//             <TasksList tasks={tasks} />              
//             <button type="button">Add</button>
//             <button type="button" onClick={()=>firebase.auth().signOut()}>Logout</button>
//             </div>       
//     ); 
// }
// function AddForm(){
//     return ( <div className="addForm">
//     <input type="text" value="" />
//     <button type="button">Add</button>
//         </div>
//     );
// }
// function TasksList(){
//     return (<ul className="tasks">
//             {items.tasks.map(items =>(
//                 <Task key={items.id} id={items.id} text={items.text} />
//             ))}
//         </ul>
//     );
// }
//  function Task(props){
//     return (<ul className="tasks">
//         <li key={props.id}><input type="checkbox" />{props.text}</li>        
//     </ul>
//     )  
// }

// export default List;
