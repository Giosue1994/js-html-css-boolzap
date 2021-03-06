$(document).ready(function() {

  //////////////////////////////////////////////////////////////////////
  // ora corrente ultimo accesso
  var lastAccess = $('.last-access');
  lastAccess.text(currentTime());

  //////////////////////////////////////////////////////////////////////
  // quando clicco sulla classe 'send-button' stampo il messaggio
  $('.send-button').click(
    function() {
      sendMessage();
      timeResponse()
    }
  );

  //////////////////////////////////////////////////////////////////////
  // al click del tasto invia sull'unput, mostro il messaggio
  $('.write-message input').keydown(
    function(event) {
      if (event.which === 13 || event.keyCode === 13) {
        sendMessage();
        timeResponse();
      }

    }
  );

  //////////////////////////////////////////////////////////////////////
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

  //////////////////////////////////////////////////////////////////////
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

  //////////////////////////////////////////////////////////////////////
  // al click mostro una dropdown per ogni messaggio
  $(document).on('click', '.contact-info',
    function() {

      // ottengo il fratello successivo di 'message-info'
      var currentDropdown = $(this).next('.dropdown');
      // se non è il fratello successivo nascondo la dropdown
      $('.dropdown').not(currentDropdown).addClass('hidden');
      // se è quello successivo la mostro
      currentDropdown.toggleClass('hidden');

    }
  );

  //////////////////////////////////////////////////////////////////////
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

  //////////////////////////////////////////////////////////////////////
  // quando clicco su qualsiasi parte della pagina rimuovo l'icona
  // invia ed aggiungo l'icona del microfono
  $('.wrapper').click (
    function() {
      $('.dropdown').addClass('hidden');
    }
  );

  //////////////////////////////////////////////////////////////////////
  // al click elimino il messaggio
  $(document).on('click', '.delete-message',
    function() {
      $(this).parents('.message').remove();

    }
  );

  //////////////////////////////////////////////////////////////////////
  // al click elimino i messaggi della chat
  $(document).on('click', '.chat-info .delete-messages',
    function() {
      $(this).parents('.container').children('main').find('.chat-messages.visible .message').remove();
    }
  );

  //////////////////////////////////////////////////////////////////////
  // al click elimino la chat
  $(document).on('click', '.delete-chat',
    function() {
      $(this).parents('.chat-contact').remove();
      $('.chat-messages.visible').remove();
    }
  );

  $(document).on('click', '.nav-chat .delete-chat',
    function() {
      $(this).parents('.container').children('main').find('.chat-contact.active').remove();
      $('.chat-messages.visible').remove();
    }
  );

  //////////////////////////////////////////////////////////////////////
  // al click segno un messaggio come importante
  $(document).on('click', '.message.active .special',
    function() {
      $(this).parents('.container').children('main').find('.message.active .message-special').toggleClass('visible');

      if ($('.message-special').hasClass('visible')) {
        $(this).text('Messaggio non importante');
      } else {
        $(this).text('Messaggio importante');
      }
    }
  );


  //////////////////////////////////////////////////////////////////////
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

  //////////////////////////////////////////////////////////////////////
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

    // rimuovo la classe 'visible'
    $('.chat-contact .description').removeClass('visible');
    // aggiungo la classe 'visible'
    $(this).find('.description').addClass('visible');

    // rimuovo la classe 'visible'
    $('.chat-contact .last-message-hour').removeClass('visible');
    // aggiungo la classe 'visible'
    $(this).find('.last-message-hour').addClass('visible');

  });

});


////////// FUNZIONI //////////
//////////////////////////////////////////////////////////////////////

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


  // inserire l'ora una volta inviato il messaggio
  currentTime();
  cloneMessage.children('.message-time').text(currentTime);


  // alla chat appendo il messaggio clonato
  $('.chat-messages.visible').append(cloneMessage);

  // una volta inviato l'input ritorna vuota
  $('.write-message input').val('');

  // scrolla alla fine della finestra
  $('.chat-messages.visible').scrollTop($('.chat-messages.visible').prop('scrollHeight'));


}

