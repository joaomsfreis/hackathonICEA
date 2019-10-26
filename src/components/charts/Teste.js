import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import $ from "jquery";

//Número de macroEstados

export default class Teste extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentWillMount() {
        console.log("MOUNT");
        $.ajax({
            url: "http://hackaengine-dot-red-equinox-253000.appspot.com/sales?per_page=200&offset=500",
            dataType: "json",
            success: function (response) {
                console.log(response)
            }.bind(this),
            error: function () {
            }.bind(this)
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        < Line
                            data={{
                                labels: ["1", "2", "3", "4"],
                                datasets: [{
                                    label: "teste",
                                    data: [2, 3, 1, 5],
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

                    <div className="col-12 col-md-6">
                        < Line
                            data={{
                                labels: ["1", "2", "3", "4"],
                                datasets: [{
                                    label: "teste",
                                    data: [2, 3, 1, 5],
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
