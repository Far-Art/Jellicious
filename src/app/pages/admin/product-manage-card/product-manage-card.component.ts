import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {Product} from '../../../shared/model/Product';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {APP_CATEGORIES} from '../../../app.constants';
import {MatListModule} from '@angular/material/list';
import {ProductsService} from '../../../shared/services/products.service';


@Component({
    selector: 'jls-product-manage-card',
    imports: [
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatButton,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatListModule
    ],
    templateUrl: './product-manage-card.component.html',
    styleUrl: './product-manage-card.component.scss'
})
export class ProductManageCardComponent {

    form: FormGroup<{
        id: FormControl<number>,
        name: FormControl<string>,
        subtitle: FormControl<string>,
        description: FormControl<string>,
        category: FormControl<string>,
        price: FormControl<number | undefined>,
        newPrice: FormControl<number | undefined>,
        weight: FormControl<number | undefined>,
        imageUrl: FormControl<string>
    }>;

    protected categories = Object.entries(APP_CATEGORIES);

    constructor(@Inject(MAT_DIALOG_DATA) product: Product | undefined, service: ProductsService) {
        this.form = new FormGroup({
            id: new FormControl(product?.id ?? service.getProductNextId(), Validators.required),
            name: new FormControl(product?.name ?? '', Validators.required),
            subtitle: new FormControl(product?.subtitle ?? '', Validators.required),
            description: new FormControl(product?.description ?? '', Validators.required),
            category: new FormControl(product?.category ?? '', Validators.required),
            price: new FormControl(product?.price, Validators.required),
            newPrice: new FormControl(product?.newPrice),
            weight: new FormControl(product?.weight, Validators.required),
            imageUrl: new FormControl(product?.imageUrl, Validators.required)
        }) as FormGroup;
    }

}
