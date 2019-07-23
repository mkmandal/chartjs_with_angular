import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import {WeatherService} from 'src/app/weather.service';
import {trigger,state,animate,transition,style } from '@angular/animations';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
      trigger('lineStyle',[
          transition('open => closed',[animate(5000)]),
          transition('open => closed',[animate('59s')])
      ])
  ]
})
export class AppComponent implements OnInit{
  
  title = 'welcome to chart js tutorial';
  LineChart=[];
  BarChart=[];
  PieChart=[];
  chart = [];

  temp_max=[];
  temp_min=[];
  alldates=[];
  temp=[];
 weatherDates = [];

  constructor(private _weather:WeatherService)
  {}

public getWeatherData()
{
    this._weather.dailyForeCast().
    subscribe(res=>
     {
       
       this.temp=res['list'].map(res=>res.main.temp);
      
        this.temp_max=res['list'].map(res=>res.main.temp_max);
         
        this.temp_min = res['list'].map(res => res.main.temp_min);
       
        this.alldates = res['list'].map(res => res.dt )
       
        
        
       this.alldates.forEach((res) => {
            let jsdate = new Date(res * 1000)
            this.weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
        })
            new Chart('canvas', {
                type: 'line',
                data: {
                  labels: this.weatherDates,
                  datasets: [
                    { 
                      data: this.temp_max,
                      borderColor: "#3cba9f",
                      fill: false
                    },
                    { 
                      data: this.temp_min,
                      borderColor: "#ffcc00",
                      fill: false
                    },

                    { 
                      data: this.temp,
                      borderColor: "#3cbd00",
                      fill: false
                    },
                  ]
                },
                options: {
                    title:{
                        text:"Weather line Chart",
                        display:true
                    },
                  legend: {
                    display: false
                  },
                  scales: {
                    xAxes: [{
                      display: true
                    }],
                    yAxes: [{
                      display: true
                    }],
                  }
                }
              });
       
        })
     }

     public getDataforBarChart()
     {
      this._weather.dailyForeCast().
      subscribe(res=>
       {
         this.temp=res['list'].map(res=>res.main.temp);
         this.temp_max=res['list'].map(res=>res.main.temp_max);
         this.temp_min = res['list'].map(res => res.main.temp_min);
         this.alldates = res['list'].map(res => res.dt )
       
         this.alldates.forEach((res) => {
              let jsdate = new Date(res * 1000)
              this.weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
          })
      new Chart('barChart', {
        type: 'bar',
       
      data: {
        
       labels: this.weatherDates,
       datasets: [{
           label: 'temprature',
           data: this.temp,
           
           backgroundColor: [
               'rgba(260, 99, 132, 0.2)',
               'rgba(54, 162, 235, 0.2)',
               'rgba(255, 206, 86, 0.2)',
               'rgba(75, 192, 192, 0.2)',
               'rgba(153, 102, 255, 0.2)',
               'rgba(255, 159, 64, 0.2)'
           ],
           borderColor: [
               'rgba(255,99,132,1)',
               'rgba(54, 162, 235, 1)',
               'rgba(255, 206, 86, 1)',
               'rgba(75, 192, 192, 1)',
               'rgba(153, 102, 255, 1)',
               'rgba(255, 159, 64, 1)'
           ],
           borderWidth: 1
       },
       {
        label: "max Temprature",
        data: this.temp_max
    },
    {
      label: "min Temprature",
      data: this.temp_min,
      backgroundColor: "blue",
      
  }
      
      
      ],


       
      },
      options: {
       title:{
           text:"Bar Chart",
           display:true
       },
       scales: {
           yAxes: [{
               ticks: {
                   beginAtZero:true
               }
           }]
       }
      }
      });
      console.log('date',this.weatherDates)
      console.log('date',this.temp)


    })
     }


     

  ngOnInit(){
      this.getWeatherData();
      this.getDataforBarChart();
  }


  // chartOptions = {
  //   responsive: true    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
  // }
  
  // labels =  this.weatherDates
  // chartData = [
  //   {
  //     label: 'MAX_TEMP',
  //     data: this.temp_max
  //   },
  //   { 
  //     label: 'MIN_TEMP',
  //     data: this.temp_min
  //   }
  // ];


  // colors = [
  //   { // 1st Year.
  //     backgroundColor: 'rgba(77,83,96,0.2)'
  //   },
  //   { // 2nd Year.
  //     backgroundColor: 'rgba(30, 169, 224, 0.8)'
  //   }
  // ]

  // onChartClick(event) {
  //   console.log(event);
  // }


}



