import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MatchingPage } from './matching.page';

describe('MatchingPage', () => {
  let component: MatchingPage;
  let fixture: ComponentFixture<MatchingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MatchingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
