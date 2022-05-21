import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Player } from '../interfaces/player.interface';




@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  playerList: Player[] = [];

  constructor() { 
    this.getPlayerListFromLocalStorage();
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getPlayerListFromLocalStorage();
  }

  private getPlayerListFromLocalStorage(): void {
    if (localStorage.getItem('playerList')) {
      this.playerList = JSON.parse(localStorage.getItem('playerList')!); // JSON.parse convierte un string a un objeto
    }
  }

  private createID(): number {
    const id = Date.now();
    return id;
  }

  savePlayer(player: Player): Observable<Player> {
    player.id = this.createID();
    player.createdAt = new Date();
    player.updatedAt = player.createdAt;
    this.playerList.push(player);
    localStorage.setItem('playerList', JSON.stringify(this.playerList));
    return(of(player));
  }

  getPlayerList(): Player[] {
    return this.playerList;
  }
  
  getPlayerById(id: number): Observable<Player> {
    return of(this.playerList.find(player => player.id === id)!);
  }

  updatePlayer(player: Player): void {
    this.playerList.map((playerParam, index) => {
      if (player.id === playerParam.id) {
        player.updatedAt = new Date();
        this.playerList[index] = player;
      }
      localStorage.setItem('playerList', JSON.stringify(this.playerList));
      
    });
  }

  deletePlayer(id: number): void {
    this.playerList = this.playerList.filter(player => player.id !== id);
    localStorage.setItem('playerList', JSON.stringify(this.playerList));
  }

}
