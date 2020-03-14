import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditVieModePage } from './edit-vie-mode.page';

describe('EditVieModePage', () => {
  let component: EditVieModePage;
  let fixture: ComponentFixture<EditVieModePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVieModePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditVieModePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
