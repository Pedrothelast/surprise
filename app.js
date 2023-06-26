//----------------------------------------------------------------
function menuShow() {
  let menuMobile = document.querySelector('.mobile-menu');
  if (menuMobile.classList.contains('open')) {
    menuMobile.classList.remove('open');
    menuMobile.classList.add('closing');
  } else {
    menuMobile.classList.add('open');
    menuMobile.classList.remove('closing');
  }
}
function carregarPagina() {
  let objDados = leDados1();
  let objLogin = leDados2();
  if (objLogin.id >= 1) {
    let menu = document.getElementById('menu');
    strHtml = `<div class="menuprincipal">
    <div class="logo-menu">
    <img src="logo.png" alt="logo" width="170px" onclick="window.location.href = 'index.html'">
    </div>
    <div class="lista-menu">
        <ul class="lista-ul">
        <li class="link"><a href="maispopulares.html">MAIS POPULARES</a></li>
        <li class="link"><a href="aboutUs.html">SOBRE NÓS</a></li>
            <li class="link"><a href="perfil.html">PERFIL</a></li>
            <li class="link"><a onclick="sairLogin()">SAIR</a></li>
        </ul>
    </div>
    <div class="mobile-menu-icon">
            <button onclick="menuShow()"><img class="icon" src="menu-icon.png" alt=""></button>
        </div>
        <div class="mobile-menu">
        <ul class="lista-ul">
        <li class="link"><a href="maispopulares.html">MAIS POPULARES</a></li>
        <li class="link"><a href="aboutUs.html">SOBRE NÓS</a></li>
            <li class="link"><a href="perfil.html">PERFIL</a></li>
            <li class="link"><a onclick="sairLogin()">SAIR</a></li>
        </ul>
            </div>
</div>`;
    menu.innerHTML = strHtml;

  }

  else {
    let menu = document.getElementById('menu');
    strHtml = `<div class="menuprincipal">
    <div class="logo-menu">
        <img src="logo.png" alt="logo" width="170px" onclick="window.location.href = 'index.html'">
    </div>
    <div class="lista-menu">
        <ul class="lista-ul">
        <li class="link"><a href="maispopulares.html">MAIS POPULARES</a></li>
            <li class="link"><a href="aboutUs.html">SOBRE NÓS</a></li>
            <li class="link"><a href="cadastro_usuario.html">CADASTRE-SE</a></li>
            <li class="link"><a href="login.html">LOGIN</a></li>
        </ul>
    </div>
    <div class="mobile-menu-icon">
            <button onclick="menuShow()"><img class="icon" src="menu-icon.png" alt=""></button>
        </div>
        <div class="mobile-menu">
        <ul class="lista-ul">
        <li class="link"><a href="maispopulares.html">MAIS POPULARES</a></li>
        <li class="link"><a href="aboutUs.html">SOBRE NÓS</a></li>
        <li class="link"><a href="cadastro_usuario.html">CADASTRE-SE</a></li>
        <li class="link"><a href="login.html">LOGIN</a></li>
        </ul>
            </div>
</div>`;
    menu.innerHTML = strHtml;
  }
}

// Página de Cadastro

//FORMULÁRIO DE CADASTRO
//Para ler os dados inseridos no formulário de cadastro
function leDados1() {
  let strDados = localStorage.getItem('db');
  var objDados = {};

  if (strDados) {

    objDados = JSON.parse(strDados);
  }
  else {
    objDados = {
      cadastros: [
        {
          id: "1",
          imagem: 'perfil.png',
          nome: 'admin',
          username: 'admin',
          email: 'admin@gmail.com',
          data: '2004-03-30',
          senha: 'admin',
          confirme: 'admin'
        },
      ]
    };
    salvaDados(objDados);
  }
  return objDados
}


function salvaDados(dados) {
  localStorage.setItem('db', JSON.stringify(dados));

}

