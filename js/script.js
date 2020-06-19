$(document).ready(function() {

  // quando clicco sulla classe 'send-button' stampo il messaggio
  $('.send-button').click(
    function() {
      sendMessage();
    }
  );

  // al click del tasto invia sull'unput, mostro il messaggio
  $('.write-message input').keydown(
    function(event) {
      if (event.which === 13 || event.keyCode === 13) {
        sendMessage();
      }
    }
  );

  // quando clicco sull'input rimuovo l'icona
  // microfono ed aggiungo l'icona invia
  $('.write-message input').focus (
    function() {
      $('.send-button i').removeClass('fas fa-microphone');
      $('.send-button i').addClass('fab fa-telegram-plane');
    }
  );
  // quando clicco su qualsiasi parte della pagina rimuovo l'icona
  // invia ed aggiungo l'icona del microfono
  $('.write-message input').blur (
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

  // al click mostro una dropdown per ogni chat
  $(document).on('click', '.chat-info i',
    function() {

      // ottengo il fratello successivo di 'message-info'
      var dropdownInfo = $(this).next('.dropdown');
      // se non è il fratello successivo nascondo la dropdown
      $('.dropdown').not(dropdownInfo).addClass('hidden');
      // se è quello successivo la mostro
      dropdownInfo.toggleClass('hidden');

    }
  );

  // quando clicco su qualsiasi parte della pagina rimuovo l'icona
  // invia ed aggiungo l'icona del microfono
  $('.wrapper').click (
    function() {
      $('.dropdown').addClass('hidden');
    }
  );

  // al click elimino il messaggio
  $(document).on('click', '.delete-message',
    function() {
      $(this).parents('.message').remove();
    }
  );

  // al click elimino la chat
  $(document).on('click', '.chat-info .delete-message',
    function() {
      $(this).parents('.container').children('main').find('.chat-messages.visible .message').remove();
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

    // quando clicco su un contatto cambio l'immagine del profilo e il nome della chat
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


    // se il contatto nella lista non è quello selezionato rimuovo la classe 'active'
    $('.chat-contact').not($(this)).removeClass('active');
    // se è quello selezionato la aggiungo
    $(this).addClass('active');


    // ottengo il nome dell'attributo di un contatto nella lista
    var currentContact = $(this).attr("data-contact");
    // ottengo la chat selezionata
    var currentChat = '.chat-messages[data-chat="' + currentContact + '"]';

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
