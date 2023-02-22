import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoSearchComponent } from './info-search/info-search.component';
import { InfoOverviewComponent } from './info-overview/info-overview.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InfoOverviewTransactionSlideComponent } from './info-overview/info-overview-transaction-slide/info-overview-transaction-slide.component';
import { AddressCardComponent } from './info-overview/info-overview-transaction-slide/address-card/address-card.component';


const routes: Routes = [
  {
    path: '',
    component: InfoSearchComponent
  },
  {
    path: ':address',
    component: InfoOverviewComponent
  }
]

@NgModule({
  declarations: [
    InfoSearchComponent,
    InfoOverviewComponent,
    InfoOverviewTransactionSlideComponent,
    AddressCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InfoModule { }
