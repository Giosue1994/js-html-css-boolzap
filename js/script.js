$(document).ready(function() {

  // quando clicco sulla classe 'send-button' rimuovo l'icona
  // del microfono ed aggiungo l'icona invia e stampo
  // il messaggio
  $('.send-button').click(
    function() {
      $('.send-button i').removeClass('fas fa-microphone');
      $('.send-button i').addClass('fab fa-telegram-plane');
      sendMessage();

    }
  );

  // quando c'è una classe 'write-message input'  e clicco
  // il tasto invia della tastiera,, mostro il messaggio
  $('.write-message input').keydown(
    function(event) {
      if (event.which === 13 || event.keyCode === 13) {
        sendMessage();
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

// funzione che invia messaggio
function sendMessage() {
  var textMessage = $('.write-message input').val();

  if (textMessage != '') {
    // clono il template del messaggio
    var cloneMessage = $('.template .message').clone();
    // al messaggio clonato aggiungo il testo dell'input
    cloneMessage.find('.message-text').text(textMessage);
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
