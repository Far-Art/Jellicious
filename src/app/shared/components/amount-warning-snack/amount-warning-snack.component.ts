import {Component, inject} from '@angular/core';
import {APP_CONSTANTS} from '../../../app.constants';
import {ContactsService} from '../../services/contacts.service';


@Component({
    selector: 'jls-amount-warning-snack',
    imports: [],
    templateUrl: './amount-warning-snack.component.html',
    styleUrl: './amount-warning-snack.component.scss'
})
export class AmountWarningSnackComponent {

    contacts: ContactsService = inject(ContactsService);

    title = `לא ניתן להוסיף יותר מ-${APP_CONSTANTS.maxProductsPerRequest} פריטים להזמנה 😢`;

}
