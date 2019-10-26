import React, { Component } from 'react'
import PerDay from './charts/perDay'
import Header from './Header'
import './Style.css'
import BarDay from './charts/barDay';
import grafico from '../img/grafico3.jpeg'

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option: true

        };
    }

    selectButton(e) {
        const option = this.state.option ? false : true
        console.log('oi')
        this.setState({
            option
        })

    }

    render() {
        const { option } = this.state
        return (
            <div>
                <Header />

                <div className="container-fluid">
                    <div className="row" style={{ margin: "0 1.1em" }} >
                        <div onClick={this.selectButton.bind(this)} className="col-6 text-center" style={{ backgroundColor: '#D3D3D3', color: 'white', borderRadius: "15px 15px 0 0", cursor: "pointer" }}>
                            <h3 style={{ color: '#FFF' }}>Gráficos de Dados</h3>
                        </div>
                        <div onClick={this.selectButton.bind(this)} className="col-6 text-center" style={{ backgroundColor: '	#FFB95E', color: 'orange', borderRadius: "15px 15px 0 0", cursor: "pointer" }}>
                            <h3 style={{ color: '#FFF' }}>Análise de Predição</h3>
                        </div>
                    </div>
                </div>
                {
                    option ?
                        <div>
                            <div className="body-background">
                                <PerDay />
                            </div>
                            <div className="body-background2">
                                <BarDay />
                            </div>
                        </div>
                        :
                        <div className="body-background-solution">
                            <div className="row">
                                <div className="col-12 col-md-12 paragrafo">
                                    <img  class="grafico" src={grafico} alt="grafico"/>
                                </div>

                            </div>
                        </div>


                }
            </div>
        )
    }
}