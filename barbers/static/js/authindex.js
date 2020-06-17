document.addEventListener('DOMContentLoaded', function() {
  // ==================== REGISTER ==============================================

    document.querySelector('#submit-register').onclick = () => {
      // Ensure that all registration information was entered
    const username = document.querySelector('#register-username').value;
    const password = document.querySelector('#register-password').value;
    const first_name = document.querySelector('#register-first-name').value;
    const last_name = document.querySelector('#register-last-name').value;
    const email = document.querySelector('#register-email').value;
    if (username !== '' && password !== '' && first_name !== '' && last_name !== '' && email !== '') {

    // Initialize POST request, extract the CSRF value from the index.html DOM,
    // and put that into the header of the POST request.
    let request = new XMLHttpRequest();
    request.open('POST', '/register');
    const csrf_token = document.querySelector('#csrf').childNodes[0]['value'];
    request.setRequestHeader("X-CSRFToken", csrf_token);

    // The FormData() object can be used to transmit data to the server (ie.
     // transmit data to views.py).
     let register_data = new FormData();
     register_data.append('username', username);
     register_data.append('password', password);
     register_data.append('first_name', first_name);
     register_data.append('last_name', last_name);
     register_data.append('email', email);

     // Send register_data (aka FormData()) to views.py, followed by a callback
     // function that executes once a response is received from views.py.
     request.send(register_data);
     request.onload = () => {
       const response = request.responseText;
       const success = JSON.parse(response)['success'];
       const error_message = JSON.parse(response)['message'];
       // If views.py returns a JSON response where success = true, then
       // If views.py returns a JSON response where success = true, then
       // the page is reloaded in order to redirect the user to index.html.
       if (success === true) {
         window.location.href = '/';
       } else {
         document.querySelector('.error-register').innerHTML = error_message;
       }
     };

     // Disable the default page reload after a POST request.
     return false;

   // Return an error message if any of the fields were left blank.
   } else {
     document.querySelector('.error-register').innerHTML = 'All fields are required.'
   };
 };
   // ==================== LOGIN ==================================================

 document.querySelector('#submit-login').onclick = () => {

   // Ensure that both a username and password were entered
   const username = document.querySelector('#username').value;
   const password = document.querySelector('#password').value;
   if (username !== '' && password !== '') {

     // Initialize POST request, extract the CSRF value from the index.html DOM,
     // and put that into the header of the POST request.
     const request = new XMLHttpRequest();
     request.open('POST', '/login');
     const csrf_token = document.querySelector('#csrf').childNodes[0]['value'];
     request.setRequestHeader("X-CSRFToken", csrf_token);

     // The FormData() object can be used to transmit data to the server (ie.
     // transmit data to views.py).
     const login_data = new FormData();
     login_data.append('username', username);
     login_data.append('password', password);

     // Send login_data (aka FormData()) to views.py, followed by a callback
     // function that executes once a response is received from views.py.
     request.send(login_data);
     request.onload = () => {
       const response = request.responseText;
       const success = JSON.parse(response)['success'];
       const error_message = JSON.parse(response)['message'];

       // If views.py returns a JSON response where success = true, then
       // the page is redirected to index.html.
       if (success === true) {
         window.location.href = '/';
       } else {
         document.querySelector('.error-login').innerHTML = error_message;
       }
     };

     // Disable the default page reload after a POST request.
     return false;

   // Return an error message if any of the fields were left blank.
   } else {
     document.querySelector('.error-login').innerHTML = 'Both username and password are required.'
   };
 };
})
