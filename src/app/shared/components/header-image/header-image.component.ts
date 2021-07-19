import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'header-image',
  templateUrl: './header-image.component.html'
})
export class HeaderImageComponent implements OnInit{

  constructor() { }

  @Input() imagePath?: string;
  imageStyle: Object;

  ngOnInit(): void {
    this.createStyleObject();
  }

  createStyleObject() {
    this.imageStyle = {
      'background-color': 'green', // fallback
      'background': 'linear-gradient(135deg, #00c89b59 0%, #00958b82 100%), url(' + this.imagePath + ')',
      'height': '113px',
      'background-size': 'cover',
      'background-position': 'center'
    }
  }

}
