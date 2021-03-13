// smooth scroll
$(function () {
  $("a[href^='#']").bind("click", function (e) {
    let anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $(anchor.attr('href')).offset().top
    }, 1000);
    e.preventDefault();
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.scroll-up').fadeIn();
    } else {
      $('.scroll-up').fadeOut();
    }
  });
});

//mask

(function () {
  let phoneNumber = document.querySelectorAll('[data-mask]');

  if (phoneNumber) {
    phoneNumber.forEach(function (el) {
      el.addEventListener('input', function (event) {
        showMask(event);
      });
    });
  }

  function showMask(event) {
    const digitalPattern = /[0-9]/;
    const literalPattern = /[0\*]/;
    let input = event.target;
    let value = input.value;
    let mask = input.dataset.mask;
    let newValue = '';

    try {
      let maskLength = mask.length;
      let valueIndex = 0;
      let maskIndex = 0;

      for (; maskIndex < maskLength;) {
        if (maskIndex >= value.length) {
          break;
        }

        if (mask[maskIndex] === '0' && value[valueIndex].match(digitalPattern) === null) {
          break;
        }

        while (mask[maskIndex].match(literalPattern) === null) {
          if (value[valueIndex] === mask[maskIndex]) {
            break;
          }

          newValue += mask[maskIndex++];
        } //end cycle while

        newValue += value[valueIndex++];
        maskIndex++;
      } //end cycle for

      input.value = newValue;
    } catch (evt) {
      phoneNumber.removeEventListener();
    }
  }
})();
