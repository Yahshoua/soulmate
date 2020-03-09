import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PageVisitePage } from './page-visite.page';

describe('PageVisitePage', () => {
  let component: PageVisitePage;
  let fixture: ComponentFixture<PageVisitePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageVisitePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PageVisitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
