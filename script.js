$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'linear');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

document.addEventListener('DOMContentLoaded', function () {
    const openModalButtons = document.querySelectorAll('.open-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const modals = document.querySelectorAll('.portfolio-modal');
  
    // Función para abrir la ventana modal
    function openModal(modal) {
      modal.style.display = 'block';
      modal.classList.add('modal-visible');
    }
  
    // Función para cerrar la ventana modal
    function closeModal(modal) {
      modal.style.display = 'none';
      modal.classList.remove('modal-visible');
    }
  
    // Agregar eventos de clic a los botones de abrir modal
    openModalButtons.forEach(button => {
      button.addEventListener('click', () => {
        const target = button.getAttribute('data-target');
        const modal = document.querySelector(target);
        openModal(modal);
      });
    });
  
    // Agregar eventos de clic a los botones de cerrar modal
    closeModalButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modal = button.closest('.portfolio-modal');
        closeModal(modal);
      });
    });
  
    // Cerrar la ventana modal haciendo clic fuera de ella
    modals.forEach(modal => {
      modal.addEventListener('click', e => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    });
  });

/*PONG MODAL*/ 

// tennis.js --------------------------------------------------------------------

  
$(document).on('show.bs.modal', '#mi-modal-img1', function () {
    // Inicializar el script aquí
    $.getScript("juegos/tennis/tennis.js", function () {
        // Inicializa el juego después de que se cargue el script
      });
    });

  $(document).on('hidden.bs.modal', '#mi-modal-img1', function () {
    // Eliminar script externo
    $('script[src="juegos/tennis/tennis.js"]').remove();
  });

//tennis -----------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
  var openExternalContentBtn = document.getElementById("openExternalContentBtn");
  var externalContentContainer = document.getElementById("externalContentContainer");
  var boton = document.getElementById("cerrarModalBtn");

  boton.style.display = "none";

  openExternalContentBtn.addEventListener("click", function() {
      externalContentContainer.innerHTML = `
          <div class="external-modal">
              <button type="button" class="close">Salir <i class="fa fa-times"></i></button>
              <br>
              <br>
              <iframe class="iframe-tennis" src="juegos/tennis/index.html" frameborder="0"></iframe>
          </div>
      `;
      var modal = externalContentContainer.querySelector(".external-modal");
      var span = modal.querySelector(".close");
      
      modal.style.display = "block";

      span.onclick = function() {
          modal.style.display = "none";
          externalContentContainer.innerHTML = "";
          boton.style.display = "inline"; // Mostrar el botón cerrarModalBtn al cerrar la modal externa
      }

      // Ocultar el botón cerrarModalBtn al abrir la modal externa
      boton.style.display = "none";
  });

  // Agregar evento al botón para ocultarlo cuando se hace clic
  boton.addEventListener("click", function() {
      boton.style.display = "none";
  });
});

//------------------------------------------------------------------------------------------------------------------------------------------------

//spacewar -----------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    var openExternalContentBtn2 = document.getElementById("openExternalContentBtn2");
    var externalContentContainer2 = document.getElementById("externalContentContainer2");
    var boton = document.getElementById("cerrarModalBtn2");
  
    boton.style.display = "none";
  
    openExternalContentBtn2.addEventListener("click", function() {
        externalContentContainer2.innerHTML = `
            <div class="external-modal2">
                <button type="button" class="close">Salir <i class="fa fa-times"></i></button>
                <br>
                <br>
                <iframe src="juegos/spacewar/index.html" frameborder="0"></iframe>
            </div>
        `;
        var modal = externalContentContainer2.querySelector(".external-modal2");
        var span = modal.querySelector(".close");
        
        modal.style.display = "block";
  
        span.onclick = function() {
            modal.style.display = "none";
            externalContentContainer2.innerHTML = "";
            boton.style.display = "inline"; // Mostrar el botón cerrarModalBtn al cerrar la modal externa
        }
  
        // Ocultar el botón cerrarModalBtn al abrir la modal externa
        boton.style.display = "none";
    });
  
    // Agregar evento al botón para ocultarlo cuando se hace clic
    boton.addEventListener("click", function() {
        boton.style.display = "none";
    });
  });
//------------------------------------------------------------------------------------------------------------------------------------------------

