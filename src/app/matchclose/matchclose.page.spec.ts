import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MatchclosePage } from './matchclose.page';

describe('MatchclosePage', () => {
  let component: MatchclosePage;
  let fixture: ComponentFixture<MatchclosePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchclosePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MatchclosePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
