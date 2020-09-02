import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalEmptyPersonPage } from './modal-empty-person.page';

describe('ModalEmptyPersonPage', () => {
  let component: ModalEmptyPersonPage;
  let fixture: ComponentFixture<ModalEmptyPersonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEmptyPersonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalEmptyPersonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
