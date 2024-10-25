import React, { Component } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import Home from './Home'
import Menu from './Menu'
import Serie from './Serie';
import CreatePersonaje from './CreatePersonaje';
import UpdatePersonaje from './UpdatePersonaje';

export default class Router extends Component {
    render() {
        function GetReadSerie(){
            const { id } = useParams();
            return <Serie id={id}/>
        }

        function GetReadPersonajes(){
            const { idserie } = useParams();
            return <Serie idserie={idserie}/>
        }

        return (
            <BrowserRouter>
                <Menu/>
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/serie/:id' element={<GetReadSerie/>}></Route>
                    <Route path='/personajes/:idserie' element={<GetReadPersonajes/>}></Route>
                    <Route path='/create' element={<CreatePersonaje/>}></Route>
                    <Route path='/update' element={<UpdatePersonaje/>}></Route>
                </Routes>
            </BrowserRouter>
        )
    }
}
