import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import $ from "jquery";
import axios from 'axios';
import '../Style.css'

const basePath = 'http://hackaengine-dot-red-equinox-253000.appspot.com/sales';

//Número de macroEstados

export default class barDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days: [],
            values: [],
            valuesF: []
        };
    }

    async componentWillMount() {
        const start = 20;
        const end = 24;

        const getValues = await getNumberSales(start, end)

        const values = getValues.sales
        const valuesF = getValues.salesLoyal
        const days = getValues.days

        this.setState({
            values, days, valuesF
        })
    }

    render() {
        const { values, valuesF, days } = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 paragrafo">
                        <h5>LOG</h5>
                    </div>
                    <div className="col-12 col-md-7 paragrafo">
                        
                    <h5>Gráfico como o valor vendido por dia</h5>
                        < Bar
                            data={{
                                labels: days,
                                datasets: [{
                                    label: "Total de clientes no dia",
                                    data: values,
                                    backgroundColor: "orangered"
                                }, {
                                    label: "Total de clientes fidelizados",
                                    data: valuesF,
                                    backgroundColor: "#a3a3a3"
                                }]
                            }}
                            options={{
                                legend: {
                                    display: true,
                                    position: "top"
                                },
                                scales: {
                                    yAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: "Número de clientes",
                                            fontSize: 18
                                        },
                                        ticks: {
                                            beginAtZero: true,
                                            fontSize: 15,
                                        }
                                    }],
                                    xAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: "Dias",
                                            fontSize: 18
                                        },
                                        ticks: {
                                            fontSize: 12,
                                            labelString: 'oi'
                                        }
                                    }]
                                },
                                responsive: true,
                                tooltips: { mode: "index" },
                            }}
                        />

                    </div>

                </div>
            </div>
        );
    }
}

async function getNumberSales(start_day, end_day) {
    console.log(`Get Number Sales`);

    const days = [];
    const sales = [];
    const salesLoyal = [];

    for (var count = start_day; count <= end_day; count++) {
        days.push(count);
        sales.push(0);
        salesLoyal.push(0);
    }

    var currentPage = 0;

    do {
        const { data } = await axios.get(basePath + `?per_page=${200}&offset=${currentPage * 200}`, {});

        data.forEach(element => {
            var indexDay = 0;

            days.forEach(day => {
                if (element.date.dia === parseInt(day)) {
                    sales[indexDay]++;
                    if (element.points > 0)
                        salesLoyal[indexDay]++;
                }

                indexDay++;
            });
        });

        currentPage++;

        if (data.length <= 0) {
            console.log({ days, sales, salesLoyal });
            return { days, sales, salesLoyal };
        }
    } while (true);
}

async function getC(start_day, end_day) {
    console.log(`Get Income Start_day: ${start_day} End_day: ${end_day}`);

    const days = [];
    const values = [];
    const valuesF = [];

    var currentPage = 0;

    for (var count = start_day; count <= end_day; count++) {
        days.push(count.toString());
        values.push(0);
        valuesF.push(0);
    }

    do {
        const { data } = await axios.get(basePath + `?per_page=${200}&offset=${currentPage * 200}`, {});

        data.forEach(element => {
            var dayIndex = 0;

            days.forEach(day => {
                if (element.date.dia === parseInt(day)) {
                    values[dayIndex] += (element.quantity + element.products[0].data.pricePerUnit);

                    if (element.points > 0)
                        valuesF[dayIndex] += (element.quantity + element.products[0].data.pricePerUnit);
                }

                dayIndex++;
            });
        });

        currentPage++;

        if (data.length <= 0) {
            var index = 0;

            values.forEach(element => {
                values[index] = Number((values[index]).toFixed(2));
                index++;
            });

            console.log({ days, values, valuesF });
            return ({ days, values, valuesF });
        }
    } while (true);
}

async function getIncome(start_day, end_day) {
    console.log(`Get Income Start_day: ${start_day} End_day: ${end_day}`);

    const days = [];
    const values = [];

    var currentPage = 0;

    for (var count = start_day; count <= end_day; count++) {
        days.push(count.toString());
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

        if (data.length <= 0) {
            var index = 0;

            values.forEach(element => {
                values[index] = Number((values[index]).toFixed(2));
                index++;
            });

            console.log({ days, values });
            return;
        }
    } while (true);
}

async function getHourlySales(day) {
    console.log(`Get Income Per Hour Day: ${day}`);

    const hourlySales = [];
    const salesLoyalPerHour = [];

    var currentPage = 0;

    for (var count = 0; count < 24; count++) {
        hourlySales.push(0);
        salesLoyalPerHour.push(0);
    }

    do {
        const { data } = await axios.get(basePath + `?per_page=${200}&offset=${currentPage * 200}`, {});

        data.forEach(element => {
            if (element.date.dia === parseInt(day)) {
                hourlySales[element.date.hora]++;
                if (element.points > 0)
                    salesLoyalPerHour[element.date.hora]++;
            }
        });

        currentPage++;

        if (data.length <= 0) {
            var index = 0;

            hourlySales.forEach(element => {
                hourlySales[index] = Number((hourlySales[index]).toFixed(2));
                index++;
            });

            console.log({ hourlySales });
            return { hourlySales };
        }
    } while (true);
}

async function getFirstIncomePerHour(day) {
    console.log(`Get First Income Per Hour Day: ${day}`);

    const values = [];

    var currentPage = 0;

    for (var count = 0; count < 24; count++)
        values.push(0);

    do {
        const { data } = await axios.get(basePath + `?per_page=${200}&offset=${currentPage * 200}`, {});

        data.forEach(element => {
            if (element.date.dia === parseInt(day)) {
                if (values[element.date.hora] == 0)
                    values[element.date.hora] = Number(((element.quantity + element.products[0].data.pricePerUnit)).toFixed(2));
            }
        });

        currentPage++;

        if (data.length <= 0) {
            console.log({ firstIncomePerHour: values });
            return;
        }
    } while (true);
}

async function getMostExpensiveSalePerHour(day) {
    console.log(`Get Most Expensive Sale Per Hour Day: ${day}`);

    const values = [];

    var currentPage = 0;

    for (var count = 0; count < 24; count++)
        values.push(0);

    do {
        const { data } = await axios.get(basePath + `?per_page=${200}&offset=${currentPage * 200}`, {});

        data.forEach(element => {
            if (element.date.dia === parseInt(day)) {
                if (values[element.date.hora] < Number(((element.quantity + element.products[0].data.pricePerUnit)).toFixed(2)))
                    values[element.date.hora] = Number(((element.quantity + element.products[0].data.pricePerUnit)).toFixed(2));
            }
        });

        currentPage++;

        if (data.length <= 0) {
            console.log({ mostExpensiveSalePerHour: values });
            return;
        }
    } while (true);
}

async function getTotalIncomePerHour(day) {
    console.log(`Get Total Income Per Hour Day: ${day}`);

    const values = [];

    var currentPage = 0;

    for (var count = 0; count < 24; count++)
        values.push(0);

    do {
        const { data } = await axios.get(basePath + `?per_page=${200}&offset=${currentPage * 200}`, {});

        data.forEach(element => {
            if (element.date.dia === parseInt(day)) {
                values[element.date.hora] += element.quantity + element.products[0].data.pricePerUnit;
            }
        });

        currentPage++;

        if (data.length <= 0) {
            var index = 0;

            values.forEach(element => {
                values[index] = Number((values[index]).toFixed(2));
                index++;
            });

            console.log({ totalIncomePerHour: values });
            return;
        }
    } while (true);
}