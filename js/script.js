$(document).ready(function() {

  // quando clicco sulla classe 'send-button' rimuovo l'icona
  // del microfono ed aggiungo l'icona invia e stampo
  // il messaggio
  $('.send-button').click(
    function() {
      $('.send-button i').removeClass('fas fa-microphone');
      $('.send-button i').addClass('fab fa-telegram-plane');
      sendMessage();
      setTimeout(function() {
        sendMessage()
      }, 1000)
    }
  );

  // quando c'è una classe 'write-message input'  e clicco
  // il tasto invia della tastiera,, mostro il messaggio
  $('.write-message input').keydown(
    function(event) {
      if (event.which === 13 || event.keyCode === 13) {
        sendMessage();
        setTimeout(function() {
          sendMessage();
        }, 1000);
      }
    }
  );

  // quando clicco sulla classe 'write-message input' rimuovo l'icona
  // invia ed aggiungo l'icona del microfono
  $('.write-message input').click(
    function() {
      $('.send-button i').removeClass('fas fa-microphone');
      $('.send-button i').addClass('fab fa-telegram-plane');
    }
  );

  // quando clicco sulla classe 'chat-messages' rimuovo l'icona
  // invia ed aggiungo l'icona del microfono
  $('.chat-messages').click(
    function() {
      $('.send-button i').removeClass('fab fa-telegram-plane');
      $('.send-button i').addClass('fas fa-microphone');
    }
  );

});

// ricerca contatti
// quando scrivo qualcos sull'input
$('#input-search').keyup(function() {

  // eseguo un ciclo
  $('.chat-contact').each(function() {

    // leggo il valore dell'input
    var search = $('#input-search').val().toLowerCase();

    // legge un elemento specifico del contenitore
    var thisName = $(this).find('.name').text().toLowerCase();

    // se questo elemento include quello che sta scritto nell'input
    if (thisName.includes(search)) {
      // viene mostrato
      $(this).show();
    } else {
      // altrimenti viene nascosto
      $(this).hide();
    }

  });
});

// funzione che invia messaggio
function sendMessage() {
  var textMessage = $('.write-message input').val();

  // clono il template del messaggio
  var cloneMessage = $('.template .message').clone();
  // al messaggio clonato aggiungo un testo
  cloneMessage.children('.message-text').text('Ciao :)');
  // aggiungo la classe 'received-message'
  cloneMessage.addClass('received-message');

  if (textMessage != '') {
    // clono il template del messaggio
    var cloneMessage = $('.template .message').clone();
    // al messaggio clonato aggiungo il testo dell'input
    cloneMessage.children('.message-text').text(textMessage);
    // aggiungo la classe 'send-message'
    cloneMessage.addClass('send-message');
  }


  // inserire la data una volta inviato il messaggio
  var date = new Date();
  var currentHours = date.getHours();
  var currentMinutes = date.getMinutes();
  var currentTime = addZeroToNumero(currentHours) + ':' + addZeroToNumero(currentMinutes);

  cloneMessage.children('.message-time').text(currentTime);

  // alla chat appendo il messaggio clonato
  $('.chat-messages').append(cloneMessage);

  // una volta inviato l'input ritorna vuota
  $('.write-message input').val('');

  // scrolal alla fine della finestra
  $('.chat-messages').scrollTop($('.chat-messages').height());
}


function addZeroToNumero(number) {
  if (number < 10) {
    return '0' + number;
  }

  return number;
}
