import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VoirpersonnePage } from './voirpersonne.page';

describe('VoirpersonnePage', () => {
  let component: VoirpersonnePage;
  let fixture: ComponentFixture<VoirpersonnePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoirpersonnePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VoirpersonnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
