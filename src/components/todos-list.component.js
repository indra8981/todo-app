import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./../App.css";
import Modal from "./todo-edit-modal"
import AddModal from "./todo-add-modal"
import Button from 'react-bootstrap/Button'
import Toast from './toast'
export default class ToDosList extends Component {
  constructor(props) {
    super(props);

    this.deleteToDo = this.deleteToDo.bind(this)

    this.state = {todos: [],showToast:false,toastHeading:"",toastbody:"",id:"",title:"",description:"",addmodalVisible:false,modalVisible:false,index:{},active:true};
  }
  updateIndex(list){
    console.log(list);
    var idx ={};
    list.forEach((element,index) => {
      idx[element._id] = index;
    });
    return idx;
  }
  componentDidMount() {
    axios.get('/todos/')
      .then(response => {
        const idx=this.updateIndex(response.data);
        this.setState({ todos: response.data ,index: idx });
      })
      .catch((error) => {
        console.log(error);
      })
      console.log(this.state.todos);
      this.updateIndex(this.state.todos);
  }

  editChangeHandler = (e)=>{
    const target = e.target;
    this.setState({
      [target.name]: target.value
    });
  }

  editTodo = ()=>{
    console.log(this.state);
    axios.post(`/todos/update/${this.state.id}`,this.state)
      .then(response => { 
        var newtodo= this.state.todos;
        const index=this.state.index[this.state.id];
        newtodo[index]["title"]=this.state.title;
        newtodo[index]["description"]=this.state.description;
        this.setState({todos:newtodo,modalVisible:false,showToast:true,toastHeading:"Success!",toastbody:"Todo edited and saved Successully"});
      }).catch((error) => {
        this.setState({showToast:true,toastHeading:"Error!",toastbody:error.response.data});
      });
    
  }

  addTodo = ()=>{
    axios.post(`/todos/add/`,this.state)
      .then(response => {
        const todoD = response.data;
        var newtodo= this.state.todos;
        newtodo.push(todoD);
        var idx = this.state.index;
        idx[todoD._id]=newtodo.length-1;
        this.setState({todos:newtodo,index:idx,addmodalVisible:false,showToast:true,toastHeading:"Success!",toastbody:"Todo added Successully"});
      }).catch((error) => {
        this.setState({showToast:true,toastHeading:"Error!",toastbody:error.response.data});
      });
  }

  deleteToDo(id) {
    axios.delete(`/todos/${id}`)
      .then(response => { 
        const newtodo=this.state.todos.filter(el => el._id !== id);
        const idx=this.updateIndex(newtodo);
        this.setState({todos: newtodo,index: idx,modalVisible: false,showToast:true,toastHeading:"Success!",toastbody:"Todo deleted Successully"});
      }).catch((error) => {
        this.setState({showToast:true,toastHeading:"Error!",toastbody:error.response.data});
      });
  }


  onClick=(id,title,description)=>{
    this.setState({modalVisible:true,id:id,title:title,description:description});
  }



  todoList() {
    const todolist =  this.state.todos.map((currenttodo,index) => {
      return (
        <div type="button" onClick={()=>this.onClick(currenttodo._id,currenttodo.title,currenttodo.description)} className="to-do" key={currenttodo.id}>
          <div className="to-do-title">{currenttodo.title}</div>
          <div className="to-do-description">{currenttodo.description}</div>
        </div>
      );
    })
    return todolist;
  }

  render() {
    return (
      <div className="mainbody">
        <Toast showToast={this.state.showToast} heading={this.state.toastHeading} body={this.state.toastbody} closeToast={()=>{
          this.setState({showToast: false})
          }}/>
        <div>
          <Button variant="primary" onClick={() => {this.setState({title:"",description:"",addmodalVisible:true})}}>Create a ToDo</Button>
        </div>
        <div className="todolisthead">Active Todos</div>
        <table className="table">
          <tbody>
            { this.todoList() }
          </tbody>
        </table>
        
        <Modal {...this.props} {...this.state} editChangeHandler={(e)=>{this.editChangeHandler(e)}} edit={()=>{this.editTodo()}} show={this.state.modalVisible} delete={()=>{this.deleteToDo(this.state.id)}} onHide={() => this.setState({modalVisible:false})}/>
        <AddModal {...this.props} {...this.state} editChangeHandler={(e)=>{this.editChangeHandler(e)}} addTodo={()=>{this.addTodo()}} show={this.state.addmodalVisible} onHide={() => this.setState({addmodalVisible:false})}/>
      </div>
    )
  }
}