function incluirCadastro() {
  //ler os dados do localstorage
  let objDados = leDados1();


  //incluir um novo contato
  let strid = (objDados.cadastros.length) + 1;
  let strNome = document.getElementById('nome').value;
  let strUsername = document.getElementById('username').value;
  let strEmail = document.getElementById('email').value;
  let strData = document.getElementById('data').value;
  let strSenha = document.getElementById('senha').value;
  let strConfirmarSenha = document.getElementById('confirme').value;


  //condição para verificar se a senha é a mesma
  if (strSenha !== strConfirmarSenha) {
    let msgerro = document.querySelector('#msgerro')
    msgerro.setAttribute('style', 'display:block')
    msgerro.innerHTML = '<strong>As senhas não coincidem!</strong>'
    setTimeout(() => { msgerro.setAttribute('style', 'display:none') }, 3000)
    return;
  }
  else {
    //para aparecer a mensagem de sucesso
    let msgsucesso = document.querySelector('#msgsucesso')
    msgsucesso.setAttribute('style', 'display:block')
    msgsucesso.innerHTML = '<strong>Cadastro efetuado com sucesso!</strong>'
    setTimeout(() => { location.href = "login.html" }, 3000)
    // recarrega a página sem usar o cache do navegador


  }

  //variavel modelo que sera impresso na tela após o cadastro
  let novoCadastro = {
    id: strid,
    imagem: 'perfil.png',
    nome: strNome,
    username: strUsername,
    email: strEmail,
    data: strData,
    senha: strSenha,
    confirme: strConfirmarSenha
  };

  objDados.cadastros.push(novoCadastro);

  //salvar dados no localstorage
  salvaDados(objDados);

  // redireciona o usuário para a página de exibição de dados


  //atualiza
  imprimeDados();

}





//configurando botão de concluir cadastro e ir para a outra página mostrando os resultados



function validarFormulario() {
  // Obtém os valores dos campos do formulário
  let strNome = document.getElementById('nome').value;
  let strUsername = document.getElementById('username').value;
  let strEmail = document.getElementById('email').value;
  let strData = document.getElementById('data').value;
  let strSenha = document.getElementById('senha').value;
  let strConfirmarSenha = document.getElementById('confirme').value;

  // Verifica se todos os campos estão preenchidos
  if (strNome !== "" && strUsername !== "" && strEmail !== "" && strData !== "" && strSenha !== "" && strConfirmarSenha !== "") {
    // Todos os campos estão preenchidos, execute a função desejada
    incluirCadastro();
  } else {
    // Exiba uma mensagem de erro ou tome alguma ação
    let msgfaltainfo = document.querySelector('#msgfaltainfo')
    msgfaltainfo.setAttribute('style', 'display:block')
    msgfaltainfo.innerHTML = '<strong>PREENCHA TODOS OS CAMPOS PARA PROSSEGUIR!</strong>'
    setTimeout(() => { msgfaltainfo.setAttribute('style', 'display:none') }, 2700)
  }
}



//----------------------------------------------------------------


//----------------------------------------------------------------
// Login
function leDados2() {
  let strDados = localStorage.getItem('log');
  var objLogin = {};

  if (strDados) {

    objLogin = JSON.parse(strDados);
  }
  else {
    objLogin = {
      cadastros: [
        {
          id: '',
          username: ''
        },
      ]
    };
    salvarLogin(objLogin);
  }
  return objLogin;
}


function salvarLogin(dados) {
  localStorage.setItem('log', JSON.stringify(dados));

}

function dadosLogin() {
  let objDados = leDados1();
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;

  for (let i = 0; i < objDados.cadastros.length; i++) {
    if (
      ((objDados.cadastros[i].username === username && username !== '') ||
        (objDados.cadastros[i].email === username)) && objDados.cadastros[i].senha === password && password !== '') {
      let msglogin = document.querySelector('#msglogin');
      msglogin.setAttribute('style', 'display:block');
      msglogin.innerHTML = '<strong>Seja bem vindo</strong>';
      setTimeout(() => {
        msglogin.setAttribute('style', 'display:none');
      }, 2700);

      let usuarioSessao = {
        id: objDados.cadastros[i].id,
        username: objDados.cadastros[i].username,
      };
      salvarLogin(usuarioSessao);

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2700);
      return;
    }
  }

  let msgerrologin = document.querySelector('#msgerrologin');
  msgerrologin.setAttribute('style', 'display:block');
  msgerrologin.innerHTML = '<strong>Usuário e/ou senha incorretos!</strong>';
  setTimeout(() => {
    msgerrologin.setAttribute('style', 'display:none');
  }, 2700);
}


