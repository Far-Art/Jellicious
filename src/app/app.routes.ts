import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {AdminComponent} from './pages/admin/admin.component';
import {AccessibilityStatementComponent} from './pages/accessibility/accessibility-statement.component';
import {ContactsComponent} from './pages/contacts/contacts.component';


export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'accessibility-statement', component: AccessibilityStatementComponent},
  {path: 'admin', component: AdminComponent},
];
