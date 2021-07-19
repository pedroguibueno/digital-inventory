import { MenuItem } from "../models/menu-item.model";

export const MENU_LIST: MenuItem[] = [
    {
        icon: 'pi-file',
        text: 'Novo item',
        path: '/new-inventory'
    },
    {
        icon: 'pi-list',
        text: 'Listagem',
        path: '/list-inventory'
    }
]