import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PropositionPage } from './proposition.page';

describe('PropositionPage', () => {
  let component: PropositionPage;
  let fixture: ComponentFixture<PropositionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropositionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PropositionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
