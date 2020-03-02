import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PortailPage } from './portail.page';

describe('PortailPage', () => {
  let component: PortailPage;
  let fixture: ComponentFixture<PortailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PortailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
