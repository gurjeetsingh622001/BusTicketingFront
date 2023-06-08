import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
declare var Razorpay: any;
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  pickUpPoint: any
  destination: any
  busName: any
  busNumber: any
  date: any
  price: any
  Qty = 1;
  total: number = 0;
  currentTotal: number = 0;
  rupeeInPaisa: number = 0;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private datePipe: DatePipe) {

    this.route.queryParams.subscribe((params: any) => {

      this.pickUpPoint = params['pickUpPoint'];
      this.destination = params['destination'];
      this.busName = params['busName'];
      this.busNumber = params['busNumber'];
      this.date = this.datePipe.transform(params['date'], 'dd-MM-yyyy');
      this.price = Number(params['price']).valueOf();
      this.total = Number(params['price']).valueOf();
      this.currentTotal = Number(params['price']).valueOf();

    });
  }

  ngOnInit(): void {

  }

  options = {
    "key": "rzp_test_Rcfa77TxYpT0Gn", // Enter the Key ID generated from the Dashboard
    "amount": 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Acme Corp", //your business name
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    // "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
    "prefill": {
      "name": "Gaurav Kumar", //your customer's name
      "email": "gaurav.kumar@example.com",
      "contact": "9000090000"
    },
    "notes": {
      "address": "Razorpay Corporate Office"
    },
    "theme": {
      "color": "#3399cc"
    }
  };

  rzp1: any;

  pay() {
    this.options.amount = this.total * 100;
    // this.convertingCurrenyToPaisa()
    console.log(typeof this.rupeeInPaisa.toString(), this.rupeeInPaisa.toString())
    this.rzp1 = new Razorpay(this.options)
    this.rzp1.open()
  }

  increase() {

    if (this.Qty >= 1) {
      this.Qty++
      this.total += this.currentTotal
    }
    if (this.Qty > 5) {
      this.Qty = 5
      this.total = this.currentTotal
      this.total *= 5
    }

  }

  decrease() {
    if (this.Qty <= 5) {
      this.Qty--
      this.total -= this.currentTotal
    }
    if (this.Qty < 1) {
      this.Qty = 1
      this.total = this.currentTotal
    }

  }

  convertingCurrenyToPaisa() {
    this.rupeeInPaisa = this.total * 100
  }

}
