import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { GlobalContext } from "../../App";

export default function FormToDo() {
    const globalContext = useContext(GlobalContext);
    const { idToUpdate } = useParams();
    const [id, setId] = useState(globalContext.todos.length + 1);
    const [defaultValue, setDefaultValue] = useState({
        text: 'Faire la lessive',
        todoFait: false,
        priority: 1,
        check: false
    })

    const [todo, setTodo] = useState({});
    useEffect(() => {
        console.log('gc reload')
        
        if(idToUpdate >= 0){
            setTodo(globalContext.todos.filter(todo => todo.id == idToUpdate)[0]);
        }
        else{
            setId(id + 1);
            setTodo({...defaultValue, id:id});
        }
    }, [globalContext.todos])
    
    const update = (e) => setTodo({...todo, [e.target.name] : e.target.value})
  
    const handleClick = () => {
        let todos = [];

        if(idToUpdate >= 0){
            todos = globalContext.todos.filter(todoG => todoG.id != todo.id);
        } else{
            todos = globalContext.todos;
        }

        globalContext.setTodos([...todos, todo]);
    };

    useEffect(() => setId(globalContext.todos.length + 1), []); //[] => lorsque le component est chargé

    

    return (
        <div className="container">
            <div className="todo">
                <NavLink to="/todos">
                    <button className="button-custom button-custom-outline"> Voir la liste des todos </button>
                </NavLink>
            </div>

            <h4>Entrer votre todo</h4>
            <div className="row">
                <div className="col-md-4">
                    <label>To do</label>
                    <input
                        className="form-control"
                        onChange={(e) => update(e)}
                        value={todo.text}
                        type="text"
                        name="text"
                    />
                </div>

                <div className="col-md-4">
                    <label>Ordre de priorité</label>
                    <select name="priority" className="form-select" value={todo.priority} onChange={(e) => update(e)}>
                        <option value={0}>Faible</option>
                        <option value={1}>Moyen</option>  
                        <option value={2}>Elevé</option>  
                    </select>
                </div>
                <div className="col-md-4" style={{marginTop: "15px"}}>
                    <button className="button-custom" onClick={() => handleClick()}>
                        Ajouter
                    </button> 
                </div>
            </div>

        </div>
    )
}