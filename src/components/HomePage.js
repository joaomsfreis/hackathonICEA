import React, { Component } from 'react'
import Teste from './charts/Teste'
import Header from './Header'

export default class HomePage extends Component {

    render() {
        return (
            <div>
                <Header />
                <Teste />
            </div>
        )
    }
}