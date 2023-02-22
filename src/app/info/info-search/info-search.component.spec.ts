import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSearchComponent } from './info-search.component';

describe('InfoSearchComponent', () => {
  let component: InfoSearchComponent;
  let fixture: ComponentFixture<InfoSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
