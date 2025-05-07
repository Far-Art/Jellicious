import {Component} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';


@Component({
    selector: 'jls-cart-dialog',
    imports: [
        MatDialogContent,
        MatDialogTitle,
        MatDialogActions,
        MatButton,
        MatDialogClose
    ],
    templateUrl: './cart-dialog.component.html',
    styleUrl: './cart-dialog.component.scss'
})
export class CartDialogComponent {

}
