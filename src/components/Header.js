import React, { Component } from "react";
//import kalango from '../img/logo192.png';
import clubPetro from '../img/clubPetro.PNG'
import kalango from '../img/kalango.jpg'
import './Style.css'

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgStyle: {
                width: '3%'
            },
            headerStyle: {
                borderStyle: 'solid',
                borderBottomWidth: '10px',
                borderLeftWidth: '0px',
                borderRightWidth: '0px',
                borderWidth: '0px',
                paddingBottom: '100px'
            }
        };
    }


    render() {
        return (
            <header className='pb-5'>
                teste
            </header>
        );
    }
}
