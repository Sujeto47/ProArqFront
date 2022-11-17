import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes/clientes.service'; 
import { ThisReceiver } from '@angular/compiler';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PaisesService } from '../services/paises/paises.service';
import { EstadosService } from '../services/estados/estados.service';

@Component({
  selector: 'app-registrar-clientes',
  styleUrls: ['./registrar-clientes.component.css'],
  templateUrl: './registrar-clientes.component.html'
})
export class RegistrarClientesComponent implements OnInit {

  clienteForm: FormGroup;
  countries: any;
  estados: any;
  clientes: any;

  constructor(
    public fb: FormBuilder,
    public estadosService: EstadosService,
    public paisesService: PaisesService,
    public clientesService: ClientesService
  ) { 

  }

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      nombre : ['', Validators.required],
		  apellido : ['', Validators.required],
      cedula : ['', Validators.required],
      edad : ['', Validators.required],
      country : ['', Validators.required],
      estado : ['', Validators.required],
    });;
    this.paisesService.getAllCountries().subscribe(resp => {
      this.countries = resp;
    },
    error =>{console.error(error)}
    );

    this.clientesService.getAllClientes().subscribe(resp=>{
      this.clientes = resp;
    },
    error=>{console.error(error)}
    )



    this.clienteForm.get('country').valueChanges.subscribe(value=>{
      this.estadosService.getAllEstadosByPais(value.id).subscribe(resp => {
        this.estados = resp;
    },
    error =>{console.error(error)}
  );
    })
  }

  Guardar():void{
    this.clientesService.saveCliente(this.clienteForm.value).subscribe(resp=>{
      this.clienteForm.reset();
      this.clientes.push(resp);
    },
    error=>{console.error(error)}
    )
  }

  Eliminar(cliente){
    this.clientesService.deleteCliente(cliente.id).subscribe(resp=>{
      console.log(resp);
      if(resp == false){
        this.clientes.pop(cliente)
      }
    })
  }
}
