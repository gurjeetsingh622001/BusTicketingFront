import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { RoutesComponent } from './user/routes/routes.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PaymentComponent } from './user/payment/payment.component';

const routes: Routes = [
  { path: '', redirectTo: 'user/dashboard', pathMatch: 'full' },
  // { path: '', redirectTo: 'payment', pathMatch: 'full' },
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'routes', component: RoutesComponent },
      { path: 'invoice', component: InvoiceComponent },
    ]
  },
  {path:'payment',component: PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
