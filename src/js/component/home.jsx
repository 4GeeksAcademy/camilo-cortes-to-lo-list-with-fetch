import React from "react";
import { useState , useEffect} from "react";
//create your first component
const Home = () => {
  const [listElement, setListElement] = useState([]);
// importar todo lo que tiene que ver con la api 
// crear usuario en la api 
function createUserToDoList(){
const requestOptions = {
  method: "POST",
  redirect: "follow"
};
fetch("https://playground.4geeks.com/todo/users/CamiloCortes", requestOptions)
  .then((response) => response.json())
  .catch((error) => console.error(error));
}
// traer usuarios de la api
function getTask(){
const requestOptions = {
  method: "GET",
  redirect: "follow"
};
fetch("https://playground.4geeks.com/todo/users/CamiloCortes", requestOptions)
  .then((response) => response.json())
  .then((result) => setListElement(result.todos))
  .catch((error) => console.error(error));
}
//crear tarea en la api
function createNewTasK(task){
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
const raw = JSON.stringify({
  "label": `${task}`,
  "is_done": false
});
const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};
fetch("https://playground.4geeks.com/todo/todos/CamiloCortes", requestOptions)
  .then((response) => response.json())
  .then((result) => setListElement([...listElement,result]))
  .catch((error) => console.error(error));
}
// eliminar tarea de la api
function deleteTask(idTask){
  const requestOptions = {
    method: "DELETE",
    redirect: "follow"
  };  
  fetch(`https://playground.4geeks.com/todo/todos/${idTask}`, requestOptions)
  .then((response) => {
    if (response.status == 204) {
      getTask();
    }
  })  
  .catch((error) => console.error(error))    
}
  const handleNewTask = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {      
      createNewTasK(e.target.value)
      e.target.value = "";
    }
  };
  const handleClick = (e) => {    
    deleteTask(e.target.parentElement.id);    
    getTask();
  };  
  useEffect  (()=>{
    createUserToDoList();
    getTask();    
  },[]) 
  return (
    <div className="container d-flex flex-column m-2 w-50 align-items-center p-5">
      <h1>Lista de Tareas</h1>
      <div className="input-group w-50">
        <input
          type="text"
          className="form-control"
          placeholder="Tienes alguna tarea pendiente?"
          aria-label="Tienes alguna tarea pendiente?"
          aria-describedby="basic-addon1"
          onKeyDown={handleNewTask}
        />
      </div>
      <ul className="list-group w-50 d-flex justify-content-between">
      {listElement.map((element) => {        
        return (          
            <li key={element.id} id={element.id} className="list-group-item d-flex justify-content-between ">
              {element.label}
              <span className="button-delete" onClick={handleClick}>
                x
              </span>
            </li>          
        );
      })}
      </ul>
      <div className="list-group w-50">
        <span className="list-group-item counter">
          {listElement.length} Tareas pendientes{" "}
        </span>
      </div>
    </div>
  );
};
export default Home;
