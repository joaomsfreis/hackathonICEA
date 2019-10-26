import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import $ from "jquery";
import axios from 'axios';
import '../Style.css'

const basePath = 'http://hackaengine-dot-red-equinox-253000.appspot.com/sales';

//Número de macroEstados

export default class perDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days: [],
            values: []
        };
    }

    async componentWillMount() {
        console.log("MOUNT");

        const start = 21;
        const end = 24;

        const days = [];
        const values = [];

        var currentPage = 0;

        for (var count = start; count <= end; count++) {
            days.push(`${count}/10/2019`);
            values.push(0);
        }

        do {
            const { data } = await axios.get(basePath + `?per_page=${200}&offset=${currentPage * 200}`, {});

            data.forEach(element => {
                var dayIndex = 0;

                days.forEach(day => {
                    if (element.date.dia === parseInt(day))
                        values[dayIndex] += (element.quantity + element.products[0].data.pricePerUnit);

                    dayIndex++;
                });
            });

            currentPage++;

            if (currentPage > 1) {
                // if(data.length <= 0) {
                var index = 0;

                values.forEach(element => {
                    values[index] = Number((values[index]).toFixed(2));
                    index++;
                });

                this.setState({
                    days,
                    values
                })

                return;
            }
        } while (true);
    }

    render() {
        const {days, values} = this.state
        console.log(days, values)
        return (
            <div className="container">
                <div className="row">
                <div className="col-12 col-md-4 paragrafo">
                    <h5>Gráfico de valor total de vendas por dia</h5>
                </div>
                    <div className="col-12 col-md-8">
                        < Line
                            data={{
                                labels: days,
                                datasets: [{
                                    label: "teste",
                                    data: values,
                                    backgroundColor: "black",
                                    borderColor: "black",
                                    fill: false,
                                    cod: 1
                                }]
                            }}
                            options={{
                                legend: {
                                    display: true,
                                    position: "top"
                                },
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true,
                                            fontSize: 15,
                                        }
                                    }],
                                    xAxes: [{
                                        ticks: {
                                            fontSize: 12
                                        }
                                    }]
                                },
                                tooltips: { mode: "point", intersect: false },
                                elements: { line: { tension: 0 } }
                            }}
                        />

                    </div>

                </div>
            </div>
        );
    }
}