import React, {useState, useContext, useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../../App';
import '../../styles/css/style.css'

export default function FormUser() {
    const globalContext = useContext(GlobalContext);
    const [id, setId] = useState(globalContext.users.length + 1);
    const [defaultValue, setDefaultValue] = useState({
        name: '',
        username: '',
        email: "",
        phone: ""
    })

    const [user, setUser] = useState(defaultValue);
    
    const update = (e) => setUser({...user, [e.target.name] : e.target.value})
  
    const handleClick = (e) => {
        e.preventDefault();

        globalContext.setUsers([...globalContext.users, user])
    };

    useEffect(() => setId(globalContext.users.length + 1), []); //[] => lorsque le component est chargé

    useEffect(() => {
        setId(id + 1);
        setUser({...defaultValue, id:id});
    }, [globalContext.users]) //[] => lorsque le globalContext.users change

    return (
        <div className='container'>
            <div className="user">
                <NavLink to="/users">
                    <button className="button-custom"> Voir la liste des utilisateurs </button>
                </NavLink>
            </div>

            <h5 align="center">Créer votre utilisateur</h5>

            <form className='row justify-content-center align-items-center'>
                <div className="col-md-5">
                    <label>Nom</label>
                    <input
                        className="form-control"
                        onChange={(e) => update(e)}
                        value={user.name}
                        type="text"
                        name="name"
                        placeholder='Votre nom...'
                    />
                </div>

                <div className="col-md-5">
                    <label>Nom d'utilisateur</label>
                    <input
                        className="form-control"
                        onChange={(e) => update(e)}
                        value={user.username}
                        type="text"
                        name="username"
                        placeholder='Votre pseudo...'

                    />
                </div>

                <div className="col-md-5">
                    <label>Email</label>
                    <input
                        className="form-control"
                        onChange={(e) => update(e)}
                        value={user.email}
                        type="text"
                        name="email"
                        placeholder='Votre email...'

                    />
                </div>

                <div className="col-md-5">
                    <label>Numero de telephone</label>
                    <input
                        className="form-control"
                        onChange={(e) => update(e)}
                        value={user.phone}
                        type="text"
                        name="phone"
                        placeholder='Votre numero de telephone...'

                    />
                </div>

                <div className="flex-end">
                    <button className="button-custom ajout" onClick={(e) => handleClick(e)}>
                        Créer
                    </button> 
                </div>
            </form>
        </div>
    )
}

