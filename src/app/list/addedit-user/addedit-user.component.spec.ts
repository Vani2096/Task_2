import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditUserComponent } from './addedit-user.component';

describe('AddeditUserComponent', () => {
  let component: AddeditUserComponent;
  let fixture: ComponentFixture<AddeditUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddeditUserComponent]
    });
    fixture = TestBed.createComponent(AddeditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
