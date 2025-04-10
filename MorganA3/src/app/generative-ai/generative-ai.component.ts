import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { io } from 'socket.io-client';
import { WeightPipe } from '../weight.pipe';
import { DatabaseService } from '../database.service';
import { Package } from '../models/package';

@Component({
  selector: 'app-generative-ai',
  standalone: true,
  imports: [FormsModule,WeightPipe],
  templateUrl: './generative-ai.component.html',
  styleUrl: './generative-ai.component.css'
})
export class GenerativeAIComponent {

  showResponse: boolean = false;

  germiniResponse: string= "";

  packageList: Package[]=[];

  socket: any;

  ngOnInit(){
    this.db.getPacakge().subscribe((data:any)=>{
      this.packageList=data;
    });
  }

  constructor(private db:DatabaseService) {
    this.socket = io();
    this.socket.on("serverGenerativeAIEvent",(data:any) => {
      this.showResponse = true
      this.germiniResponse = data;
    });
   };

   getGerminiResponse(packageDestination: string){
    this.socket.emit("generativeAIEvent",packageDestination);
  };

}
