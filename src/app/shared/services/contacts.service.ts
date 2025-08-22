import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class ContactsService {

    public readonly email = 'info@jellicious.co.il';
    public readonly tel = '055-9800466';
    public readonly whatsapp = '972559800466';

}
