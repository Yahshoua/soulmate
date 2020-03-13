import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditInteretPage } from './edit-interet.page';

describe('EditInteretPage', () => {
  let component: EditInteretPage;
  let fixture: ComponentFixture<EditInteretPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInteretPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditInteretPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
