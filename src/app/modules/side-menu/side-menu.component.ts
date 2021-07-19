import { Component } from '@angular/core';
import { MENU_LIST } from '../../shared/lists/menu-list';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {

  menuList = MENU_LIST;

}