//////////////////////////////////////////////////////////////////////
// FUNZIONE MESSAGGIO DI RISPOSTA
function receiveMessage () {

  // clono il template del messaggio
  var cloneMessage = $('.template .message').clone();
  // al messaggio clonato aggiungo un testo
  cloneMessage.children('.message-text').text(randomMessage());
  // aggiungo la classe 'received-message'
  cloneMessage.addClass('received-message');

  // il messaggio ricevuto verrà mostrato nella lista contatti
  var newAnswer = cloneMessage.children('.message-text').text();
  var answer = $('.container').children('main').find('.text .description.visible');
  answer.text(newAnswer);

  // inserire l'ora una volta ricevuto il messaggio
  cloneMessage.children('.message-time').text(currentTime());

  // ora corrente ultimo messaggio
  var lastMessage = $('.last-message-hour.visible');
  lastMessage.text(currentTime());

  // alla chat appendo il messaggio clonato
  $('.chat-messages.visible').append(cloneMessage);

  // scrolla alla fine della finestra
  $('.chat-messages.visible').scrollTop($('.chat-messages.visible').prop('scrollHeight'));

  // contatto online una volta ricevuto il messaggio
  var typing = $('.nav-chat .description').text('Online');
}

//////////////////////////////////////////////////////////////////////
// FUNZIONE TEMPO RICEZIONE MESSAGGIO
function timeResponse() {
  // compare la scritta 'sta scrivendo...' quando il messaggio sta per essere ricevuto
  setTimeout(function() {
    var typing = $('.nav-chat .description').text('Sta scrivendo...');

    // tempo di ricezione del messaggio
    setTimeout(receiveMessage, getRandomIntInclusive(1000, 10000));

  },getRandomIntInclusive(1000, 3000));

}

//////////////////////////////////////////////////////////////////////
// FUNZIONE ORA CORRENTE
function currentTime() {

  var date = new Date();
  var currentHours = date.getHours();
  var currentMinutes = date.getMinutes();
  var currentTime = addZeroToNumero(currentHours) + ':' + addZeroToNumero(currentMinutes);

  return currentTime;
}

//////////////////////////////////////////////////////////////////////
// FUNZIONE RITORNA UN NUMERO CON LO 0 D'AVANTI SE È MINORE DI 10
function addZeroToNumero(number) {
  if (number < 10) {
    return '0' + number;
  }

  return number;
}

//////////////////////////////////////////////////////////////////////
// FUNZIONE CHE GENERA NUMERO RANDOM
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//////////////////////////////////////////////////////////////////////
// FUNZIONE CHE GENERA UN MESAGGIO CASUALE
function randomMessage() {
  var listMessage = [
    'Che bello risentirti',
    'Ehi come va?',
    'Ciao!',
    'Grazie',
    'Ok',
    ':D',
    'Tu?',
    'Va bene',
    'Che bello',
    'Molto bene',
    'Lo scienziato non è l’uomo che fornisce le vere risposte; è quello che pone le vere domande.',
    'Da qualche parte, qualcosa di incredibile è in attesa di essere scoperto.',
    'La Natura compone alcune delle sue poesie più belle davanti al microscopio e al telescopio.',
    'La più bella e profonda emozione che possiamo provare è il senso del mistero; sta qui il seme di ogni arte, di ogni vera scienza.',
    'Milioni di persone hanno visto la caduta della mela, ma Newton è stato colui che ha chiesto “perché”.',
    'Se qualcosa non può essere espresso in numeri non è scienza: è opinione.',
    'Le verità scientifiche non si decidono a maggioranza.',
    'La scienza è ricerca della verità. Ma la verità non è verità certa.',
    'L’ignoranza afferma o nega rotondamente; la scienza dubita.',
    'La scienza è il grande antidoto contro il veleno dell’entusiasmo e della superstizione.'
  ];

  return listMessage[getRandomIntInclusive(0, listMessage.length)];
}