//pong -----------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    var openExternalContentBtn3 = document.getElementById("openExternalContentBtn3");
    var externalContentContainer3 = document.getElementById("externalContentContainer3");
    var boton = document.getElementById("cerrarModalBtn3");
  
    boton.style.display = "none";
  
    openExternalContentBtn3.addEventListener("click", function() {
        externalContentContainer3.innerHTML = `
            <div class="external-modal3">
                <button type="button" class="close">Salir <i class="fa fa-times"></i></button>
                <br>
                <br>
                <iframe class="iframe-pong" src="juegos/pong/index.html" frameborder="0"></iframe>
            </div>
        `;
        var modal = externalContentContainer3.querySelector(".external-modal3");
        var span = modal.querySelector(".close");
        
        modal.style.display = "block";
  
        span.onclick = function() {
            modal.style.display = "none";
            externalContentContainer3.innerHTML = "";
            boton.style.display = "inline"; // Mostrar el botón cerrarModalBtn al cerrar la modal externa
        }
  
        // Ocultar el botón cerrarModalBtn al abrir la modal externa
        boton.style.display = "none";
    });
  
    // Agregar evento al botón para ocultarlo cuando se hace clic
    boton.addEventListener("click", function() {
        boton.style.display = "none";
    });
  });
//------------------------------------------------------------------------------------------------------------------------------------------------

//Space invaders ---------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    var openExternalContentBtn4 = document.getElementById("openExternalContentBtn4");
    var externalContentContainer4 = document.getElementById("externalContentContainer4");
    var boton = document.getElementById("cerrarModalBtn4");
  
    boton.style.display = "none";
  
    openExternalContentBtn4.addEventListener("click", function() {
        externalContentContainer4.innerHTML = `
            <div class="external-modal4">
                <button type="button" class="close">Salir <i class="fa fa-times"></i></button>
                <br>
                <br>
                <iframe src="juegos/space_invaders/index.html" frameborder="0"></iframe>
            </div>
        `;
        var modal = externalContentContainer4.querySelector(".external-modal4");
        var span = modal.querySelector(".close");
        
        modal.style.display = "block";
  
        span.onclick = function() {
            modal.style.display = "none";
            externalContentContainer4.innerHTML = "";
            boton.style.display = "inline"; // Mostrar el botón cerrarModalBtn al cerrar la modal externa
        }
  
        // Ocultar el botón cerrarModalBtn al abrir la modal externa
        boton.style.display = "none";
    });
  
    // Agregar evento al botón para ocultarlo cuando se hace clic
    boton.addEventListener("click", function() {
        boton.style.display = "none";
    });
  });
//------------------------------------------------------------------------------------------------------------------------------------------------

//Asteroids --------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    var openExternalContentBtn5 = document.getElementById("openExternalContentBtn5");
    var externalContentContainer5 = document.getElementById("externalContentContainer5");
    var boton = document.getElementById("cerrarModalBtn5");
  
    boton.style.display = "none";
  
    openExternalContentBtn5.addEventListener("click", function() {
        externalContentContainer5.innerHTML = `
            <div class="external-modal5">
                <button type="button" class="close">Salir <i class="fa fa-times"></i></button>
                <br>
                <br>
                <iframe class="iframe-asteroids" src="juegos/asteroids/index.html" frameborder="0"></iframe>
            </div>
        `;
        var modal = externalContentContainer5.querySelector(".external-modal5");
        var span = modal.querySelector(".close");
        
        modal.style.display = "block";
  
        span.onclick = function() {
            modal.style.display = "none";
            externalContentContainer5.innerHTML = "";
            boton.style.display = "inline"; // Mostrar el botón cerrarModalBtn al cerrar la modal externa
        }
  
        // Ocultar el botón cerrarModalBtn al abrir la modal externa
        boton.style.display = "none";
    });
  
    // Agregar evento al botón para ocultarlo cuando se hace clic
    boton.addEventListener("click", function() {
        boton.style.display = "none";
    });
  });
//------------------------------------------------------------------------------------------------------------------------------------------------

//Pacman ---------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    var openExternalContentBtn6 = document.getElementById("openExternalContentBtn6");
    var externalContentContainer6 = document.getElementById("externalContentContainer6");
    var boton = document.getElementById("cerrarModalBtn6");
  
    boton.style.display = "none";
  
    openExternalContentBtn6.addEventListener("click", function() {
        externalContentContainer6.innerHTML = `
            <div class="external-modal6">
                <button type="button" class="close">Salir <i class="fa fa-times"></i></button>
                <br>
                <br>
                <iframe src="juegos/pacman/index.html" frameborder="0"></iframe>
            </div>
        `;
        var modal = externalContentContainer6.querySelector(".external-modal6");
        var span = modal.querySelector(".close");
        
        modal.style.display = "block";
  
        span.onclick = function() {
            modal.style.display = "none";
            externalContentContainer6.innerHTML = "";
            boton.style.display = "inline"; // Mostrar el botón cerrarModalBtn al cerrar la modal externa
        }
  
        // Ocultar el botón cerrarModalBtn al abrir la modal externa
        boton.style.display = "none";
    });
  
    // Agregar evento al botón para ocultarlo cuando se hace clic
    boton.addEventListener("click", function() {
        boton.style.display = "none";
    });
  });
