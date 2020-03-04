import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabprofilPage } from './tabprofil.page';

describe('TabprofilPage', () => {
  let component: TabprofilPage;
  let fixture: ComponentFixture<TabprofilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabprofilPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabprofilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
