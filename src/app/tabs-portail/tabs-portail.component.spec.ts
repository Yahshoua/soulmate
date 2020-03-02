import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabsPortailComponent } from './tabs-portail.component';

describe('TabsPortailComponent', () => {
  let component: TabsPortailComponent;
  let fixture: ComponentFixture<TabsPortailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsPortailComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabsPortailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
