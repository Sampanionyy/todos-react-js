import React, { Component } from 'react'
import { Outlet } from "react-router-dom"

export default class Accueil extends Component {
    render() {
        return (
            <>
                <div className='container text-center'>
                    <h1 className='d-flex justify-content-center align-items-center'>Bienvenue dans la page d'accueil</h1>
                    <Outlet />
                </div>
            </>
        )
    }
}
