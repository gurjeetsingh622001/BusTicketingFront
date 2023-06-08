import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {

  form: FormGroup;
  noRouteFound = false;
  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router, private spinner: NgxSpinnerService) {

    this.form = new FormGroup({
      from: new FormControl(),
      to: new FormControl(),
      busName: new FormControl(),
      date: new FormControl()
    })

  }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params: any) => {
      this.form.patchValue({
        'from': params['pickUpPoint'],
        'to': params['destination'],
        'busName': params['busName'],
        'date': params['date'],
      })

      this.getSearchResults1()
    });

  }

  routeData: any

  getSearchResults() {
    this.spinner.show();
    setTimeout(
      () => {

        this.apiService.getSearchResults(this.form.value).subscribe({
          next: (res: any) => {
            console.log(res.message)
            if (res.success == true) {
              this.noRouteFound = false
              this.routeData = res.data
            }
            else {
              this.noRouteFound = true

            }
          },
          error: (err: any) => {
            console.log(err)
          }
        })

        this.spinner.hide()
      },
      3000
    )


  }

  getSearchResults1() {

    this.apiService.getSearchResults(this.form.value).subscribe({
      next: (res: any) => {
        console.log(res.message)
        if (res.success == true) {
          this.noRouteFound = false
          this.routeData = res.data
        }
        else {
          this.noRouteFound = true

        }
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }



  bookTickect(busNumber: any, busName: any, price: number) {
    this.spinner.show()
    setTimeout(
      () => {
        this.router.navigate(['/user/invoice'],
          {
            queryParams: {
              pickUpPoint: this.form.value.from,
              destination: this.form.value.to,
              busName: busName,
              date: this.form.value.date,
              busNumber: busNumber,
              price: price,
            }
          }
        )
        this.spinner.hide();
      },
      3000
    )

  }

}
