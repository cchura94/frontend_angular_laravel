import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Administración',
                items: [
                    { label: 'Perfil', icon: 'pi pi-fw pi-user', routerLink: ['/admin/perfil'] }
                ]
            },
            {
                label: 'Gestión',
                items: [
                    { label: 'Usuarios', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/usuario'] },
                    { label: 'Categoria', icon: 'pi pi-fw pi-check-square', routerLink: ['/admin/categoria'] },
                    { label: 'Producto', icon: 'pi pi-fw pi-bookmark', routerLink: ['/admin/producto'] },

                ]
            },
            {
                label: 'Pedidos',
                items: [
                    { label: 'Nuevo Pedido', icon: 'pi pi-fw pi-eye', routerLink: ['/admin/pedido/nuevo'], badge: 'NEW' },
                    { label: 'Lista Pedido', icon: 'pi pi-fw pi-globe', routerLink: ['/admin/pedido'] },
                    { label: 'Lista Clientes', icon: 'pi pi-fw pi-eye', routerLink: ['/admin/cliente'], badge: 'NEW' },
                ]
            },
        ];
    }
}
