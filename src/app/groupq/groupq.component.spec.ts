import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupqComponent } from './groupq.component';

describe('GroupqComponent', () => {
  let component: GroupqComponent;
  let fixture: ComponentFixture<GroupqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
