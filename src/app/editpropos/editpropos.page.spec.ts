import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditproposPage } from './editpropos.page';

describe('EditproposPage', () => {
  let component: EditproposPage;
  let fixture: ComponentFixture<EditproposPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditproposPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditproposPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
