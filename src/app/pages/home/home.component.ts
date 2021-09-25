import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginRequest } from 'src/app/interfaces/LoginRequest.interfaces';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  informacionUsuario:Object={};
  PeliculasEstreno:Object={};
  PeliculasPopulares:Object={};

  arrNumber:number[]=[];



 

  constructor(private peliculas_service:PeliculasService,private usuarios_serices:UsuariosService) {

    for(let i=0;i<10000;i++){
      this.arrNumber.push(i);
    }
   }

  ngOnInit(): void {

    for(let i=0;i<10000;i++){
      this.arrNumber.push(i);
    }
    
    console.log("estreno")
    this.peliculas_service.peliculasEstreno().subscribe(res=>console.log(res));
    console.log("popu")
    this.peliculas_service.peliculasPopulares().subscribe(res=>console.log(res));
    console.log("user")
    this.usuarios_serices.infomacionUsuario().subscribe(res=>console.log(res));
  }





}
