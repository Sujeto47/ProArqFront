import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos/productos.service';
import { ThisReceiver } from '@angular/compiler';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productoForm: FormGroup;
  productos: any;
  constructor(
    public fb: FormBuilder,
    public productosService: ProductosService
  ) { 

  }

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      nombre : ['',Validators.required],
      descrip : ['', Validators.required],
      cantidad : ['', Validators.required],
      valor : ['', Validators.required]
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
      this.productos.push(resp);
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

}
