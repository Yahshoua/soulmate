import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PhotoProfilSelectedPage } from './photo-profil-selected.page';

describe('PhotoProfilSelectedPage', () => {
  let component: PhotoProfilSelectedPage;
  let fixture: ComponentFixture<PhotoProfilSelectedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoProfilSelectedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoProfilSelectedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
