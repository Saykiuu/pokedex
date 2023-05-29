import { Component,OnInit } from '@angular/core';
import { Pokemon } from './pokemon';
import { RequestService } from './http.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loding: boolean = true;
  pokemons: Array<Pokemon> = [];
  ngOnInit(): void {
    this.getAllPokemons()
  }

  offset: number = 0;
  limit: number = 9;

  constructor(
      private rq: RequestService
    ) {
      
  }

  async getAllPokemons(){
    try {
      this.loding = true
      let res = await lastValueFrom(this.rq.getRequest(`pokemon?limit=${this.limit}&offset=${this.offset}`));
      for(let resp of res.results){
        let req = await lastValueFrom(this.rq.getRequest(`pokemon/${resp.name}/`))
        let aux: string[] = [];
        req.types.forEach((e:any) => {
          aux.push(e.type.name)
        });
        let aux2 = resp.url.split('/')[6]
        this.pokemons.push({
          id: aux2,
          name: resp.name,
          type: aux,
        })
      }
      this.loding = false

    } catch (error) {
      this.loding = false

      console.log(error)
    }
  }

  carregarMais(){
    this.offset += this.limit
    this.limit = 9;
    this.getAllPokemons()
  }
}
