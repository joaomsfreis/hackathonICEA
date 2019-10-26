import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
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
            <div>

                <Bar
                    data={{
                        labels: ["1", "2", "3"],
                        datasets: [
                            {
                                data: [1, 2, 3],
                                backgroundColor: "rgba(60, 141, 188, 1)"
                            }]
                    }}
                    options={{
                        legend: {
                            display: false
                        },
                        scales: {
                            yAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: "Quantidade",
                                    fontSize: 18
                                },
                                ticks: {
                                    fontSize: 15
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    fontSize: 15
                                }
                            }]
                        },
                    }}

                />
            </div>
        );
    }
}
