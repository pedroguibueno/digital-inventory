import { Component, OnInit } from '@angular/core';
import { MENU_LIST } from '../shared/menu-list';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  menuList = MENU_LIST;

  constructor() { }

  ngOnInit(): void {
  }

}