<!DOCTYPE html>
<html>

<head>
    <title>Chat online</title>
    <link rel="stylesheet" type="text/css" href="estilo.css" />
    <script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="/socket.io/socket.io.js"></script>
    <script src="escrito.js"></script>
</head>

<body>
    <!-- fazendo um input invisivel ou com 'disabled' e
    colocando um 'value' nele que vai ser o nome do
    usuario e tambem o nome do projeto -->
    <div id='acesso_usuario'>
        <form id="login">
            <input type='text' placeholder='Insira seu apelido' name='apelido' id='apelido'>
            <input type='number' placeholder='Insira seu ID' name='id' id='id'>
            <input type='submit' value='Entrar'>
        </form>
    </div>
    <div id="sala_chat">
        <select multiple="multiple" id='lista_usuarios'>
            <option value=''>Usuarios Conectados:</option>
        </select>
        <div id="historico_mensagens"></div>
        <form id="form" autocomplete="off">
            <input type='text' id='msg' name='texto_mensagem'>
            <input type='submit' value='Enviar mensagem!'>
        </form>
    </div>
</body>

</html>