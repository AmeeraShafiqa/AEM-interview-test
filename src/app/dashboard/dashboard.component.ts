import { Component, OnInit } from '@angular/core';
import { DashboardApi } from '../api/Dashboard-api';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Chart, registerables } from 'chart.js';

export interface chart {
  name: string;
  value: number;
}

export interface table {
  firstName: any;
  lastName: any;
  username: any;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  dashboard: Observable<any> = this.DashboardApi.getDashboardData();
  public getData: any;
  getBarName: any[] = [];
  getBarvalue: any[] = [];
  getDonutName: any[] = [];
  getDonutValue: any[] = [];
  getTable: table[] = []
  displayedColumns: string[] = ['position', 'fname', 'lname', 'ffname'];
  dataSource: any

  constructor(
    private DashboardApi: DashboardApi,
    private AuthService: AuthService
  ) { }
  ngOnInit() {
    this.dashboard.subscribe((res) => {
      this.getData = res;
      console.log(res, 'res');


      //donut
      this.getData.chartDonut.forEach((x: chart) => {
        this.getDonutName.push(x.name);
        this.getDonutValue.push(x.value);
      });

      var myChart1 = new Chart('myChart1', {
        type: 'doughnut',
        data: {
          // labels: this.getDonutName,
          datasets: [
            {
              data: this.getDonutValue,
              backgroundColor: ["#CACFD2", "#626567", "#909497", "#A6ACAF"],
              borderColor: ["#CACFD2", "#626567", "#909497", "#A6ACAF"],
              borderWidth: 1,
            },
          ],
        },
        options: {

          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });

      //bar
      this.getData.chartBar.forEach((x: chart) => {
        this.getBarName.push(x.name);
        this.getBarvalue.push(x.value);
      });
      var myChart = new Chart('myChart', {
        type: 'bar',
        data: {
          labels: this.getBarName,
          datasets: [
            {
              data: this.getBarvalue,
              backgroundColor: ["#909497"],
              borderColor: ["#909497"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              display: false // Hide Y axis labels
            },
            x: {
              display: false // Hide X axis labels
            }
          }
        }
      })

      //table
      this.getData.tableUsers.forEach((x: table) => {
        let data = { firstName: x.firstName, lastName: x.lastName, username: x.username }
        this.getTable.push(data)
      });
      this.dataSource = this.getTable
    });
  }

  logout() {
    this.AuthService.logout();
  }
}
