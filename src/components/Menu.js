import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import axios from "axios"
import Global from "./Global"

export default class Menu extends Component {
    state = {
        series: null
    }

    loadSeries = () => {
        let endpoint = 'api/series';

        axios.get(Global.urlSeries + endpoint)
        .then(response => {
            this.setState({
                series: response.data
            })
        })
    }

    componentDidMount = () => {
        this.loadSeries();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <NavLink to="/" className="navbar-brand">Series</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/create" className="nav-link">Nuevo personaje</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/update" className="nav-link">Modificar personaje</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Series
                                </a>
                                <ul className="dropdown-menu">
                                    {
                                        this.state.series && (
                                            this.state.series.map((serie, index) => {
                                                return (
                                                    <li key={index}>
                                                        <NavLink to={"/serie/"+serie.idSerie}className="dropdown-item">{serie.nombre}</NavLink>
                                                    </li>
                                                )
                                            })
                                        )
                                    }
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
