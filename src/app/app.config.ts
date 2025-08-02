import {ApplicationConfig, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {HE_DATE_FORMATS} from '../main';


export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideHttpClient(),
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        {
            provide: LOCALE_ID,
            useValue: 'he-IL'
        },
        {
            provide: MAT_DATE_LOCALE,
            useValue: 'he-IL'
        },
        {
            provide: MAT_DATE_FORMATS,
            useValue: HE_DATE_FORMATS
        },
    ]
};

