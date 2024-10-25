import React, { Component, createRef } from 'react'
import { Navigate } from 'react-router-dom'
import axios from "axios"
import Global from "./Global"

export default class UpdatePersonaje extends Component {
    state = {
        status: false,
        series: null,
        serie: null,
        personajes: null,
        personaje: null
    }

    selectSerie = createRef();
    selectPersonaje = createRef();

    loadSeries = () => {
        let endpoint = 'api/series';

        axios.get(Global.urlSeries + endpoint)
        .then(response => {
            this.setState({
                series: response.data
            })
        })
    }

    mostrarSerie = () => {
        let id = this.selectSerie.current.value;
        let endpoint = 'api/series/'+id;
    
        axios.get(Global.urlSeries + endpoint)
        .then(response => {
            this.setState({
                serie: response.data
            })
        })
    }

    mostrarPersonaje = () => {
        let id = this.selectPersonaje.current.value;
        let endpoint = 'api/personajes/'+id;
    
        axios.get(Global.urlSeries + endpoint)
        .then(response => {
            this.setState({
                personaje: response.data
            })
        })
    }

    loadPersonajes = () => {
        let endpoint = 'api/personajes';

        axios.get(Global.urlSeries + endpoint)
        .then(response => {           
            this.setState({
                personajes: response.data
            })
        })
    }

    modificarPersonaje = () => {
        let idSerie = this.selectSerie.current.value;
        let idPersonaje = this.selectPersonaje.current.value;

        let endpoint = 'api/personajes/'+idPersonaje+'/'+idSerie;

        axios.put(Global.urlSeries + endpoint)
        .then(response => {
            console.log('actualizado');
            this.setState({
                status: true
            })
        })
    }

    componentDidMount = () => {
        this.loadSeries();
        this.loadPersonajes();
    }

    render() {
        return (
            <div className='p-3'>
                {
                    this.state.status && (
                        <Navigate to={'/personajes/'+this.selectSerie.current.value}/>
                    )
                }
                <h1>Modificar personaje</h1>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Serie</label>
                        <select className="form-select" ref={this.selectSerie} onChange={this.mostrarSerie}>
                        {
                            this.state.series && (
                                this.state.series.map((serie, index) => {
                                    return (
                                        <option key={index} value={serie.idSerie}>
                                            {serie.nombre}
                                        </option>
                                    )
                                })
                            )
                        }
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Personajes</label>
                        <select className="form-select" ref={this.selectPersonaje} onChange={this.mostrarPersonaje}>
                        {
                            this.state.personajes && (
                                this.state.personajes.map((personaje, index) => {
                                    return (
                                        <option key={index} value={personaje.idPersonaje}>
                                            {personaje.nombre}
                                        </option>
                                    )
                                })
                            )
                        }
                        </select>
                    </div>
                    <button type="button" className='btn btn-success w-100' onClick={this.modificarPersonaje}>Modificar personaje</button>
                    <div className='container mt-3'>
                        <div className='row row-cols-2'>
                            <div className='col'>
                                {
                                    this.state.serie && (
                                        <>
                                            <h1>{this.state.serie.nombre}</h1>
                                            <img src={this.state.serie.imagen} className='w-100'/>
                                        </>
                                    )
                                }
                            </div>
                            <div className='col'>
                                {
                                    this.state.personaje && (
                                        <>
                                            <h1>{this.state.personaje.nombre}</h1>
                                            <img src={this.state.personaje.imagen} className='w-100'/>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
