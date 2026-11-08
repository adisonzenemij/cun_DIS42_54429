import { Component, inject } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { content } from './content';
import { LeadService } from './lead.service';
@Component({ selector: 'ec-header', imports: [NgbCollapseModule], template: `
<header class="site-header"><nav class="navbar navbar-expand-lg container" aria-label="Navegación principal">
  <a class="navbar-brand brand" href="#inicio">@if (c.logoUrl) {<img [src]="c.logoUrl" alt="" width="32" height="32">} @else {<span class="brand-mark" aria-hidden="true">&lt;/&gt;</span>} {{ c.brand }}</a>
  <button class="navbar-toggler" type="button" (click)="collapsed = !collapsed" [attr.aria-expanded]="!collapsed" aria-controls="menu" aria-label="Abrir o cerrar navegación"><span class="navbar-toggler-icon"></span></button>
  <div id="menu" class="navbar-collapse" [ngbCollapse]="collapsed"><ul class="navbar-nav ms-auto align-items-lg-center gap-lg-3">@for (item of c.nav; track item.href) {<li class="nav-item"><a class="nav-link" [href]="item.href" (click)="collapsed = true">{{item.label}}</a></li>}<li class="nav-item"><a class="btn btn-primary ms-lg-3" href="#contacto" (click)="leads.interest.set('demostracion'); collapsed = true">Solicitar demostración <span aria-hidden="true">↗</span></a></li></ul></div>
</nav></header>` })
export class HeaderComponent { readonly c = content; readonly leads = inject(LeadService); collapsed = true; }
@Component({ selector: 'ec-footer', template: `
<footer class="site-footer"><div class="container"><div class="d-flex flex-wrap justify-content-between gap-4"><a class="brand" href="#inicio"><span class="brand-mark" aria-hidden="true">&lt;/&gt;</span> {{c.brand}}</a><nav class="d-flex flex-wrap gap-4" aria-label="Navegación del pie">@for (item of c.nav; track item.href) {<a [href]="item.href">{{item.label}}</a>}</nav></div>
<div class="d-flex flex-wrap justify-content-between gap-3 footer-bottom"><p class="mb-0">Una propuesta en construcción. Un proceso con dirección.</p><p class="mb-0">Plan de Negocio Aplicado · CUN</p></div>
@if (c.contact.email) {<a [href]="'mailto:' + c.contact.email">{{c.contact.email}}</a>} @if(c.contact.phone) {<a class="ms-3" [href]="'tel:' + c.contact.phone">{{c.contact.phone}}</a>} @if(c.contact.linkedin) {<a class="ms-3" [href]="c.contact.linkedin">LinkedIn</a>}
</div></footer>` })
export class FooterComponent { readonly c = content; }
