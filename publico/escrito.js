$(function () {
  const socket = io();
  /*
  daqui faz o evento de login pegando o value de do input
  contendo o nome do usuario e o id do projeto
  */
  $("#login").submit(function (evt) {
    let apld = $("#apelido").val();
    const ID = $("#id").val();
    socket.emit("login", {nick: apld, id: ID}, function (valido) {
      if (valido) {
        $("#acesso_usuario").hide();
        $("#sala_chat").show();
      } else {
        $("#acesso_usuario").val("");
        alert("Nome já utilizado nesta sala");
      }
    });
    return false;
  });
  $("#form").submit(function (evt) {
    let msg = $("#msg").val();
    socket.emit("chat", msg);
    $("#msg").val("");
    return false;
  });

  socket.on("chat", function (dado) {
    let neo_msg = $("<p />").text(dado.msg).addClass(dado.tipo);
    $("#historico_mensagens").append(neo_msg);
  });

  socket.on("atualizar usuarios", function (usuarios) {
    if (!usuarios.length) {
      $("#historico_mensagens").empty();
    }
    $("#lista_usuarios").empty();
    $("#lista_usuarios").append("<option value=''>Todos</option>");
    usuarios.forEach(function (nomes) {
      let opcao_usuario = $("<option />").text(nomes);
      $("#lista_usuarios").append(opcao_usuario);
    });
  });
});
