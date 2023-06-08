import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/shared/api.service';

interface Place {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  sourceControl = new FormControl();
  destinationControl = new FormControl();
  serviceControl = new FormControl();
  dateControl = new FormControl(new Date());
  searchControl = new FormControl();

  constructor(private apiService: ApiService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getRoutes()
  }

  routes: any

  getUniqueFromValues() {
    return Array.from(new Set(this.routes?.map((route: any) => route.from)));
  }

  getUniqueToValues() {
    return Array.from(new Set(this.routes?.map((route: any) => route.to)));

  }

  getRoutes() {

    this.apiService.getRoutes().subscribe({
      next: (res: any) => {
        this.routes = res.data
        // console.log(this.routes)
        // console.log(this.getUniqueFromValues())
        // console.log(this.getUniqueToValues())

        let newArray = this.routes.map((route: any) => route.from)
        let uniqueValueArray = new Set(newArray)
        console.log(Array.from(uniqueValueArray))
        console.log(uniqueValueArray)
        // let finalArray = uniqueValueArray.map()
         

      },
      error: (err: any) => {
        console.log(err)
      }
    })

  }

  pickUpPoint: any
  destination: any
  busName: any
  date: any


  searchRoutes(pickUpPoint: any, destination: any, busName: any, date: any) {
    this.spinner.show()

    setTimeout(() => {

      this.router.navigate(['user/routes'], {
        queryParams: {
          pickUpPoint: pickUpPoint,
          destination: destination,
          busName: busName,
          date: date,
        }
      })

      this.spinner.hide()

    }, 3000)


  }




}
