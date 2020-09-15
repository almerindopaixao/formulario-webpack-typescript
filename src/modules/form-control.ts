import isEmail from 'validator/lib/isEmail';

const SHOW_ERROR_MESSAGE = 'show-error-message';

main();

function main() {
  controlSubmit();

  function controlSubmit() {
    const form = window.document.querySelector('.form') as HTMLFormElement;
    const username = document.querySelector('.username') as HTMLInputElement;
    const email = document.querySelector('.email') as HTMLInputElement;
    const password = document.querySelector('.password') as HTMLInputElement;
    const password2 = document.querySelector('.password2') as HTMLInputElement;

    form.addEventListener('submit', function (event: Event): void {
      event.preventDefault();

      hideErrorMessage(this);

      checkFormEmptyFields(username, email, password, password2);
      checkEmail(email);
      checkEqualPasswords(password, password2);

      if (shouldSendForm(this)) console.log('Formulário Enviado');
    });

    function shouldSendForm(form: HTMLFormElement): boolean {
      let send = true;

      form
        .querySelectorAll('.' + SHOW_ERROR_MESSAGE)
        .forEach(() => (send = false));

      return send;
    }

    function checkEqualPasswords(
      password: HTMLInputElement,
      password2: HTMLInputElement,
    ): void {
      if (password.value !== password2.value) {
        showErrorMessage(password, 'Senhas não batem');
        showErrorMessage(password2, 'Senhas não batem');
      }
    }

    function checkEmail(email: HTMLInputElement): void {
      if (!isEmail(email.value)) showErrorMessage(email, 'Email Inválido');
    }

    function checkFormEmptyFields(...inputs: HTMLInputElement[]): void {
      inputs.forEach((input: HTMLInputElement): void => {
        const inputName = input.className;
        if (!input.value)
          showErrorMessage(input, `Campo ${inputName} não pode ficar vazio`);
      });
    }

    const hideErrorMessage = (form: HTMLFormElement): void => {
      form
        .querySelectorAll('.' + SHOW_ERROR_MESSAGE)
        .forEach((item) => item.classList.remove(SHOW_ERROR_MESSAGE));

      form.classList.remove(SHOW_ERROR_MESSAGE);
    };

    const showErrorMessage = (input: HTMLInputElement, msg: string): void => {
      const formFields = input.parentElement as HTMLDivElement;

      const erroMessage = formFields.querySelector(
        '.error-message',
      ) as HTMLSpanElement;

      erroMessage.innerText = msg;

      formFields.classList.add(SHOW_ERROR_MESSAGE);
    };
  }
}
