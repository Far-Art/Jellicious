import {Component, inject} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatTimepickerModule} from '@angular/material/timepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {Platform} from '@angular/cdk/platform';
import {CartProductData} from '../cart-dialog/cart-dialog.component';
import {IOrder} from '../../model/Order';


@Component({
    selector: 'jls-purchase-dialog',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatTimepickerModule,
        MatDatepickerModule,
        FormsModule,
        MatDialogModule,
        MatButton,
        ReactiveFormsModule
    ],
    providers: [provideNativeDateAdapter()],
    templateUrl: './purchase-dialog.component.html',
    styleUrl: './purchase-dialog.component.scss'
})
export class PurchaseDialogComponent {
    platform = inject(Platform);
    protected form: FormGroup<{
        name: FormControl<string | null>,
        phone: FormControl<string | null>,
        date: FormControl<Date | null>,
        time: FormControl<Date | null>
    }>;
    protected minDate: Date;
    protected maxDate: Date;
    protected minHour = new Date(0, 0, 0, 8, 0, 0, 0);
    protected maxHour = new Date(0, 0, 0, 16, 0, 0, 0);
    private phoneRegex = /^(?:\+972|0)5\d(?:[-\s]?\d){7}$/;
    private fb = inject(FormBuilder);
    private dialogData: CartProductData[] = inject(MAT_DIALOG_DATA);

    constructor() {
        const now = new Date();
        if (now.getMinutes() >= 30) {
            now.setHours(now.getHours() + 2, 0, 0, 0);
        } else {
            now.setHours(now.getHours() + 1, 0, 0, 0);
        }

        this.minDate = now;
        this.maxDate = new Date(now.getFullYear(), now.getMonth() + 5, now.getDate() + 1);

        this.form = this.fb.group({
            name: this.fb.control<string | null>(null, [Validators.required, Validators.minLength(3), Validators.minLength(3), Validators.maxLength(20)]),
            phone: this.fb.control<string | null>(null, [Validators.required, Validators.pattern(this.phoneRegex)]),
            date: this.fb.control(now, [Validators.required]),
            time: this.fb.control(now, [Validators.required])
        });

        this.form.controls.date.valueChanges.subscribe(value => {
            const time = this.form.controls.time.value;
            if (value && time) {
                const date = new Date(value.getTime());
                date.setHours(time.getHours(), time.getMinutes());
                this.form.controls.time.setValue(date, {emitEvent: false});
            }
        })
    }

    onPhoneKeydown(event: KeyboardEvent) {
        const {
            key,
            target
        } = event;

        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
            return;
        }

        const controlKeys = [
            'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End'
        ];

        if (controlKeys.includes(key)) {
            return;
        }

        if (!/^[\d+\-]$/.test(key)) {
            event.preventDefault();
        }

        const value = (target as HTMLInputElement).value ?? '';
        if (`${value}${event.key}`.includes('--') || value.replaceAll('-', '').length >= 10) {
            event.preventDefault();
        }

    }

    submit() {
        this.preparePayload();
    }

    updateSelectionDateRange(date: Date) {

    }

    preparePayload() {
        const value = this.form.value;
        const products = this.dialogData.map(p => p.product);
        const totalPrice = this.dialogData.map(p => (p.product.newPrice ?? p.product.price) * p.amount).reduce((acc, value) => acc + value, 0);
        const d = new Date(value.date!.getFullYear(), value.date!.getMonth(), value.date!.getDate(), value.time!.getHours(), value.time!.getMinutes(), 0, 0);

        const order: IOrder = {
            name: value.name!,
            phoneNumber: value.phone!.replaceAll('-', ''),
            products: products,
            totalPrice: totalPrice,
            dateOfPickup: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}0`,
            id: Math.random().toString(36).replace('.', '')
        }

        console.log(order)

    }

    protected dateFilter = (date: Date | null): boolean => {
        const day = date?.getDay();
        return day !== 5 && day !== 6;
    }

}
