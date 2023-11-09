document.addEventListener("DOMContentLoaded", function() {
    var links = document.querySelectorAll('a[href^="#"]');
    
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", function(e) {
        e.preventDefault();
        var targetId = this.getAttribute("href").substring(1);
        var target = document.getElementById(targetId);
        if (target) {
          scrollSmoothlyTo(target);
        }
      });
    }
  });
  
  function scrollSmoothlyTo(target) {
    var targetPosition = target.getBoundingClientRect().top + window.scrollY;
    var startPosition = window.scrollY;
    var distance = targetPosition - startPosition;
    var duration = 800; // Duración de la animación en milisegundos
    var startTime = null;
    
    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      var timeElapsed = currentTime - startTime;
      var scrollPosition = easeInOut(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, scrollPosition);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function easeInOut(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
  }
  