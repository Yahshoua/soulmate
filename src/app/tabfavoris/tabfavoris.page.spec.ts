import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabfavorisPage } from './tabfavoris.page';

describe('TabfavorisPage', () => {
  let component: TabfavorisPage;
  let fixture: ComponentFixture<TabfavorisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabfavorisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabfavorisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
