import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { UpperCasePipe } from '@angular/common';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-text-to-speech',
  standalone: true,
  imports: [FormsModule, UpperCasePipe],
  templateUrl: './text-to-speech.component.html',
  styleUrls: ['./text-to-speech.component.css']
})
export class TextToSpeechComponent {
  showAudio: boolean = false;
  driverList: any[] = [];
  audioSrc: string = "";
  socket: any;

  constructor(private db: DatabaseService) {
    this.socket = io();
    this.socket.on("serverSpeechEvent", (data: any) => {
      this.showAudio = true;

      const byteArray = new Uint8Array(data.data);
      const blob = new Blob([byteArray], { type: data.contentType });

      this.audioSrc = URL.createObjectURL(blob);
      const audio = new Audio(this.audioSrc);
      audio.play();
    });
  }

  ngOnInit() {
    this.db.getDriver().subscribe((data: any) => {
      this.driverList = data;
    });
  }

  fromTextToSpeech(driverLicence: string) {
    this.socket.emit("speechEvent", driverLicence);
  }
}
//Reference: https://stackoverflow.com/questions/44883501/play-sound-in-angular-4