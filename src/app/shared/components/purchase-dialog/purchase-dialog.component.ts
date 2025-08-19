import {Component, inject, ViewChild} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatTimepicker, MatTimepickerModule} from '@angular/material/timepicker';
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
    @ViewChild('timepicker') timepicker!: MatTimepicker<any>;
    platform = inject(Platform);
    protected form: FormGroup<{
        // name: FormControl<string | null>,
        // phone: FormControl<string | null>,
        date: FormControl<Date | null>,
        time: FormControl<Date | null>
    }>;
    protected minDate: Date;
    protected maxDate: Date;
    protected minHour = new Date(0, 0, 0, 10, 0, 0, 0);
    protected maxHour = new Date(0, 0, 0, 16, 0, 0, 0);
    private phoneRegex = /^(?:\+972|0)5\d(?:[-\s]?\d){7}$/;
    private fb = inject(FormBuilder);
    private dialogData: CartProductData[] = inject(MAT_DIALOG_DATA);

    constructor() {
        const now = this.initDate();

        this.minDate = now;
        this.maxDate = new Date(now.getFullYear(), now.getMonth() + 5, now.getDate() + 1);

        this.form = this.fb.group({
            // name: this.fb.control<string | null>(null, [Validators.required, Validators.minLength(3), Validators.minLength(3), Validators.maxLength(20)]),
            // phone: this.fb.control<string | null>(null, [Validators.required, Validators.pattern(this.phoneRegex)]),
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
        });
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

    openTimepicker(event: KeyboardEvent): void {
        if (event.key === 'Enter' || (+event.key >= 0 && +event.key <= 9)) {
            if (!this.timepicker.isOpen()) {
                event.stopPropagation();
                this.timepicker.open();
            }
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
            // name: value.name!,
            // phoneNumber: value.phone!.replaceAll('-', ''),
            products: products,
            totalPrice: totalPrice,
            dateOfPickup: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}0`,
            id: Math.random().toString(36).replace('.', '')
        }

    }

    protected dateFilter = (date: Date | null): boolean => {
        const day = date?.getDay();
        return day !== 5 && day !== 6;
    }

    private initDate(): Date {
        const now = new Date();

        this.plusDays(now, now.getHours() >= 17 || !this.dateFilter(now) ? 2 : 1);

        while (now.getHours() > this.maxHour.getHours() || !this.dateFilter(now)) {
            this.plusDays(now, 1);
        }

        return now;
    }

    private plusDays(date: Date, days: number): Date {
        date.setDate(date.getDate() + days);
        date.setHours(this.minHour.getHours(), 0, 0, 0);
        return date;
    }

}
