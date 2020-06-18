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

  // al click mostro una dropdown per ogni messaggio
  $(document).on('click', '.message .message-info',
    function() {

      // ottengo il fratello successivo di 'message-info'
      var currentDropdown = $(this).next('.dropdown');
      // se non è il fratello successivo nascondo la dropdown
      $('.dropdown').not(currentDropdown).addClass('hidden');
      // se è quello successivo la mostro
      currentDropdown.toggleClass('hidden');

    }
  );

  // al click elimino il messaggio
  $(document).on('click', '.delete-message',
    function() {
      $(this).parents('.message').remove();
    }
  );


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

  // mostra chat selezionata
  $(document).on('click', '.chat-contact', function() {

    // ottengo l'attributo di un immagine della chat
    var profilePictureContact = $(this).find('img').attr('src');
    // ottengo l'immagine del contatto
    var profilePictureNav = $('.nav-chat .profile-picture').children('img');
    // cambio il valore dell'attributo
    profilePictureNav.attr('src', profilePictureContact);

    // ottengo il nome leggendolo
    var nameContact = $(this).find('.name').text();
    // ottengo il nome da cambiare
    var nameToChange = $('.nav-chat .text').children('.name');
    // cambio il nome
    nameToChange.text(nameContact);

    // ottengo il valore di un solo 'chat-contact'
    var chatContact = $(this);

    // ottengo il nome dell'attributo di 'chat-contact'
    var currentContact = $(this).attr("data-contact");
    // ottengo la chat selezionata
    var currentChat = '.chat-messages[data-chat="' + currentContact + '"]';

    // se il 'chat-contact non è quello selezionato rimuovo la classe 'active
    $('.chat-contact').not(chatContact).removeClass('active');
    // se è quello selezionato la aggiungo
    chatContact.addClass('active');

    // rimuovo la classe 'visible'
    $('.chat-messages').removeClass('visible');
    // aggiungo la classe 'visible'
    $(currentChat).addClass('visible');

  });

  var lastAccess = $('.last-access');

  var date = new Date();
  var currentHours = date.getHours();
  var currentMinutes = date.getMinutes();
  var currentTime = addZeroToNumero(currentHours) + ':' + addZeroToNumero(currentMinutes);

  lastAccess.text(currentTime);

});

////////// FUNZIONI //////////

// FUNZIONE INVIO DEL MESSAGGIO
function sendMessage() {
  var textMessage = $('.write-message input').val();

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
  $('.chat-messages.visible').append(cloneMessage);

  // una volta inviato l'input ritorna vuota
  $('.write-message input').val('');

  // scrolal alla fine della finestra
  $('.chat-messages.visible').scrollTop($('.chat-messages.visible').prop('scrollHeight'));

  setTimeout(receiveMessage, 1000);
}


// FUNZIONE MESSAGGIO DI RISPOSTA
function receiveMessage () {

  // clono il template del messaggio
  var cloneMessage = $('.template .message').clone();
  // al messaggio clonato aggiungo un testo
  cloneMessage.children('.message-text').text('Ciao :)');
  // aggiungo la classe 'received-message'
  cloneMessage.addClass('received-message');

  // inserire la data una volta inviato il messaggio
  var date = new Date();
  var currentHours = date.getHours();
  var currentMinutes = date.getMinutes();
  var currentTime = addZeroToNumero(currentHours) + ':' + addZeroToNumero(currentMinutes);

  cloneMessage.children('.message-time').text(currentTime);

  // alla chat appendo il messaggio clonato
  $('.chat-messages.visible').append(cloneMessage);

  // scrolal alla fine della finestra
  $('.chat-messages.visible').scrollTop($('.chat-messages.visible').prop('scrollHeight'));
}

// FUNZIONE RITORNA UN NUMERO CON LO 0 D'AVANTI SE È MINORE DI 10
function addZeroToNumero(number) {
  if (number < 10) {
    return '0' + number;
  }

  return number;
}
