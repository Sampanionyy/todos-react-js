import React, { useContext, useEffect, useState } from "react";
import {NavLink, Link, useNavigate} from 'react-router-dom'
import { GlobalContext } from "../../App";
import { MdUpdate, MdCheckCircleOutline, MdCheckCircle } from "react-icons/md";


export default function ListTodo() {
    const globalContext = useContext(GlobalContext);
    const navigate = useNavigate();
    const [checklist, setChecklist] = useState([]);

    const style = {
        fontSize: "30px",
        lineHeight: 0,
        color: "#FFD23F"
    }
    const styleOf = {
        fontSize: "25px",
        lineHeight: 0,
    }
    const styleOfAdd = {
        display: "flex",
        justifyContent: "left"
    }

    const functionWithSwitch = (parameter) => {
        switch (parameter) {
            case 0:
                return 'Faible'
            case 1:
                return 'Moyen'
            default:
                return 'Elevé';
        }
    }

    const handleCheck = (todoId) => {
        let list = checklist;
        if (!list.includes(todoId)){
            list.push(todoId);
            setChecklist([...list]);
        } else {
            list = list.filter((id) => id != todoId);
            setChecklist([...list]);
        }
    }

    const removeChecked = () => {
        checklist.forEach(id => {
            globalContext.setTodos(globalContext.todos.filter(todo => todo.id != id));
        });
    }

    const changeTodoFait = (index) => {
        let todos = globalContext.todos;
        
        todos[index].todoFait = !todos[index].todoFait;
        globalContext.setTodos([...todos]);
    }

    const updateTodo = (index) => {
        navigate(`add/${index}`);
    }

    return (
        <div className='container'>
            <div style={styleOfAdd}>
                <div style={{marginRight: "5px"}}>
                    <Link to="/todos/add">
                        <button className="button-custom"> + Ajouter </button>
                    </Link>
                </div>
                <div>
                    <button className="button-custom-delete-outline" onClick={() => removeChecked()}>Supprimer</button>
                </div>
            </div>
            { globalContext.todos.length != 0 ? 
                <div style={{width:"100%"}}>
                    <h3 align="center">Liste des todos</h3>
                    <table className="table table-hover" style={{verticalAlign: "middle"}}>
                        <thead>
                            <tr>
                            <th scope="col"></th>
                            <th scope="col">Libellé</th>
                            <th scope="col">Priorité</th>
                            <th scope="col" colSpan={2}>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {globalContext.todos.map((todo, index) =>
                                <tr style={ { textDecoration: todo.todoFait ? 'line-through' : ''}} key={index}>
                                    <td><input type="checkbox" checked={checklist.includes(todo.id)} onChange={() => handleCheck(todo.id)} name="check" /></td>
                                    <td>{todo.text}</td>
                                    <td>{functionWithSwitch(todo.priority)}</td>
                                    <td>
                                        <span style={style}><MdUpdate onClick={() => updateTodo(todo.id)}/></span>
                                    </td>
                                    <td>
                                        <span style={styleOf}>{ !todo.todoFait ? <MdCheckCircleOutline onClick={() => changeTodoFait(index)}/> : <MdCheckCircle onClick={() => changeTodoFait(index)}/> }</span>
                                    </td>
                                </tr> )
                            }
                        </tbody>
                    </table>
                </div>
            : <h6>Aucun résultat disponible pour le moment</h6>}
        </div>
    )
}