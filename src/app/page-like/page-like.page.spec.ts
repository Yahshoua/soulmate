import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PageLikePage } from './page-like.page';

describe('PageLikePage', () => {
  let component: PageLikePage;
  let fixture: ComponentFixture<PageLikePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageLikePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PageLikePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
