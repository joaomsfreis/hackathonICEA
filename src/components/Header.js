import React, { Component } from "react";
//import kalango from '../img/logo192.png';
import clubPetro from '../img/clubPetro.PNG'
import kalango from '../img/teste2.png'
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
                    <div className="col-11">
                        <div className="title">
                            <h1>Grupo Kalango Soluções</h1>
                        </div>
                    </div>
                    <div className="col-1 pt-2">
                            <img src={kalango} alt="logo" />
                    </div>
                </div>
                {/* <div className="row"> */}
                <div className='d-flex flex-row'>
                    <img src={clubPetro} alt="clubPetro" />
                </div>
                {/* </div> */}

            </header>
        );
    }
}
