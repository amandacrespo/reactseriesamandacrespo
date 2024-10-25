import React, { Component, createRef } from 'react'
import axios from "axios"
import Global from "./Global"
import { Navigate } from 'react-router-dom';

export default class CreatePersonaje extends Component {
    
    cajaNombre = createRef();
    cajaImagen = createRef();
    selectSerie = createRef();

    state = {
        series: null, 
        status: false
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

    createPersonaje = (e) => {
        e.preventDefault();

        let endpoint = 'api/personajes';

        let idPersonaje = 0;
        let nombre = this.cajaNombre.current.value;
        let imagen = this.cajaImagen.current.value;
        let idSerie = parseInt(this.selectSerie.current.value);

        axios.post(Global.urlSeries + endpoint, {
            idPersonaje,
            nombre,
            imagen,
            idSerie
        })
        .then(response => {
            console.log('creado');
            this.setState({
                status: true
            })
        })
    }

    componentDidMount = () => {
        this.loadSeries();
    }

    render() {
        return (
            <div className='p-3'>
                {
                    this.state.status && (
                        <Navigate to={'/personajes/'+this.selectSerie.current.value}/>
                    )
                }
                <h1>Crear personaje</h1>
                <form>
                    <div className="mb-3">
                        <label for="nombre" className="form-label">Nombre</label>
                        <input type="text" className="form-control" id="nombre" ref={this.cajaNombre}/>
                    </div>
                    <div className="mb-3">
                        <label for="imagen" className="form-label">Imagen</label>
                        <input type="url" className="form-control" id="imagen" ref={this.cajaImagen}/>
                    </div>
                    <div className="mb-3">
                        <label for="serie" className="form-label">Serie</label>
                        <select className="form-select" id="select" ref={this.selectSerie}>
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
                    <button type="button" className='btn btn-success w-100' onClick={this.createPersonaje}>Crear personaje</button>
                </form>
            </div>
        )
    }
}
