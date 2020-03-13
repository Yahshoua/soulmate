import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfilViewImagePage } from './profil-view-image.page';

describe('ProfilViewImagePage', () => {
  let component: ProfilViewImagePage;
  let fixture: ComponentFixture<ProfilViewImagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilViewImagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilViewImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
