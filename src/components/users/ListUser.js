import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faTrashCan
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../App'


export default function ListUser() {
    const globalContext = useContext(GlobalContext);
    const [boolData, setBoolData] = useState(null);
    const [listeUser, setListeUser] = useState([]);
    
    useEffect(() => {
        setListeUser([...globalContext.users])
    }, [globalContext.users])
    
    const deleteUser = (id) => {
        globalContext.setUsers(globalContext.users.filter(user => user.id != id));

        if((globalContext.users.length - 1) == 0){
            setBoolData(false)
        }
    }

    return (
        <div className='container'>
            <div className="user">
                <Link to="/users/add">
                    <button className="button-custom"> + Ajouter </button>
                </Link>
            </div>
            { listeUser.length != 0 ? <div>
                <h3 align="center">Liste des utilisateurs</h3>
            
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Nom</th>
                            <th scope="col">Prénoms</th>
                            <th scope="col">Email</th>
                            <th scope="col">Telephone</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {listeUser.map((user, index) => 
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <span style={{cursor: "pointer"}} onClick={() => deleteUser(user.id)}>
                                        <FontAwesomeIcon icon={ faTrashCan } style={{color: "red"}}/>
                                    </span>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table></div>
            : <h6>Aucun résultat disponible pour le moment</h6>}
        </div>
    )
}