// -----------------------------------------------------------------
// FUNÇAO PAGINA INICIAL

// ----------------------------------------------------------------
// Perfil
function mostrarPerfil() {
  let objDados = leDados1();
  let objLogin = leDados2();
  document.getElementById('perfil-nome').value = objDados.cadastros[objLogin.id - 1].nome;
  document.getElementById('perfil-email').value = objDados.cadastros[objLogin.id - 1].email;
  document.getElementById('perfil-username').value = objDados.cadastros[objLogin.id - 1].username;
  document.getElementById('perfil-data').value = objDados.cadastros[objLogin.id - 1].data;

  cadFilmes();
}

function alterarPerfil() {
  let objDados = leDados1();
  let objLogin = leDados2();
  let id = objLogin.id;

  const index = objDados.cadastros.findIndex(cadastros => cadastros.id == id);

  objDados.cadastros[index].nome = document.getElementById('perfil-nome').value;
  objDados.cadastros[index].email = document.getElementById('perfil-email').value;
  objDados.cadastros[index].username = document.getElementById('perfil-username').value;
  objDados.cadastros[index].data = document.getElementById('perfil-data').value;

  localStorage.setItem('db', JSON.stringify(objDados));

  let msgAlteracao = document.querySelector('#msgAlteracao');
  msgAlteracao.setAttribute('style', 'display:block');
  msgAlteracao.innerHTML = '<strong>Alterado com sucesso!</strong>';
  setTimeout(() => {
    msgAlteracao.setAttribute('style', 'display:none');
  }, 2700);
}

function sairLogin() {
  let objLogin = leDados2();

  objLogin.id = '';
  objLogin.username = '';

  localStorage.setItem('log', JSON.stringify(objLogin));
  window.location.href = 'index.html'

}

function excluirCadastro(indice) {
  let objDados = leDados1();
  let objLogin = leDados2();

  objDados.cadastros.splice(objLogin.id - 1, 1);
  salvaDados(objDados);
  window.location.href = 'index.html';
}

function cadFilmes() {
  let user = document.getElementById('perfil-username').value;
  let botao = document.getElementById('btn-cadFilmes');
  let botaoDados = document.getElementById('btn-users-tb');
  if (user === 'admin') {
    botao.setAttribute('style', 'display:block');
    botaoDados.setAttribute('style', 'display:block');
  }
}
//----------------------------------------------------------------

