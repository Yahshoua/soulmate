import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PageSugPage } from './page-sug.page';

describe('PageSugPage', () => {
  let component: PageSugPage;
  let fixture: ComponentFixture<PageSugPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSugPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PageSugPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
