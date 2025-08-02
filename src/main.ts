import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import {registerLocaleData} from '@angular/common';
import localeHe from '@angular/common/locales/he';

bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));

registerLocaleData(localeHe, 'he-IL')

export const HE_DATE_FORMATS = {
    parse: {
        dateInput: 'dd/MM/yyyy',
    },
    display: {
        dateInput:    'dd/MM/yyyy',
        monthYearLabel:    'MMMM yyyy',
        dateA11yLabel:     'LL',
        monthYearA11yLabel:'MMMM yyyy',
    },
};

