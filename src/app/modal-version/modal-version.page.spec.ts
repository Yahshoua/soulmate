import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalVersionPage } from './modal-version.page';

describe('ModalVersionPage', () => {
  let component: ModalVersionPage;
  let fixture: ComponentFixture<ModalVersionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVersionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalVersionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
