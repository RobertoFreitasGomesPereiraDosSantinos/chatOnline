$(function () {
  const socket = io();
  let nick;

  socket.on('login', function(nome) {
    nick = nome;
  });

  $('#hist').on('click', function() {
    $("#historico_mensagens").empty();
    socket.emit('historico', nick);
    $('#hist').hide();
  });

  $("#form").submit(function (evt) {
    let msg = $("#msg").val();
    if (!msg == '') {
      socket.emit("chat", msg);
      $("#msg").val("");
      return false;
    } else {
      return false;
    }
  });

  socket.on("chat", function (dado) {
    let neo_msg = $("<p />").text(dado.msg).addClass(dado.tipo);
    $("#historico_mensagens").append(neo_msg);
  });
});
