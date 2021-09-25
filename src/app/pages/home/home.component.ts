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

  informacionUsuario:any;
  PeliculasEstreno:any;
  PeliculasPopulares:any;
  UrlEstreno:string="";


  pageEstreno:number=1;
  pagePopulares:number=1;

  //variable para cambiar clase de carrusel
  IsActive:boolean=true;

  constructor(private peliculas_service:PeliculasService,private usuarios_serices:UsuariosService) {

   }

  ngOnInit(): void {


    
    this.peliculas_service.peliculasEstreno(this.pageEstreno).subscribe(res=>{
      this.UrlEstreno=res.imageBaseUrl;
      this.PeliculasEstreno=res.data
      console.log(this.PeliculasEstreno);
    });
  // this.PeliculasPopulares=this.peliculas_service.peliculasPopulares(this.pagePopulares).subscribe(res=>console.log(res));
    this.usuarios_serices.infomacionUsuario().subscribe(res=>{
      this.informacionUsuario="Hola "+res.data.firstName+" "+res.data.lastName
      console.log(this.informacionUsuario);
    });
    
    //this.informacionUsuario=info.firstName;
  }

}
