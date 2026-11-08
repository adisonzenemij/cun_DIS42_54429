import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { LeadService } from './lead.service';
@Component({ selector: 'ec-contact', imports: [ReactiveFormsModule], templateUrl: './contact.html' })
export class ContactComponent {
  readonly leads = inject(LeadService);
  private readonly fb = inject(FormBuilder);
  readonly loading = signal(false);
  readonly message = signal('');
  readonly success = signal(false);
  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    profile: this.fb.nonNullable.control<'independiente' | 'empresa'>('independiente', Validators.required),
    need: ['', [Validators.required, Validators.pattern(/\S/), Validators.minLength(20), Validators.maxLength(3000)]],
    technologies: ['', Validators.maxLength(300)],
    interest: this.fb.nonNullable.control<'demostracion' | 'piloto'>('demostracion', Validators.required)
  });
  constructor() { effect(() => this.form.controls.interest.setValue(this.leads.interest())); }
  invalid(field: 'name' | 'email' | 'need' | 'technologies') {
    const control = this.form.controls[field]; return control.touched && control.invalid;
  }
  submit() {
    if (this.loading()) return;
    this.message.set(''); this.success.set(false);
    this.form.markAllAsTouched();
    if (this.form.invalid) { this.message.set('Revisa los campos indicados antes de continuar.'); return; }
    if (!this.leads.endpoint) { this.message.set('El envío todavía no está disponible. Tus datos no se han enviado ni guardado.'); return; }
    const values = this.form.getRawValue();
    this.loading.set(true);
    this.leads.submit({ ...values, name: values.name.trim(), email: values.email.trim(), need: values.need.trim(), technologies: values.technologies.trim() })
      .pipe(finalize(() => this.loading.set(false))).subscribe({
        next: result => { this.success.set(true); this.message.set('Solicitud recibida. Referencia: ' + result.id); this.form.reset({ profile: 'independiente', interest: values.interest }); },
        error: () => this.message.set('No pudimos confirmar la recepción. Tus datos permanecen en el formulario. Intenta de nuevo más tarde; si la conexión se interrumpió, la solicitud podría haber llegado.')
      });
  }
}
