import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditInfosPage } from './edit-infos.page';

describe('EditInfosPage', () => {
  let component: EditInfosPage;
  let fixture: ComponentFixture<EditInfosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInfosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditInfosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
