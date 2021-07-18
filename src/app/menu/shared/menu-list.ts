import { MenuItem } from "./menu-item.model";

export const MENU_LIST: MenuItem[] = [
    {
        icon: 'pi-list',
        text: 'Listagem',
        path: '/list-inventory'
    },
    {
        icon: 'pi-file',
        text: 'Novo item',
        path: '/new-inventory'
    }
]