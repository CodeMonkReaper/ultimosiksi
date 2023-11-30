import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewprofePage } from './viewprofe.page';

describe('ViewprofePage', () => {
  let component: ViewprofePage;
  let fixture: ComponentFixture<ViewprofePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewprofePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