//------------------------------------------------------------------------------------------------------------------------------------------------

//Galaga -----------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    var openExternalContentBtn7 = document.getElementById("openExternalContentBtn7");
    var externalContentContainer7 = document.getElementById("externalContentContainer7");
    var boton = document.getElementById("cerrarModalBtn7");
  
    boton.style.display = "none";
  
    openExternalContentBtn7.addEventListener("click", function() {
        externalContentContainer7.innerHTML = `
            <div class="external-modal7">
                <button type="button" class="close">Salir <i class="fa fa-times"></i></button>
                <br>
                <br>
                <iframe src="juegos/galaga/index.html" frameborder="0"></iframe>
            </div>
        `;
        var modal = externalContentContainer7.querySelector(".external-modal7");
        var span = modal.querySelector(".close");
        
        modal.style.display = "block";
  
        span.onclick = function() {
            modal.style.display = "none";
            externalContentContainer7.innerHTML = "";
            boton.style.display = "inline"; // Mostrar el botón cerrarModalBtn al cerrar la modal externa
        }
  
        // Ocultar el botón cerrarModalBtn al abrir la modal externa
        boton.style.display = "none";
    });
  
    // Agregar evento al botón para ocultarlo cuando se hace clic
    boton.addEventListener("click", function() {
        boton.style.display = "none";
    });
  });
//------------------------------------------------------------------------------------------------------------------------------------------------

//Enduro ---------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    var openExternalContentBtn8 = document.getElementById("openExternalContentBtn8");
    var externalContentContainer8 = document.getElementById("externalContentContainer8");
    var boton = document.getElementById("cerrarModalBtn8");
  
    boton.style.display = "none";
  
    openExternalContentBtn8.addEventListener("click", function() {
        externalContentContainer8.innerHTML = `
            <div class="external-modal8">
                <button type="button" class="close">Salir <i class="fa fa-times"></i></button>
                <br>
                <br>
                <iframe class="iframe-enduro" src="juegos/enduro/index.html" frameborder="0"></iframe>
            </div>
        `;
        var modal = externalContentContainer8.querySelector(".external-modal8");
        var span = modal.querySelector(".close");
        
        modal.style.display = "block";
  
        span.onclick = function() {
            modal.style.display = "none";
            externalContentContainer8.innerHTML = "";
            boton.style.display = "inline"; // Mostrar el botón cerrarModalBtn al cerrar la modal externa
        }
  
        // Ocultar el botón cerrarModalBtn al abrir la modal externa
        boton.style.display = "none";
    });
  
    // Agregar evento al botón para ocultarlo cuando se hace clic
    boton.addEventListener("click", function() {
        boton.style.display = "none";
    });
  });
//------------------------------------------------------------------------------------------------------------------------------------------------

//Duck-hunt --------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    var openExternalContentBtn9 = document.getElementById("openExternalContentBtn9");
    var externalContentContainer9 = document.getElementById("externalContentContainer9");
    var boton = document.getElementById("cerrarModalBtn9");
  
    boton.style.display = "none";
  
    openExternalContentBtn9.addEventListener("click", function() {
        externalContentContainer9.innerHTML = `
            <div class="external-modal9">
                <button type="button" class="close">Salir <i class="fa fa-times"></i></button>
                <br>
                <br>
                <iframe class="iframe-duck" src="juegos/duck_hunt/html/index.html" frameborder="0"></iframe>
            </div>
        `;
        var modal = externalContentContainer9.querySelector(".external-modal9");
        var span = modal.querySelector(".close");
        
        modal.style.display = "block";
  
        span.onclick = function() {
            modal.style.display = "none";
            externalContentContainer9.innerHTML = "";
            boton.style.display = "inline"; // Mostrar el botón cerrarModalBtn al cerrar la modal externa
        }
  
        // Ocultar el botón cerrarModalBtn al abrir la modal externa
        boton.style.display = "none";
    });
  
    // Agregar evento al botón para ocultarlo cuando se hace clic
    boton.addEventListener("click", function() {
        boton.style.display = "none";
    });
  });
//------------------------------------------------------------------------------------------------------------------------------------------------

