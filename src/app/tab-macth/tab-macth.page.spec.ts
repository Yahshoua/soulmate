import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabMacthPage } from './tab-macth.page';

describe('TabMacthPage', () => {
  let component: TabMacthPage;
  let fixture: ComponentFixture<TabMacthPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabMacthPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabMacthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
