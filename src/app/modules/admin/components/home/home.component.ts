import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/interfaces/player.interface';
import { PlayerService } from '../../../../services/player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  playerList: Player[] = [];
  constructor( private playerService: PlayerService,
                private router: Router) { }

  ngOnInit(): void {
    this.playerList = this.playerService.getPlayerList();
  }

  ver(id: number): void {
    this.router.navigateByUrl("/admin/edit/" + id);
  }

}
