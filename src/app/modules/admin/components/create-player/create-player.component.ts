import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Player } from 'src/app/interfaces/player.interface';
import { PlayerService } from '../../../../services/player.service';

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css']
})
export class CreatePlayerComponent implements OnInit {

  jugador : Player = {
    id: 0,
    name: '',
    number: 1,
    position: '',
    team: '',
    description: '',
    createdAt: new Date(),
    updatedAt: new Date()
  }
  
  miFormulario: FormGroup = this.fb.group({
    nombre : ['' ,[Validators.required, Validators.minLength(3)]],
    equipo : ['' ,[Validators.required, Validators.minLength(4)]],
    numero : ['' ,[Validators.required, Validators.min(1)]],
    posicion : ['' ,[Validators.required, Validators.minLength(2)]],
    descripcion : ['' ,[Validators.required, Validators.minLength(5)]],
  });

  positionList : string[] = ['Portero', 'Defensa central','Lateral izquierdo', 'Lateral derecho', 
  'Pivote', 'Mediocentro', 'Mediocentro ofensivo', 'Extremo izquierdo', 'Extremo derecho', 'Delantero centro']; 

  constructor( private playerService: PlayerService, 
                private fb: FormBuilder, 
                private router: Router,
                private activatedRoute: ActivatedRoute ){ 


                }

  ngOnInit(): void {

    if(!this.router.url.includes('edit')){
      return;
    }

    const id = Number(this.activatedRoute.snapshot.params['id']);
    const judadorBuscar = this.playerService.getPlayerById(id);
    judadorBuscar.subscribe( jugador => {
      this.jugador = jugador;
    });

  }

  guardar(){
    if (this.miFormulario.valid) {
      this.jugador.name = this.miFormulario.value.nombre;
      this.jugador.team = this.miFormulario.value.equipo;
      this.jugador.number = this.miFormulario.value.numero;
      this.jugador.position = this.miFormulario.value.posicion;
      this.jugador.description = this.miFormulario.value.descripcion;

      if( this.jugador.id !== 0 ) {
        //Actualizar
        this.playerService.updatePlayer(this.jugador);
        this.router.navigateByUrl("/admin/home");
      }else {
        //Agregar
        this.playerService.savePlayer(this.jugador)
          .subscribe( _player => {
            this.router.navigate(['/admin/home', _player.id])
          });
      }
    }
  }

  eliminar(){
    this.playerService.deletePlayer(this.jugador.id);
    this.router.navigateByUrl("/admin/home");
  }

  campoNoValido( campo: string ) {
    return this.miFormulario.controls[campo].errors && 
           this.miFormulario.controls[campo].touched;
  }
}
