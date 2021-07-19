import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideMenuComponent } from './modules/side-menu/side-menu.component';
import { MenuItemComponent } from './shared/components/menu-item/menu-item.component';
import { NewInventoryComponent } from './modules/new-inventory/new-inventory.component';
import { ListInventoryComponent } from './modules/list-inventory/list-inventory.component';
import { TransformInputDirective } from './shared/directives/transform-input.directive';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { HeaderImageComponent } from './shared/components/header-image/header-image.component';

import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {CheckboxModule} from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar';
import {InputMaskModule} from 'primeng/inputmask';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {BlockUIModule} from 'primeng/blockui';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    MenuItemComponent,
    NewInventoryComponent,
    ListInventoryComponent,
    TransformInputDirective,
    LoaderComponent,
    HeaderImageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CardModule,
    FormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    CheckboxModule,
    CalendarModule,
    InputMaskModule,
    ToastModule,
    TableModule,
    ConfirmDialogModule,
    BlockUIModule,
    ProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
