import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RenderResult, render } from '@testing-library/angular';

describe('AppComponent', () => {
  let component: RenderResult<AppComponent>;

  beforeEach(async () => {
    component = await render(AppComponent);
  });

  // it('should create the app', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app).toBeTruthy();
  // });

  it(`should have the 'angular-teardown-test-issues' title`, () => {
    const app = component.fixture.componentInstance;
    expect(app.title).toEqual('angular-teardown-test-issues');
  });

  it('should render title', () => {
    const h1 = component.getByText('Hello, angular-teardown-test-issues');
    expect(h1).toBeTruthy();
  });
});
