import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import { RegistrarClientesComponent } from './registrar-clientes/registrar-clientes.component'
import { RegistroClientesComponent } from './registro-clientes/registro-clientes.component';
import {HomeComponent} from './home/home.component'
import {RouterModule} from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { RegistroProductosComponent } from './registro-productos/registro-productos.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrarClientesComponent,
    RegistroClientesComponent,
    ProductosComponent,
    RegistroProductosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'clientes',component:RegistroClientesComponent},
      {path: 'rclientes',component:RegistrarClientesComponent},
      {path: '', component:HomeComponent},
      {path: 'rproductos',component:ProductosComponent},
      {path: 'productos',component:RegistroProductosComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
