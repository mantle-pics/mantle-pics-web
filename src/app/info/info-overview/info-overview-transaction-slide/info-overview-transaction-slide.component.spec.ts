import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoOverviewTransactionSlideComponent } from './info-overview-transaction-slide.component';

describe('InfoOverviewTransactionSlideComponent', () => {
  let component: InfoOverviewTransactionSlideComponent;
  let fixture: ComponentFixture<InfoOverviewTransactionSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoOverviewTransactionSlideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoOverviewTransactionSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
