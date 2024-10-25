import React, { Component } from 'react'
import axios from "axios"
import Global from "./Global"
import { NavLink } from 'react-router-dom'
import Personajes from './Personajes'

export default class Serie extends Component {
    state = {
        serie: null,
        personajes: null
    }

    loadSerie = () => {
        if(this.props.id){
            let endpoint = 'api/series/'+this.props.id;
    
            axios.get(Global.urlSeries + endpoint)
            .then(response => {
                this.setState({
                    serie: response.data
                })
            })
        } else {
            let endpoint = 'api/personajes';

            axios.get(Global.urlSeries + endpoint)
            .then(response => {
                let personajes = [];

                for (const personaje of response.data) {
                    if(personaje.idSerie == this.props.idserie){
                        personajes.push(personaje)
                    }
                    
                }
                
                this.setState({
                    personajes: personajes
                })
            })
        }
    }

    componentDidMount = () => {
        this.loadSerie();
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.id !== this.props.id || prevProps.idserie !== this.props.idserie){
            this.loadSerie();
        }
    }
    render() {
        return (
            <>
                {
                    this.props.idserie ? (
                        <div className='p-3'>
                            <h1>Personas de {this.props.idserie}</h1>
                            <NavLink to={'/serie/'+this.props.idserie} className={'btn btn-danger w-100'}>Volver a serie</NavLink>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Personaje</th>
                                        <th>Imagen</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.personajes && (
                                            this.state.personajes.map((personaje, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{personaje.nombre}</td>
                                                        <td>
                                                            <img src={personaje.imagen} width={'200px'}/>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="card w-100">
                            {
                                this.state.serie && (
                                    <>
                                        <img src={this.state.serie.imagen} className="card-img-top w-25" alt={this.state.serie.nombre} />
                                        <div className="card-body">
                                        <h5 className="card-title">{this.state.serie.nombre}</h5>
                                        <p className="card-text">IMDB: {this.state.serie.puntuacion}</p>
                                        <NavLink to={'/personajes/'+this.state.serie.idSerie} className="btn btn-primary w-100">Personajes</NavLink>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    )
                }
            </>
        )
    }
}
