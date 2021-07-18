import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../shared/menu-item.model';

@Component({
  selector: 'menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {

  @Input() menuItem?: MenuItem;

  constructor() { }
}
