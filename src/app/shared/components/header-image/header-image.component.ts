import { Component, Input, OnInit } from '@angular/core';

interface BackgroundStyles {
  'background-color': string;
  'background': string;
  'height': string;
  'background-size': string;
  'background-position': string;
}

@Component({
  selector: 'header-image',
  templateUrl: './header-image.component.html'
})
export class HeaderImageComponent implements OnInit{

  @Input() imagePath?: string;
  imageStyle: BackgroundStyles;

  ngOnInit(): void {
    this.createStyleObject();
  }

  createStyleObject(): void {
    this.imageStyle = {
      'background-color': 'green', // fallback
      'background': 'linear-gradient(135deg, #00c89b59 0%, #00958b82 100%), url(' + this.imagePath + ')',
      'height': '113px',
      'background-size': 'cover',
      'background-position': 'center'
    }
  }

}
