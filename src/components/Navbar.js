import React from 'react'
import {NavLink} from 'react-router-dom'
import '../styles/css/style.css'

export default class Navbar extends React.Component {
  render() {
    return (
        <nav>
			<div>
				<NavLink to="/">Accueil</NavLink>
			</div>

			<div>
				<NavLink to="/todos">Todos</NavLink>
			</div>

			<div>
				<NavLink to="/users">Utilisateurs</NavLink>
			</div>

			<div>
				<NavLink to="/publications">Publications</NavLink>
			</div>

        </nav>
    )
  }
}
