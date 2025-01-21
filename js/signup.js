
document.addEventListener('DOMContentLoaded', function() {
  var counter = 1;

  var erroEle = document.querySelector('.error-message');
  var nextPageButton = document.getElementById('next-page');
  var signUpButton = document.getElementById('signup');
  var showPwdButton = document.getElementById('show-pwd');
  
  function nextMaster(type) {
    var focusInput = document.querySelector('.questions .active');
    
    if (focusInput && focusInput.value.trim() !== '') {
      if ((focusInput.name === 'name' || focusInput.name === 'username') && focusInput.value.length < 2) {
        errorMessage(erroEle, `isn't your ${focusInput.name} bit small.`, 'visible', 1);
      } else if (focusInput.name === 'email' && !validateEmail(focusInput.value)) {
        errorMessage(erroEle, `It doesn't look like a valid ${focusInput.name}`, 'visible', 1);
      } else if (focusInput.name === 'phone' && !validatePhone(focusInput.value)) {
        errorMessage(erroEle, `It doesn't look like a valid ${focusInput.name}`, 'visible', 1);
      } else {
        if (type !== 'navi') showLi(focusInput);
        nextPageButton.style.opacity = 0;
        errorMessage(erroEle, '', 'hidden', 0);
      }
    } else if (type === 'keypress') {
      errorMessage(erroEle, `Please enter your ${focusInput.name}`, 'visible', 1);
    }
  }

  function showLi(focusInput) {
    var currentLi = focusInput.closest('li');
    currentLi.style.marginTop = '-150px';
    currentLi.style.opacity = 0;

    var nextLi = currentLi.nextElementSibling;
    if (nextLi) {
      nextLi.style.marginTop = '0px';
      nextLi.style.opacity = 1;
      var input = nextLi.querySelector('input');
      if (input) {
        input.focus();
        input.classList.add('active');
      }
    }

    var ref = document.querySelector(`[data-ref='${focusInput.id}']`);
    if (ref) {
      ref.classList.add('done');
      ref.textContent = focusInput.id === 'viewpswd' ? 'password' : focusInput.value;
    }

    focusInput.classList.remove('active');
    counter++;
  }

  function errorMessage(element, message, visibility, opacity) {
    element.style.visibility = visibility;
    element.style.opacity = opacity;
    element.textContent = message;
  }

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function validatePhone(phone) {
    var re = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    return re.test(phone);
  }

  document.addEventListener('keypress', function(event) {
    if (event.which === 13) {
      nextMaster('keypress');
      event.preventDefault();
    }
  });

  nextPageButton.addEventListener('click', function() {
    nextMaster('nextpage');
  });

  signUpButton.addEventListener('click', function() {
    document.querySelector('.navigation').style.display = 'none';
    document.getElementById('sign-form').style.display = 'none';
    signUpButton.style.display = 'none';
    var wf = document.getElementById('wf');
    wf.style.opacity = 1;
    wf.style.marginTop = '1em';
    wf.style.display = 'block';
  });

  showPwdButton.addEventListener('mousedown', function() {
    showPwdButton.classList.add('hide');
    showPwdButton.classList.remove('view');
    document.getElementById('password').type = 'text';
    document.getElementById('viewpswd').style.opacity = 1;
  });

  showPwdButton.addEventListener('mouseup', function() {
    showPwdButton.classList.add('view');
    showPwdButton.classList.remove('hide');
    document.getElementById('password').type = 'password';
    document.getElementById('viewpswd').style.opacity = 0;
  });

  document.querySelectorAll("input[type='text'], #password").forEach(function(input) {
    input.addEventListener('keyup', function() {
      var focusInput = this;
      if (focusInput.value.length > 1) {
        if ((focusInput.name === 'email' && !validateEmail(focusInput.value)) ||
          (focusInput.name === 'phone' && !validatePhone(focusInput.value))) {
          nextPageButton.style.opacity = 0;
        } else {
          nextPageButton.style.opacity = 1;
        }
      } else {
        nextPageButton.style.opacity = 0;
      }
    });
  });
});
