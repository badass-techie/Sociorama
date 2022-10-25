import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteSectionComponent } from './vote-section.component';

describe('VoteButtonComponent', () => {
  let component: VoteSectionComponent;
  let fixture: ComponentFixture<VoteSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