//Tetris -----------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    var openExternalContentBtn10 = document.getElementById("openExternalContentBtn10");
    var externalContentContainer10 = document.getElementById("externalContentContainer10");
    var boton = document.getElementById("cerrarModalBtn10");
  
    boton.style.display = "none";
  
    openExternalContentBtn10.addEventListener("click", function() {
        externalContentContainer10.innerHTML = `
            <div class="external-modal10">
                <button type="button" class="close">Salir <i class="fa fa-times"></i></button>
                <br>
                <br>
                <iframe src="juegos/tetris/index.html" frameborder="0"></iframe>
            </div>
        `;
        var modal = externalContentContainer10.querySelector(".external-modal10");
        var span = modal.querySelector(".close");
        
        modal.style.display = "block";
  
        span.onclick = function() {
            modal.style.display = "none";
            externalContentContainer10.innerHTML = "";
            boton.style.display = "inline"; // Mostrar el botón cerrarModalBtn al cerrar la modal externa
        }
  
        // Ocultar el botón cerrarModalBtn al abrir la modal externa
        boton.style.display = "none";
    });
  
    // Agregar evento al botón para ocultarlo cuando se hace clic
    boton.addEventListener("click", function() {
        boton.style.display = "none";
    });
  });
//------------------------------------------------------------------------------------------------------------------------------------------------

//Super Mario Bros -------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    var openExternalContentBtn11 = document.getElementById("openExternalContentBtn11");
    var externalContentContainer11 = document.getElementById("externalContentContainer11");
    var boton = document.getElementById("cerrarModalBtn11");
  
    boton.style.display = "none";
  
    openExternalContentBtn11.addEventListener("click", function() {
        externalContentContainer11.innerHTML = `
            <div class="external-modal11">
                <button type="button" class="close">Salir <i class="fa fa-times"></i></button>
                <br>
                <br>
                <iframe src="juegos/mario/index.html" frameborder="0"></iframe>
            </div>
        `;
        var modal = externalContentContainer11.querySelector(".external-modal11");
        var span = modal.querySelector(".close");
        
        modal.style.display = "block";
  
        span.onclick = function() {
            modal.style.display = "none";
            externalContentContainer11.innerHTML = "";
            boton.style.display = "inline"; // Mostrar el botón cerrarModalBtn al cerrar la modal externa
        }
  
        // Ocultar el botón cerrarModalBtn al abrir la modal externa
        boton.style.display = "none";
    });
  
    // Agregar evento al botón para ocultarlo cuando se hace clic
    boton.addEventListener("click", function() {
        boton.style.display = "none";
    });
  });
//------------------------------------------------------------------------------------------------------------------------------------------------

//Zelda ------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    var openExternalContentBtn12 = document.getElementById("openExternalContentBtn12");
    var externalContentContainer12 = document.getElementById("externalContentContainer12");
    var boton = document.getElementById("cerrarModalBtn12");
  
    boton.style.display = "none";
  
    openExternalContentBtn12.addEventListener("click", function() {
        externalContentContainer12.innerHTML = `
            <div class="external-modal12">
                <button type="button" class="close">Salir <i class="fa fa-times"></i></button>
                <br>
                <iframe class="iframe-zelda" src="juegos/zelda/index.html" frameborder="0"></iframe>
            </div>
        `;
        var modal = externalContentContainer12.querySelector(".external-modal12");
        var span = modal.querySelector(".close");
        
        modal.style.display = "block";
  
        span.onclick = function() {
            modal.style.display = "none";
            externalContentContainer12.innerHTML = "";
            boton.style.display = "inline"; // Mostrar el botón cerrarModalBtn al cerrar la modal externa
        }
  
        // Ocultar el botón cerrarModalBtn al abrir la modal externa
        boton.style.display = "none";
    });
  
    // Agregar evento al botón para ocultarlo cuando se hace clic
    boton.addEventListener("click", function() {
        boton.style.display = "none";
    });
  });
//------------------------------------------------------------------------------------------------------------------------------------------------

//Pokemon ----------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    var openExternalContentBtn13 = document.getElementById("openExternalContentBtn13");
    var externalContentContainer13 = document.getElementById("externalContentContainer13");
    var boton = document.getElementById("cerrarModalBtn13");
  
    boton.style.display = "none";
  
    openExternalContentBtn13.addEventListener("click", function() {
        externalContentContainer13.innerHTML = `
            <div class="external-modal13">
                <button type="button" class="close">Salir <i class="fa fa-times"></i></button>
                <br>
                <br>
                <iframe src="juegos/pokemon/index.html" frameborder="0"></iframe>
            </div>
        `;
        var modal = externalContentContainer13.querySelector(".external-modal13");
        var span = modal.querySelector(".close");
        
        modal.style.display = "block";
  
        span.onclick = function() {
            modal.style.display = "none";
            externalContentContainer13.innerHTML = "";
            boton.style.display = "inline"; // Mostrar el botón cerrarModalBtn al cerrar la modal externa
        }
  
        // Ocultar el botón cerrarModalBtn al abrir la modal externa
        boton.style.display = "none";
    });
  
    // Agregar evento al botón para ocultarlo cuando se hace clic
    boton.addEventListener("click", function() {
        boton.style.display = "none";
    });
  });
//------------------------------------------------------------------------------------------------------------------------------------------------
