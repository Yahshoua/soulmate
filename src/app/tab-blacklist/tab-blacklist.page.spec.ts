import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabBlacklistPage } from './tab-blacklist.page';

describe('TabBlacklistPage', () => {
  let component: TabBlacklistPage;
  let fixture: ComponentFixture<TabBlacklistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabBlacklistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabBlacklistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
