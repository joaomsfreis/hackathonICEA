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
            day: 24,
            values: [],
            valuesF: []
        };
    }

    async componentWillMount() {
        const getValues = await getHourlySales(24)
        const valuesF = getValues.salesLoyalPerHour
        const values = getValues.hourlySales

        this.setState({
            values,
            valuesF
        })
    }

    render() {
        const {values, valuesF} = this.state
        return (
            <div className="container">
                <div className="row">
                <div className="col-12 col-md-4 paragrafo">
                    <h5>Gráfico de número de clientes por dia</h5>
                </div>
                    <div className="col-12 col-md-8">
                        < Bar
                            data={{
                                labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
                                datasets: [{
                                    label: "Total de clientes no dia",
                                    data: values,
                                    backgroundColor: "orangered"
                                },{
                                    label: "Total de clientes fidelizados",
                                    data: valuesF,
                                    backgroundColor: "white"
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
                                responsive: true,
                                tooltips: { mode: "index"},
                            }}
                        />

                    </div>

                </div>
            </div>
        );
    }
}

async function getIncome(start_day, end_day) {
    console.log(`Get Income Start_day: ${start_day} End_day: ${end_day}`);

    const days = [];
    const values = [];
    
    var currentPage = 0;
    
    for(var count = start_day; count <= end_day; count++) {
        days.push(count.toString());
        values.push(0);
    }
    
    do {
        const { data } = await axios.get(basePath + `?per_page=${200}&offset=${currentPage * 200}`, {});
    
    data.forEach(element => {
        var dayIndex = 0;
    
        days.forEach(day => {
            if(element.date.dia === parseInt(day))
                values[dayIndex] += (element.quantity + element.products[0].data.pricePerUnit);
    
            dayIndex++;
        });
    });
    
    currentPage++;
    
        if(data.length <= 0) {
            var index = 0;
        
            values.forEach(element => {
                values[index] = Number((values[index]).toFixed(2));
                index++;
            });
        
            console.log({ days, values });
            return;
        }
    } while(true);
}

async function getHourlySales(day) {
    console.log(`Get Income Per Hour Day: ${day}`);

    const hourlySales = [];
    const salesLoyalPerHour = [];

    var currentPage = 0;

    for(var count = 0; count < 24; count++) {
        hourlySales.push(0);
        salesLoyalPerHour.push(0);
    }

    do {
        const { data } = await axios.get(basePath + `?per_page=${200}&offset=${currentPage * 200}`, {});
    
    data.forEach(element => {
        if(element.date.dia === parseInt(day)) {
            hourlySales[element.date.hora]++;
            if(element.points > 0)
                salesLoyalPerHour[element.date.hora]++;
        }
    });
    
    currentPage++;
    
        if(data.length <= 0) {
            var index = 0;
        
            hourlySales.forEach(element => {
                hourlySales[index] = Number((hourlySales[index]).toFixed(2));
                index++;
            });
        
            console.log({ hourlySales, salesLoyalPerHour });
            return {hourlySales, salesLoyalPerHour};
        }
    } while(true);
}

async function getFirstIncomePerHour(day) {
    console.log(`Get First Income Per Hour Day: ${day}`);

    const values = [];

    var currentPage = 0;

    for(var count = 0; count < 24; count++)
        values.push(0);

    do {
        const { data } = await axios.get(basePath + `?per_page=${200}&offset=${currentPage * 200}`, {});
    
    data.forEach(element => {
        if(element.date.dia === parseInt(day)) {
            if(values[element.date.hora] == 0)
                values[element.date.hora] = Number(((element.quantity + element.products[0].data.pricePerUnit)).toFixed(2));
        }
    });
    
    currentPage++;
    
        if(data.length <= 0) {
            console.log({ firstIncomePerHour: values });
            return;
        }
    } while(true);
}

async function getMostExpensiveSalePerHour(day) {
    console.log(`Get Most Expensive Sale Per Hour Day: ${day}`);

    const values = [];

    var currentPage = 0;

    for(var count = 0; count < 24; count++)
        values.push(0);

    do {
        const { data } = await axios.get(basePath + `?per_page=${200}&offset=${currentPage * 200}`, {});
    
    data.forEach(element => {
        if(element.date.dia === parseInt(day)) {
            if(values[element.date.hora] < Number(((element.quantity + element.products[0].data.pricePerUnit)).toFixed(2)))
                values[element.date.hora] = Number(((element.quantity + element.products[0].data.pricePerUnit)).toFixed(2));
        }
    });
    
    currentPage++;
    
        if(data.length <= 0) {
            console.log({ mostExpensiveSalePerHour: values });
            return;
        }
    } while(true);
}

async function getTotalIncomePerHour(day) {
    console.log(`Get Total Income Per Hour Day: ${day}`);

    const values = [];

    var currentPage = 0;

    for(var count = 0; count < 24; count++)
        values.push(0);

    do {
        const { data } = await axios.get(basePath + `?per_page=${200}&offset=${currentPage * 200}`, {});
    
    data.forEach(element => {
        if(element.date.dia === parseInt(day)) {
                values[element.date.hora] += element.quantity + element.products[0].data.pricePerUnit;
        }
    });
    
    currentPage++;
    
        if(data.length <= 0) {
            var index = 0;
        
            values.forEach(element => {
                values[index] = Number((values[index]).toFixed(2));
                index++;
            });
            
            console.log({ totalIncomePerHour: values });
            return;
        }
    } while(true);
}