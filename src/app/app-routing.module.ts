import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListInventoryComponent } from './inventory/list-inventory/list-inventory.component';
import { NewInventoryComponent } from './inventory/new-inventory/new-inventory.component';

const routes: Routes = [
  {path: 'new-inventory', component: NewInventoryComponent},
  {path: 'list-inventory', component: ListInventoryComponent},
  {path: '', redirectTo: '/list-inventory', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
