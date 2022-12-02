const express = require("express");
const fs = require("fs");
const app = express();
const http = require("http").Server(app);
const serv_sockt = require("socket.io")(http);
const porta = process.env.PORT || 3300;
//------------------------------------
let historico = [];
let usuarios = [];
let ID;
let NOME;

app.use(express.static("publico"));

http.listen(porta, function () {
  console.log("deu certo");
});

app.get("/", function (req, resp) {
  ID = req.query.id;
  NOME = req.query.nome;
  fs.readFile(__dirname + "/chat.html", function (err, data) {
    if (err) {
      return resp.end("falha ao carregar arquivo");
    }
    resp.end(data);
  });
});

serv_sockt.on("connection", function (socket) {
  usuarios[NOME] = {sckt: socket, id: ID}
  socket.id = ID;
  socket.nickname = NOME;
  socket.emit('login', NOME);
  const msg_form = {
    msg: `[${pegarDataAtual()}]${NOME} está online`,
    id: socket.id,
    tipo: "sistema",
  };
  _saveMsg_(msg_form);
  for (const key in usuarios) {
    if (usuarios[key].id == socket.id) {
      usuarios[key].sckt.emit('chat', msg_form);
    }
  }

  socket.on('historico', function(nom) {
    historico.forEach(function(valor) {
      if (valor.id == socket.id) {
        usuarios[nom].sckt.emit('chat', valor);
      }
    });
  });

  socket.on("chat", function (msg) {
    msg = `[${socket.nickname} ${pegarDataAtual()}]: ${msg}`;
      const msg_form = {
        msg: msg,
        id: socket.id,
        tipo: ''
      };
      _saveMsg_(msg_form);
      for (const key in usuarios) {
        if (usuarios[key].id == socket.id) {
          usuarios[key].sckt.emit('chat', msg_form);
        }
      }
  });

  socket.on("disconnect", function () {
    delete usuarios[socket.nickname];
    NOME = null;
    ID = null;
    const msg_form = {
      msg: `[${pegarDataAtual()}]${socket.nickname} está offline`,
      id: socket.id,
      tipo: "sistema",
    };
    _saveMsg_(msg_form);
    for (const key in usuarios) {
      if (usuarios[key].id == socket.id) {
        usuarios[key].sckt.emit('chat', msg_form);
      }
    }
  });
});

function pegarDataAtual() {
  var dataAtual = new Date();
  var hora = (dataAtual.getHours() < 10 ? "0" : "") + dataAtual.getHours();
  var minuto =
    (dataAtual.getMinutes() < 10 ? "0" : "") + dataAtual.getMinutes();
  var dataFormatada = hora + ":" + minuto;
  return dataFormatada;
}

_saveMsg_ = (neo_msg) => {historico.push(neo_msg);};