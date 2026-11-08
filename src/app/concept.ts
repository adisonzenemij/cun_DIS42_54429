import { Component, signal } from '@angular/core';
@Component({ selector: 'ec-concept', template: `
<div class="concept-shell"><div class="concept-top"><span><span class="tiny-dot"></span> workspace / proyecto-ejemplo</span><span class="concept-label">Vista conceptual</span></div>
<div class="concept-body"><div class="d-flex justify-content-between align-items-center mb-4"><div><p class="micro mb-1">PROYECTO DE EJEMPLO</p><h2 class="h5 mb-0">Portal de clientes</h2></div><span class="example-avatar" aria-hidden="true">EC</span></div>
<div class="concept-tabs" role="group" aria-label="Explorar vista conceptual">@for(tab of tabs; track tab) {<button type="button" [class.active]="selected() === tab" [attr.aria-pressed]="selected() === tab" (click)="selected.set(tab)">{{tab}}</button>}</div>
<div class="concept-panel" aria-live="polite">
@switch(selected()) {
@case('Resumen') {<p class="micro">DEL REQUISITO A LA ENTREGA</p><div class="pipeline"><span class="done">✓<small>Análisis</small></span><i></i><span class="done">✓<small>Desarrollo</small></span><i></i><span class="current">03<small>Pruebas</small></span><i></i><span>04<small>Entrega</small></span></div><div class="example-task"><span class="task-icon">↳</span><div><strong>Validar el acceso al portal</strong><small>Requisito REQ-03 · Pruebas de aceptación</small></div><span class="task-tag">En revisión</span></div><div class="example-task"><span class="task-icon">≡</span><div><strong>Documentar la primera entrega</strong><small>Documentación · Versión de ejemplo 0.1</small></div></div>}
@case('Ambientes') {<p class="micro">SEPARACIÓN PROPUESTA</p>@for(env of environments; track env.name) {<div class="example-task"><span class="task-icon">◇</span><div><strong>{{env.name}}</strong><small>{{env.text}}</small></div><span class="task-tag">Ejemplo</span></div>}}
@case('Actividad') {<p class="micro">TRAZABILIDAD PROPUESTA</p><div class="example-task"><span class="task-icon">01</span><div><strong>Requisito documentado</strong><small>Alcance del portal definido.</small></div></div><div class="example-task"><span class="task-icon">02</span><div><strong>Tarea vinculada al requisito</strong><small>Validación pendiente de revisión.</small></div></div><div class="example-task"><span class="task-icon">03</span><div><strong>Entrega planificada</strong><small>Sin despliegues ejecutados.</small></div></div>}}
</div><p class="concept-note mb-0"><span aria-hidden="true">ⓘ</span> Datos de ejemplo. Sin conexiones ni despliegues reales.</p></div></div>` })
export class ConceptComponent {
  readonly tabs = ['Resumen', 'Ambientes', 'Actividad']; readonly selected = signal('Resumen');
  readonly environments = [{ name: 'Desarrollo', text: 'Construir e iterar los cambios.' }, { name: 'Pruebas', text: 'Comprobar antes de entregar.' }, { name: 'Producción', text: 'Ambiente del cliente, por separado.' }];
}
