import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VoirplusPage } from './voirplus.page';

describe('VoirplusPage', () => {
  let component: VoirplusPage;
  let fixture: ComponentFixture<VoirplusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoirplusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VoirplusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