//Cadastro de Filmes
function lerDados() {
  let strDados = localStorage.getItem('cad');
  let objDados = {};

  if (strDados) {
    objDados = JSON.parse(strDados);
  } else {
    objDados = {
      filmes: [
        {
          id: '1',
          img: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/89/43/82/20052140.jpg",
          name: "The Avengers",
          sinopse: "Loki (Tom Hiddleston) retorna à Terra enviado pelos chitauri, uma raça alienígena que pretende dominar os humanos. Com a promessa de que será o soberano do planeta, ele rouba o cubo cósmico dentro de instalações da S.H.I.E.L.D. e, com isso, adquire grandes poderes. Loki os usa para controlar o dr. Erik Selvig (Stellan Skarsgard) e Clint Barton/Gavião Arqueiro (Jeremy Renner), que passam a trabalhar para ele. No intuito de contê-los, Nick Fury (Samuel L. Jackson) convoca um grupo de pessoas com grandes habilidades, mas que jamais haviam trabalhado juntas: Tony Stark/Homem de Ferro (Robert Downey Jr.), Steve Rogers/Capitão América (Chris Evans), Thor (Chris Hemsworth), Bruce Banner/Hulk (Mark Ruffalo) e Natasha Romanoff/Viúva Negra (Scarlett Johansson). Só que, apesar do grande perigo que a Terra corre, não é tão simples assim conter o ego e os interesses de cada um deles para que possam agir em grupo.",
          ano: "2012",
          tempo: "2h 23min",
          categoria: "Ação, Aventura, Ficção científica",
          tags: ["herois", "super-poderes", "Marvel", "Engraçado"],
          direcao: "Joss Whedon",
          elenco: "Robert Downey Jr., Chris Evans, Mark Ruffalo",
          visualizacao: 0,
          avaliacoes: 1,
          like: 1
        },
        {
          id: '2',
          img: "https://br.web.img3.acsta.net/c_310_420/pictures/15/02/24/18/27/528824.jpg",
          name: "The Avengers 2",
          sinopse: "Tentanto proteger o planeta de ameaças como as vistas no primeiro Os Vingadores, Tony Stark busca construir um sistema de inteligência artifical que cuidaria da paz mundial. O projeto acaba dando errado e gera o nascimento do Ultron (voz de James Spader). Capitão América (Chris Evans), Homem de Ferro (Robert Downey Jr.), Thor (Chris Hemsworth), Hulk (Mark Ruffalo), Viúva Negra (Scarlett Johansson) e Gavião Arqueiro (Jeremy Renner) terão que se unir para mais uma vez salvar o dia.",
          ano: "2015",
          tempo: "2h 21min",
          categoria: "Ação, Aventura, Ficção científica",
          tags: ["herois", "super-poderes", "Marvel", "Robos", "reviravoltas"],
          direcao: "Joss Whedon",
          elenco: "Robert Downey Jr., Chris Evans, Mark Ruffalo",
          visualizacao: 0,
          avaliacoes: 1,
          like: 1
        },
        {
          id: '3',
          img: "https://br.web.img3.acsta.net/c_310_420/pictures/18/03/16/15/08/2019826.jpg",
          name: "The Avengers 3",
          sinopse: "Em Vingadores: Guerra Infinita, Thanos (Josh Brolin) enfim chega à Terra, disposto a reunir as Joias do Infinito. Para enfrentá-lo, os Vingadores precisam unir forças com os Guardiões da Galáxia, ao mesmo tempo em que lidam com desavenças entre alguns de seus integrantes.",
          ano: "2018",
          tempo: "2h 36min",
          categoria: "Ação, Aventura, Ficção científica",
          tags: ["herois", "super-poderes", "Marvel", "Engraçado"],
          direcao: "Joe Russo, Anthony Russo",
          elenco: "Robert Downey Jr., Chris Evans, Mark Ruffalo",
          visualizacao: 0,
          avaliacoes: 1,
          like: 1
        }]

    }


  }
  return objDados;
}

function salvarDados(dados) {
  localStorage.setItem('cad', JSON.stringify(dados));


}

function incluirFilme() {
  //ler os dados do localstorage
  let objDados = lerDados();

  //incluir novo filme
  let id = (objDados.filmes.length) + 1;
  let img = document.getElementById('filmeImg').value;
  let nome = document.getElementById('filmeName').value;
  let sinopse = document.getElementById('filmeSinopse').value;
  let ano = document.getElementById('filmeAno').value;
  let tempo = document.getElementById('filmeTempo').value;
  let categoria = document.getElementById('filmeCategoria').value;
  let tags = document.getElementById('filmeTag').value.split(',');
  let direcao = document.getElementById('filmeDirecao').value;
  let elenco = document.getElementById('filmeElenco').value;
  let visualizacao = 0;

  let novoFilme = {
    id: id,
    img: img,
    name: nome,
    sinopse: sinopse,
    ano: ano,
    tempo: tempo,
    categoria: categoria,
    tags: tags,
    direcao: direcao,
    elenco: elenco,
    visualizacao: visualizacao
  };

  objDados.filmes.push(novoFilme);

  //Salvar os dados no localstorage novamente

  salvarDados(objDados);

  // atualiza lista

  imprimirDados();
}

