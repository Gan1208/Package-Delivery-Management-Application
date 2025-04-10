import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { io } from 'socket.io-client';
import { WeightPipe } from '../weight.pipe';
import { DatabaseService } from '../database.service';
import { Package } from '../models/package';

@Component({
  selector: 'app-translate-description',
  standalone: true,
  imports: [FormsModule, WeightPipe],
  templateUrl: './translate-description.component.html',
  styleUrls: ['./translate-description.component.css']
})
export class TranslateDescriptionComponent {
  showTranslation: boolean = false;
  translationList: { text: string, targetLanguage: string, translation: string }[] = [];
  packageList: Package[] = [];
  targetLanguage: string = "";
  socket: any;

  constructor(private db: DatabaseService) {
    this.socket = io();
    this.socket.on("serverTranslationEvent", (data: any) => {
      this.showTranslation = true;

      switch (data.targetLanguage) {
        case 'zh':
          data.targetLanguage = 'Chinese';
          break;
        case 'hi':
          data.targetLanguage = 'Hindi';
          break;
        case 'es':
          data.targetLanguage = 'Spanish';
          break;
        default:
          data.targetLanguage = 'Unknown Language';
      }

      this.translationList.push(data);
    });
  }

  ngOnInit() {
    this.db.getPacakge().subscribe((data: any) => {
      this.packageList = data;
    });
  }

  getTranslate(translateText: string) {
    this.socket.emit("translationEvent", this.targetLanguage, translateText);
  }
}
//Reference: https://stackoverflow.com/questions/44883501/play-sound-in-angular-4