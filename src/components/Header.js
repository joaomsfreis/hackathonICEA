import React, { Component } from "react";
//import kalango from '../img/logo192.png';
import clubPetro from '../img/clubPetro.PNG'
import kalango from '../img/kalango.jpg'
import './Style.css'

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <header className="mb-2">
                <div className="row">
                    <div className="col-2">
                        <img src={clubPetro} alt="clubPetro"/>
                    </div>
                </div>
                <div className="title">
                        <h1>Grupo Kalango Soluções</h1>
                </div>

            </header>
        );
    }
}