function imprimirDados() {
  let tela = document.getElementById('tela');
  let strHtml = '';
  let objDados = lerDados();

  for (i = 0; i < objDados.filmes.length; i++) {
    strHtml += `<div class="filmes">
      <div class="title-img">
      <h2 style="text-transform: uppercase; width:208px"><strong>${objDados.filmes[i].name}</strong></h2><br>
      <img class="capa" src="${objDados.filmes[i].img}">
      </div>
      <div class=" info-filmes">
      <p>
        <strong>Sinopse:</strong> ${objDados.filmes[i].sinopse}<br>
        <strong>Ano:</strong> ${objDados.filmes[i].ano}<br>
        <strong>Tempo:</strong> ${objDados.filmes[i].tempo}<br>
        <strong>Categoria:</strong> ${objDados.filmes[i].categoria}<br>
        <strong>Tags:</strong> ${objDados.filmes[i].tags.join(", ")}<br>
        <strong>Direção:</strong> ${objDados.filmes[i].direcao}<br>
        <strong>Elenco:</strong> ${objDados.filmes[i].elenco}
        </p>
        </div>
        </div>`;
  } objDados.filmes[i]

  tela.innerHTML = strHtml;

  // Attach click event listeners to movie elements
  let filmes = document.getElementsByClassName('filmes');
  for (let j = 0; j < filmes.length; j++) {
    filmes[j].addEventListener('click', function () {
      let selectedFilme = objDados.filmes[j];

      // Populate form inputs with selected movie details
      document.getElementById('filmeId').value = selectedFilme.id;
      document.getElementById('filmeImg').value = selectedFilme.img;
      document.getElementById('filmeName').value = selectedFilme.name;
      document.getElementById('filmeSinopse').value = selectedFilme.sinopse;
      document.getElementById('filmeAno').value = selectedFilme.ano;
      document.getElementById('filmeTempo').value = selectedFilme.tempo;
      document.getElementById('filmeCategoria').value = selectedFilme.categoria;
      document.getElementById('filmeTag').value = selectedFilme.tags.join(', ');
      document.getElementById('filmeDirecao').value = selectedFilme.direcao;
      document.getElementById('filmeElenco').value = selectedFilme.elenco;
    });
  }

}

//pesquisa dos filmes
function buscarFilmesPorTags(tags) {
  let objDados = lerDados();

  if (objDados && objDados.filmes && Array.isArray(objDados.filmes)) {
    const tagsArray = tags.split(',').map(tag => tag.trim().toLowerCase());
    const filmesEncontrados = objDados.filmes.filter(filme => {
      const filmeTags = filme.tags || [];
      const filmeTagsLowerCase = filmeTags.map(tag => tag.toLowerCase());

      return tagsArray.some(tag => filmeTagsLowerCase.includes(tag));
    });

    return filmesEncontrados;
  }

  return [];


}
// Adicionar evento de clique ao botão "Limpar Tags"
document.getElementById('limparTags').addEventListener('click', function () {
  document.getElementById('tagsBusca').value = '';
});


