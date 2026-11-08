import { Component, inject } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { content } from './content';
import { LeadService } from './lead.service';
import { ConceptComponent } from './concept';
@Component({ selector: 'ec-landing', imports: [ConceptComponent, NgbAccordionModule], templateUrl: './landing.html' })
export class LandingComponent { readonly c = content; readonly leads = inject(LeadService); }
