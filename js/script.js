$(document).ready(function() {

  $('.write-message input').click(
    function() {
      $('.send i').removeClass('fas fa-microphone');
      $('.send i').addClass('fab fa-telegram-plane');
    }
  );

  $('.send').click(
    function() {
      $('.send i').removeClass('fab fa-telegram-plane');
      $('.send i').addClass('fas fa-microphone');
      var nuovoMessaggio = $('.write-message input').val();
      inviaMessaggio(nuovoMessaggio);
    }
  );

  $('.write-message input').keydown(
    function(event) {
      if (event.which === 13 || event.keyCode === 13) {
        var nuovoMessaggio = $('.write-message input').val();
        inviaMessaggio(nuovoMessaggio);
      }
    }
  );

});

// funzione che aggiunge elementi clonandoli
function inviaMessaggio(testoDaAggiungere) {
  var cloneLiTemplate = $('.template li').clone();
  cloneLiTemplate.prepend(testoDaAggiungere);
  $('#chat ul').append(cloneLiTemplate);
  $('.write-message input').val('');
}
