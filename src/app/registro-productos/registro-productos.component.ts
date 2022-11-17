import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos/productos.service';
import { ThisReceiver } from '@angular/compiler';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registro-productos',
  templateUrl: './registro-productos.component.html',
  styleUrls: ['./registro-productos.component.css']
})
export class RegistroProductosComponent implements OnInit {

  productoForm: any;
  productos: any;
  isShown: boolean = false;
  constructor(
    public fb: FormBuilder,
    public productosService: ProductosService
  ) {

   }

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      descrip: ['', Validators.required],         
      cantidad: ['', Validators.required],
      valor: ['', Validators.required],
    });;
    this.productosService.getAllProductos().subscribe(resp=>{
      this.productos = resp;
    },
    error=>{console.error(error)}
    )
  }
  Guardar():void{
    this.productosService.saveProducto(this.productoForm.value).subscribe(resp=>{
      this.productoForm.reset();
      this.productos = this.productos.filter(producto => resp.id != producto.id);
      this.productos.push(resp);
      this.isShown = ! this.isShown;
    },
    error=>{console.error(error)}
    )
  }
  Eliminar(producto){
    this.productosService.deleteProducto(producto.id).subscribe(resp=>{
      console.log(resp);
      if(resp == false){
        this.productos.pop(producto)
      }
    })
  }
  Editar(producto){
    this.isShown = ! this.isShown;
    this.productoForm.setValue({
      id: producto.id,
      nombre : producto.nombre,
		  descrip : producto.descrip,
      cantidad : producto.cantidad,
      valor : producto.valor
    })
  }

}
