import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { App } from './app';
import { ContactComponent } from './contact';
import { LeadService } from './lead.service';
import { publicConfig } from './public-config';
import { NgbConfig } from '@ng-bootstrap/ng-bootstrap';

describe('Landing Engineering Code', () => {
  beforeEach(async () => {
    publicConfig.leadEndpoint = '';
    await TestBed.configureTestingModule({ imports: [App], providers: [provideHttpClient(), provideHttpClientTesting()] }).compileComponents();
    TestBed.inject(NgbConfig).animation = false;
  });
  afterEach(() => { TestBed.inject(HttpTestingController).verify(); publicConfig.leadEndpoint = ''; });
  async function setup() {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const contact = fixture.debugElement.query(By.directive(ContactComponent)).componentInstance as ContactComponent;
    return { fixture, element, contact };
  }
  function valid(contact: ContactComponent) {
    contact.form.patchValue({ name: 'Persona de prueba', email: 'test@example.com', need: 'Organizar las entregas de un proyecto de software.' });
  }
  it('renderiza la propuesta y todas las anclas tienen destino', async () => {
    const { element } = await setup();
    expect(element.querySelector('h1')?.textContent).toContain('desde la idea hasta el despliegue');
    for (const anchor of element.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) {
      expect(element.querySelector(anchor.getAttribute('href')!)).toBeTruthy();
    }
  });
  it('abre y cierra el menú móvil al elegir una sección', async () => {
    const { fixture, element } = await setup();
    const toggle = element.querySelector<HTMLButtonElement>('.navbar-toggler')!;
    toggle.click(); await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    element.querySelector<HTMLAnchorElement>('.nav-link')!.click(); await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });
  it('abre las preguntas frecuentes y cambia la vista conceptual', async () => {
    const { fixture, element } = await setup();
    const question = element.querySelector<HTMLButtonElement>('.accordion-button')!;
    question.click(); await fixture.whenStable();
    expect(question.getAttribute('aria-expanded')).toBe('true');
    expect(element.querySelector('.accordion-body')?.textContent).toContain('Todavía no');
    element.querySelectorAll<HTMLButtonElement>('.concept-tabs button')[1].click(); await fixture.whenStable();
    expect(element.querySelector('.concept-panel')?.textContent).toContain('Producción');
  });
  it('selecciona el interés desde los CTA y permite cambiarlo', async () => {
    const { fixture, element, contact } = await setup();
    element.querySelector<HTMLAnchorElement>('.price-panel a')!.click(); await fixture.whenStable();
    expect(contact.form.controls.interest.value).toBe('piloto');
    const select = element.querySelector<HTMLSelectElement>('#interest')!;
    select.value = 'demostracion'; select.dispatchEvent(new Event('change')); await fixture.whenStable();
    expect(contact.form.controls.interest.value).toBe('demostracion');
    element.querySelector<HTMLAnchorElement>('.price-panel a')!.click(); await fixture.whenStable();
    expect(contact.form.controls.interest.value).toBe('piloto');
    element.querySelector<HTMLAnchorElement>('.hero .btn-primary')!.click(); await fixture.whenStable();
    expect(contact.form.controls.interest.value).toBe('demostracion');
  });
  it('rechaza campos vacíos, espacios y correo incorrecto', async () => {
    const { contact } = await setup();
    contact.submit(); expect(contact.form.invalid).toBe(true);
    expect(contact.invalid('name')).toBe(true);
    contact.form.patchValue({ name: '   ', email: 'incorrecto', need: '                    ' });
    expect(contact.form.invalid).toBe(true);
  });
  it('sin backend no envía ni simula éxito', async () => {
    const { contact } = await setup(); valid(contact); contact.submit();
    expect(contact.message()).toContain('no se han enviado ni guardado');
    expect(contact.success()).toBe(false);
    TestBed.inject(HttpTestingController).expectNone(() => true);
  });
  it('muestra carga, evita duplicados y confirma una respuesta verificable', async () => {
    publicConfig.leadEndpoint = '/api/leads';
    const { contact } = await setup(); valid(contact); contact.submit(); contact.submit();
    expect(contact.loading()).toBe(true);
    const request = TestBed.inject(HttpTestingController).expectOne('/api/leads');
    expect(request.request.method).toBe('POST');
    request.flush({ id: 'test-123', status: 'received' });
    expect(contact.success()).toBe(true); expect(contact.loading()).toBe(false);
    expect(contact.message()).toContain('test-123');
  });
  it('conserva datos ante error y permite reintentar', async () => {
    publicConfig.leadEndpoint = '/api/leads';
    const { contact } = await setup(); valid(contact); contact.submit();
    TestBed.inject(HttpTestingController).expectOne('/api/leads').flush({}, { status: 500, statusText: 'Error' });
    expect(contact.success()).toBe(false); expect(contact.loading()).toBe(false);
    expect(contact.form.controls.name.value).toBe('Persona de prueba');
    contact.submit();
    TestBed.inject(HttpTestingController).expectOne('/api/leads').flush({ ok: true });
    expect(contact.success()).toBe(false);
  });
});
