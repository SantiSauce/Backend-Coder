

const form = document.querySelector('form')
const emailInput = document.getElementById('email')

const sendEmail = (email) => {
  fetch('/sendResetPasswordEmail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  })
    .then(response => {
      if (response.ok) {
        console.log('Email enviado exitosamente!');
      } else {
        console.log('Ocurrió un error al enviar el email.');
      }
    })
    .catch(error => console.error(error));
};

form.addEventListener('submit', event => {
  event.preventDefault();
  console.log('hola');
  const email = emailInput.value;
  sendEmail(email);
});
