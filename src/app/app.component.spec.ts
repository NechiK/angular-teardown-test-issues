import { AppComponent } from './app.component';
import { RenderResult, render, screen } from '@testing-library/angular';
import { APP_ROUTES } from './app.routes';
import { userEvent } from '@testing-library/user-event';

describe('AppComponent', () => {
  const user = userEvent.setup();
  let component: RenderResult<AppComponent>;

  beforeAll(async () => {
    component = await render('<app-root></app-root>', {
      imports: [
        AppComponent,
      ],
      routes: APP_ROUTES,
      // This configuration keeps the component instance and render results between tests
      // But breaks change detection
      configureTestBed: (testBed): void => {
        testBed.configureTestingModule(
          {
            teardown: { destroyAfterEach: false },
          },
        );
      },
    });

    component.detectChanges();
  });

  it('should render loginBtn', () => {
    const loginBtn: HTMLButtonElement = component.getByText('Login').closest('button')!;
    expect(loginBtn).toBeTruthy();
  });

  it('should disable login button by default', () => {
    const loginBtn: HTMLButtonElement = component.getByText('Login').closest('button')!;
    expect(loginBtn.disabled).toBeTruthy();
  });

  it('should enter username value', async () => {
    const usernameInput: HTMLInputElement = screen.getByLabelText(/Username/i);

    await user.type(usernameInput, 'John Doe');
    expect(usernameInput.value).toBe('John Doe');
  });

  it('should have username value entered before, enter password and enable button', async () => {
    const usernameInput: HTMLInputElement = screen.getByLabelText(/Username/i);
    const passwordInput: HTMLInputElement = screen.getByLabelText(/Password/i);

    // Have username value entered before
    expect(usernameInput.value).toBe('John Doe');

    await user.type(passwordInput, 'mysuperpassword');
    expect(passwordInput.value).toBe('mysuperpassword');

    const loginBtn: HTMLButtonElement = component.getByText('Login').closest('button')!;

    // This test is failing because the change detection is not working when teardown.destroyAfterEach is set to false
    expect(loginBtn.disabled).toBeFalsy();
  });
});
