import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupzComponent } from './groupz.component';

describe('GroupzComponent', () => {
  let component: GroupzComponent;
  let fixture: ComponentFixture<GroupzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
