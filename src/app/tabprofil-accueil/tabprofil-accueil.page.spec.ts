import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabprofilAccueilPage } from './tabprofil-accueil.page';

describe('TabprofilAccueilPage', () => {
  let component: TabprofilAccueilPage;
  let fixture: ComponentFixture<TabprofilAccueilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabprofilAccueilPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabprofilAccueilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
