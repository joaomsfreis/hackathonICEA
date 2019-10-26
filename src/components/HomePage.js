import React, { Component } from 'react'
import PerDay from './charts/perDay'
import Header from './Header'
import './Style.css'
import BarDay from './charts/barDay';

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
                        <div onClick={this.selectButton.bind(this)} className="col-6 text-center" style={{ backgroundColor: '#D3D3D3', color: 'white', borderRadius: "15px 15px 0 0" }}>
                            <h3 style={{ color: 'orange' }}>Gráficos de Dados</h3>
                        </div>
                        <div onClick={this.selectButton.bind(this)} className="col-6 text-center" style={{ backgroundColor: '	#FFB95E', color: 'orange', borderRadius: "15px 15px 0 0" }}>
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
                        <div className="board-dois">
                            <div className="body-background-solution">
                                <p>Oi</p>
                            </div>
                            <div class="alert alert-danger body-background-solution2" role="alert">
                                Alerta de possível baixa de vendas!
                             </div>
                        </div>



                }

            </div>
        )
    }
}