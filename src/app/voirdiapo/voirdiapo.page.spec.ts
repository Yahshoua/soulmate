import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VoirdiapoPage } from './voirdiapo.page';

describe('VoirdiapoPage', () => {
  let component: VoirdiapoPage;
  let fixture: ComponentFixture<VoirdiapoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoirdiapoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VoirdiapoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
