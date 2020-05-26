document.addEventListener('DOMContentLoaded', function() {
  // ==================== Appointment Form ==============================================

    document.querySelector('#submit-form').onclick = () => {
    const fname = $('#fname').value;
    const lname = $('#lname').value;
    const phone = $('#phone').value;
    const email = $('#email').value;
    const contact = $('#contact').value;
    const barber = $('#barber').value;
    const myDate = $('#myDate').value;
    const time = $('#time').value;
    const comment = $('#comment').value;

    let request = new XMLHttpRequest();
    request.open('POST', '/appointment')
    var csrf_token = $("[name=csrfmiddlewaretoken]").val();
    request.setRequestHeader("X-CSRFToken", csrf_token);


    // The FormData() object can be used to transmit data to the server (ie.
      // transmit data to views.py).
      let appointment_data = new FormData();
      appointment_data.append('fname', fname);
      appointment_data.append('lname', lname);
      appointment_data.append('phone', phone);
      appointment_data.append('email', email);
      appointment_data.append('contact', contact);
      appointment_data.append('barber', barber);
      appointment_data.append('myDate', myDate);
      appointment_data.append('time', time);
      appointment_data.append('comment', comment);

      // Send register_data (aka FormData()) to views.py, followed by a callback
        // function that executes once a response is received from views.py.
        request.send(appointment_data);
        request.onload = () => {
          const response = request.responseText;
          const success = JSON.parse(response)['success'];
          const error_message = JSON.parse(response)['message'];


       // If views.py returns a JSON response where success = true, then
       // the page is reloaded in order to redirect the user to index.html.
       if (success === true) {
         window.location.href = '/';
    }
}
}
})
