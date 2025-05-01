import {Component} from '@angular/core';
import {MatDrawer, MatDrawerContainer} from '@angular/material/sidenav';


@Component({
  selector: 'jls-cart-dialog',
    imports: [
        MatDrawerContainer,
        MatDrawer
    ],
  templateUrl: './cart-dialog.component.html',
  styleUrl: './cart-dialog.component.scss'
})
export class CartDialogComponent {

}
