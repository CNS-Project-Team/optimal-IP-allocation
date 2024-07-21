import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateComponent } from './allocate.component';

describe('AllocateComponent', () => {
  let component: AllocateComponent;
  let fixture: ComponentFixture<AllocateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllocateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
