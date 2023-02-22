import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoOverviewComponent } from './info-overview.component';

describe('InfoOverviewComponent', () => {
  let component: InfoOverviewComponent;
  let fixture: ComponentFixture<InfoOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
