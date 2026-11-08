import { Component } from '@angular/core';
import { HeaderComponent, FooterComponent } from './layout';
import { LandingComponent } from './landing';
import { ContactComponent } from './contact';

@Component({
  imports: [HeaderComponent, LandingComponent, ContactComponent, FooterComponent],
  selector: 'app-root',
  template: `<a class="skip-link" href="#contenido">Saltar al contenido</a><ec-header /><main id="contenido"><ec-landing /><ec-contact /></main><ec-footer />`,
})
export class App {
}
