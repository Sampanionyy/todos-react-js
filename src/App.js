import 'bootstrap/dist/css/bootstrap.css';
import FormToDo from './components/todos/FormToDo';
import FormUser from './components/users/FormUser';
import Accueil from './components/Accueil';
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from './components/Navbar';
import { createContext, useState, useEffect, useCallback } from 'react';
import ListTodo from './components/todos/ListTodo';
import ListUser from './components/users/ListUser';
import ListPublication from './components/publications/ListPublication';


export const GlobalContext = createContext(null);

function App() {
	const [todos, setTodos] = useState([]);
	const [publications, setPublications] = useState([]);
	const [users, setUsers] = useState([]);
	const [commentaires, setCommentaires] = useState([]);

	useEffect(() => {
        if(users.length == 0) {
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(response => response.json())
                .then(data => {
					setUsers([...data]);
                })
        }
    }, [])

	return (
		<div className="App">
			<GlobalContext.Provider value={{todos, setTodos, publications, setPublications, users, setUsers,commentaires, setCommentaires}}>
				<BrowserRouter>
					<Navbar/>
					<Routes>
						<Route path='/' element={<Accueil/>}></Route>
						<Route path='/todos'>
							<Route index element={<ListTodo/>}></Route>
							<Route path='/todos/add' element={<FormToDo/>}></Route>
							<Route path='/todos/add/:idToUpdate' element={<FormToDo/>}></Route>
						</Route>
						<Route path='/users'>
							<Route index element={<ListUser/>}></Route>
							<Route path='/users/add' element={<FormUser/>}></Route>
						</Route>
						
						<Route path='/publications' element={<ListPublication/>}></Route>
					</Routes>
				</BrowserRouter>
			</GlobalContext.Provider>
		</div>
	);
}

export default App;