/*function buscarFilmesPorTags(tags) {
  let objDados = lerDados();
  let filmesEncontrados = [];
  let tagsBusca = tags.split(",").map(tag => tag.trim());
  let maxTagsEncontradas = 0;

  objDados.filmes.forEach(filme => {
    let tagsFilme = filme.tags.filter(tag => tagsBusca.includes(tag));
    if (tagsFilme.length > maxTagsEncontradas) {
      filmesEncontrados = [filme];
      maxTagsEncontradas = tagsFilme.length;
    } else if (tagsFilme.length === maxTagsEncontradas) {
      filmesEncontrados.push(filme);
    }
  });

  return filmesEncontrados;
}*/
function exibirResultados(filmes) {
  let tela = document.getElementById('telas');
  let strHtml = '';
  let objDados = lerDados();

  filmes.forEach(filme => {
    strHtml += `<div class="filmes" onclick="window.location.href='resultado.html?query=${filme.id}'">
      <div class="title-img">
      <h2 style="text-transform: uppercase; width:208px"><strong>${filme.name}</strong></h2><br>
      <img class="capa" src="${filme.img}">
      </div>
      <div class=" info-filmes">
      <p>
        <strong style="color:black">Sinopse:</strong> ${filme.sinopse.length > 20 ? filme.sinopse.substring(0, 300).concat('...') : filme.sinopse}<br>
        
        <strong style="color:black">Ano:</strong> ${filme.ano}<br>
        <strong style="color:black">Tempo:</strong> ${filme.tempo}<br>
        <strong style="color:black">Categoria:</strong> ${filme.categoria}<br>
        <strong style="color:black">Tags:</strong> ${filme.tags.join(", ")}<br>
        <strong style="color:black">Direção:</strong> ${filme.direcao}<br>
        <strong style="color:black">Elenco:</strong> ${filme.elenco}
        </p>
        </div>
        </div>`;
    for (i = 0; i < objDados.filmes.length; i++) {
      if (filme.name == objDados.filmes[i].name) {
        objDados.filmes[i].visualizacao++;
      }
    }


  }
  );

  salvarDados(objDados);
  tela.innerHTML = strHtml;
}

function buscarFilmesPorVisualizacoes() {
  let objDados = lerDados();

  if (objDados && objDados.filmes && Array.isArray(objDados.filmes)) {
    const filmesOrdenados = objDados.filmes.sort((a, b) => b.visualizacao - a.visualizacao);
    return filmesOrdenados;
  }

  return [];
}

function exibirResultadosV(filmes) {
  let tela = document.getElementById('telas2');
  let strHtml = '';

  filmes.forEach(filme => {
    strHtml += `
    <img class="capa" src="${filme.img}">
    <p>
      Nome: ${filme.name}<br>
      Sinopse: ${filme.sinopse}<br>
      Ano: ${filme.ano}<br>
      Tempo: ${filme.tempo}<br>
      Categoria: ${filme.categoria}<br>
      Tags: ${filme.tags.join(", ")}<br>
      Direção: ${filme.direcao}<br>
      Elenco: ${filme.elenco}<br>
      Visualizações: ${filme.visualizacao}
    </p>`;
  });

  tela.innerHTML = strHtml;
}

function apagarFilmePorId() {
  let id = document.getElementById("filmeId").value;
  apagarFilme(parseInt(id));
}


function apagarFilme(indice) {
  let objDados = lerDados();
  indice--;
  if (indice < 0 || indice >= objDados.filmes.length) {
    alert.console.log("erro");
    return;
  }

  // Remova o filme do array
  objDados.filmes.splice(indice, 1);

  // Salve os dados atualizados
  salvarDados(objDados);

  // Atualize a exibição dos filmes
  imprimirDados();
}

function editarFilme() {
  let objDados = lerDados();

  const id = document.getElementById('filmeId').value;
  const indice = objDados.filmes.findIndex(filme => filme.id == id);

  if (indice < 0 || indice >= objDados.filmes.length) {
    alert.console.log("erro");
    return;
  }

  objDados.filmes[indice].img = document.getElementById('filmeImg').value;
  objDados.filmes[indice].name = document.getElementById('filmeName').value;
  objDados.filmes[indice].sinopse = document.getElementById('filmeSinopse').value;
  objDados.filmes[indice].ano = document.getElementById('filmeAno').value;
  objDados.filmes[indice].tempo = document.getElementById('filmeTempo').value;
  objDados.filmes[indice].categoria = document.getElementById('filmeCategoria').value;
  objDados.filmes[indice].tags = document.getElementById('filmeTag').value.split(',');
  objDados.filmes[indice].direcao = document.getElementById('filmeDirecao').value;
  objDados.filmes[indice].elenco = document.getElementById('filmeElenco').value;

  salvarDados(objDados);

  imprimirDados();
}


// configurando botoes


