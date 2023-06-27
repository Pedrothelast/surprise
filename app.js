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
    <img src="./assets/logo.png" alt="logo" width="170px" onclick="window.location.href = 'index.html'">
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
            <button onclick="menuShow()"><img class="icon" src="./assets/menu-icon.png" alt=""></button>
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
        <img src="./assets/logo.png" alt="logo" width="170px" onclick="window.location.href = 'index.html'">
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
            <button onclick="menuShow()"><img class="icon" src="./assets/menu-icon.png" alt=""></button>
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
        },
        {
          id: '4',
          img: "https://br.web.img2.acsta.net/c_310_420/pictures/14/06/03/21/11/122582.jpg",
          name: "Guardiões da Galáxia",
          sinopse: "Em uma Terra alternativa do século XXXI, o aventureiro espacial Peter Quill (Chris Pratt) se torna alvo de caçadores de recompensas depois de roubar uma esfera cobiçada por Ronan, um vilão poderoso. Para escapar do perigo, ele se une a um grupo de desajustados - Rocket, um guaxinim falante, Groot, uma árvore humanoide, Gamora, a filha adotiva de Thanos, e Drax, o Destruidor. Juntos, eles se tornam os Guardiões da Galáxia e embarcam em uma jornada para salvar o universo.",
          ano: "2014",
          tempo: "2h 1min",
          categoria: "Ação, Aventura, Ficção científica",
          tags: ["espacial", "humor", "marvel", "espaço", "guerra", "galaxia", "herois", "universo", "comedia"],
          direcao: "James Gunn",
          elenco: "Chris Pratt, Zoe Saldana, Dave Bautista",
          visualizacao: 1,
          avaliacoes: 1,
          like: 1
        },
        {
          id: '5',
          img: "https://br.web.img3.acsta.net/c_310_420/pictures/17/12/07/16/09/2291532.jpg",
          name: "Pantera Negra",
          sinopse: "Após a morte de seu pai, o jovem rei T'Challa retorna para Wakanda, um país africano tecnologicamente avançado e isolado do mundo. Lá, ele assume o trono e se torna o Pantera Negra, herói conhecido como o protetor da nação. Mas sua liderança é desafiada por um antigo inimigo que ameaça destruir Wakanda e espalhar o caos para o resto do mundo.",
          ano: "2018",
          tempo: "2h 14min",
          categoria: "Ação, Aventura, Ficção científica",
          tags: ["herois", "afrofuturismo", "marvel", "cultura afro", "pretos", "afro", "tecnologia", "fantasia", "ação"],
          direcao: "Ryan Coogler",
          elenco: "Chadwick Boseman, Michael B. Jordan, Lupita Nyong'o",
          visualizacao: 1,
          avaliacoes: 1,
          like: 1
        },
        {
          id: '6',
          img: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/92/08/07/20488996.jpg",
          name: "Homem de Ferro",
          sinopse: "Tony Stark (Robert Downey Jr.) é um brilhante inventor e empresário bilionário que é sequestrado por um grupo de terroristas. Eles o forçam a construir uma arma de destruição em massa, mas, em vez disso, ele constrói uma armadura de alta tecnologia e escapa. Mais tarde, ele aprimora a armadura e se torna o Homem de Ferro, dedicando-se a proteger o mundo como um super-herói.",
          ano: "2008",
          tempo: "2h 6min",
          categoria: "Ação, Aventura, Ficção científica",
          tags: ["tecnologia", "herois", "marvel", "armadura", "ação", "bilionários", "heroi", "inteligência artificial", "futurista", "arrogante"],
          direcao: "Jon Favreau",
          elenco: "Robert Downey Jr., Gwyneth Paltrow, Terrence Howard",
          visualizacao: 1,
          avaliacoes: 1,
          like: 1
        },
        {
          id: '7',
          img: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/87/34/62/19874544.jpg",
          name: "Capitão América: O Primeiro Vingador",
          sinopse: "Steve Rogers (Chris Evans), um jovem voluntário, se oferece para participar de um programa experimental que o transforma no supersoldado conhecido como Capitão América. Agora, armado com um escudo indestrutível, ele luta contra o mal e protege o mundo como líder dos Vingadores.",
          ano: "2011",
          tempo: "2h 4min",
          categoria: "Ação, Aventura, Ficção científica",
          tags: ["super-soldado", "heroísmo", "Marvel", "ação", "origens", "exército", "soladado", "militar", "eua", "guerra"],
          direcao: "Joe Johnston",
          elenco: "Chris Evans, Hugo Weaving, Hayley Atwell",
          visualizacao: 1,
          avaliacoes: 1,
          like: 1
        },
        {
          id: '8',
          img: "https://br.web.img2.acsta.net/c_310_420/medias/nmedia/18/87/33/05/20028705.jpg",
          name: "Thor",
          sinopse: "Thor (Chris Hemsworth), o poderoso deus nórdico do trovão, é banido de Asgard por seu pai, Odin (Anthony Hopkins), após desencadear uma guerra entre os reinos. Exilado na Terra, ele aprende o que significa ser um verdadeiro herói quando o mal ressurge.",
          ano: "2011",
          tempo: "1h 55min",
          categoria: "Ação, Aventura, Fantasia",
          tags: ["deuses", "mitologia", "marvel","odin","poderes", "ação", "valhalla", "mitologia-nordica", "nordico"],
          direcao: "Kenneth Branagh",
          elenco: "Chris Hemsworth, Natalie Portman, Tom Hiddleston",
          visualizacao: 1,
          avaliacoes: 1,
          like: 1
        },
        {
          id: '9',
          img: "https://br.web.img2.acsta.net/c_310_420/pictures/17/05/29/23/31/530814.jpg",
          name: "Homem-Aranha: De Volta ao Lar",
          sinopse: "Peter Parker (Tom Holland) está em uma missão para provar a si mesmo como um verdadeiro super-herói. Quando o vilão Abutre (Michael Keaton) surge ameaçando a cidade, Peter terá que lidar com o desafio de enfrentar um inimigo poderoso e conciliar sua vida como estudante do ensino médio.",
          ano: "2017",
          tempo: "2h 13min",
          categoria: "Ação, Aventura, Ficção científica",
          tags: ["herói", "adolescente", "marvel", "ação", "jovens", "poderes", "new york", "pupilo", "engraçado", "melhores-amigos"],
          direcao: "Jon Watts",
          elenco: "Tom Holland, Michael Keaton, Robert Downey Jr.",
          visualizacao: 1,
          avaliacoes: 1,
          like: 1
        },
        {
          id: '10',
          img: "https://br.web.img2.acsta.net/c_310_420/pictures/16/09/29/21/15/495786.jpg",
          name: "Doutor Estranho",
          sinopse: "Stephen Strange (Benedict Cumberbatch), um cirurgião renomado, sofre um acidente de carro que o deixa com as mãos debilitadas. Em busca de uma cura, ele parte em uma jornada pelo mundo até encontrar a Anciã (Tilda Swinton), que o introduz ao mundo das artes místicas. Agora, ele se torna o Doutor Estranho e precisa aprender a utilizar suas novas habilidades para proteger o mundo de ameaças místicas.",
          ano: "2016",
          tempo: "1h 55min",
          categoria: "Ação, Aventura, Fantasia",
          tags: ["magia", "dimensões", "marvel", "superação", "monges", "ancestralidade", "fantasia"],
          direcao: "Scott Derrickson",
          elenco: "Benedict Cumberbatch, Chiwetel Ejiofor, Rachel McAdams",
          visualizacao: 1,
          avaliacoes: 1,
          like: 1
        },
      {
        id: '11',
        img: "https://br.web.img3.acsta.net/c_310_420/pictures/19/10/04/19/58/1046648.jpg",
        name: "Parasita",
        sinopse: "A família Kim está desempregada e vive em um porão sujo e apertado. Um dia, o filho Ki-woo é recomendado por um amigo para dar aulas de inglês na casa de uma família rica. É o início de um plano mirabolante e sedutor onde toda a família Kim começa a trabalhar para a família Park.",
        ano: "2019",
        tempo: "2h 12min",
        categoria: "Comédia, Drama, Suspense",
        tags: ["oscar", "coreia do sul", "infiltrado", "familia", "classe social", "desigualdade", "cannes"],
        direcao: "Bong Joon-ho",
        elenco: "Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong",
        visualizacao: 1,
        avaliacoes: 1,
        like: 1
      },
      {
        id: '12',
        img: "https://br.web.img3.acsta.net/c_310_420/pictures/18/08/24/21/29/2341995.jpg",
        name: "Bohemian Rhapsody",
        sinopse: "A história da lendária banda de rock Queen e do icônico vocalista Freddie Mercury, desde a formação da banda até o histórico show Live Aid em 1985.",
        ano: "2018",
        tempo: "2h 14min",
        categoria: "Biografia, Drama, Música",
        tags: ["rock", "música", "anos 70","banda", "sexualidade", "hsitória real", "biografia"],
        direcao: "Bryan Singer",
        elenco: "Rami Malek, Lucy Boynton, Gwilym Lee",
        visualizacao: 1,
        avaliacoes: 1,
        like: 1
      },
      {
        id: '13',
        img: "https://br.web.img3.acsta.net/c_310_420/pictures/18/06/06/19/11/3472306.jpg",
        name: "Nasce uma Estrela",
        sinopse: "A jovem cantora Ally ascende ao estrelato enquanto seu parceiro Jackson Maine, um renomado artista de longa carreira, cai no esquecimento por problemas com o álcool. Os momentos opostos acabam por minar o relacionamento amoroso dos dois.",
        ano: "2018",
        tempo: "2h 16min",
        categoria: "Drama, Musical, Romance",
        tags: ["música", "amor", "estrelato", "cantores", "relacionamento", "álcoolismo", "superação", "persistência"],
        direcao: "Bradley Cooper",
        elenco: "Lady Gaga, Bradley Cooper, Sam Elliott",
        visualizacao: 1,
        avaliacoes: 1,
        like: 1
      },
      {
        id: '14',
        img: "https://br.web.img3.acsta.net/c_310_420/pictures/19/04/03/18/23/2539612.jpg",
        name: "Coringa",
        sinopse: "Arthur Fleck, um comediante de stand-up fracassado, é agredido e humilhado nas ruas de Gotham City. Desnorteado, ele parte para a violência como forma de vingança e acaba se tornando o icônico vilão conhecido como Coringa.",
        ano: "2019",
        tempo: "2h 2min",
        categoria: "Crime, Drama, Suspense",
        tags: ["esquisofrenia", "loucura", "oscar", "doenças mentais", "psicopáta", "problemas mentais", "loucura", "tensão", "violento"],
        direcao: "Todd Phillips",
        elenco: "Joaquin Phoenix, Robert De Niro, Zazie Beetz",
        visualizacao: 1,
        avaliacoes: 1,
        like: 1
      },
      {
        id: '15',
        img: "https://br.web.img3.acsta.net/c_310_420/pictures/19/10/04/19/42/5605017.jpg",
        name: "1917",
        sinopse: "Em plena Primeira Guerra Mundial, dois soldados britânicos recebem uma missão aparentemente impossível: entregar uma mensagem que poderá salvar 1.600 colegas de batalhão, incluindo o irmão de um deles.",
        ano: "2019",
        tempo: "1h 59min",
        categoria: "Drama, Guerra",
        tags: ["primeira guerra", "sobrevivência", "oscar", "guerra mundial", "guerra"],
        direcao: "Sam Mendes",
        elenco: "George MacKay, Dean-Charles Chapman, Mark Strong",
        visualizacao: 1,
        avaliacoes: 1,
        like: 1
      },
      {
        id: '16',
        img: "https://br.web.img3.acsta.net/c_310_420/pictures/19/11/12/18/32/5123798.jpg",
        name: "Parasita",
        sinopse: "A família Kim está desempregada e vive em um porão sujo e apertado. Um dia, o filho Ki-woo é recomendado por um amigo para dar aulas de inglês na casa de uma família rica. É o início de um plano mirabolante e sedutor onde toda a família Kim começa a trabalhar para a família Park.",
        ano: "2019",
        tempo: "2h 12min",
        categoria: "Comédia, Drama, Suspense",
        tags: ["oscar", "coreia do sul", "infiltrado"],
        direcao: "Bong Joon-ho",
        elenco: "Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong",
        visualizacao: 1,
        avaliacoes: 1,
        like: 1
      },
      {
        id: '17',
        img: "https://br.web.img3.acsta.net/c_310_420/pictures/19/12/03/16/59/4821553.jpg",
        name: "O Farol",
        sinopse: "Em uma ilha remota da Nova Inglaterra, no final do século XIX, o jovem faroleiro Ephraim Winslow e seu chefe, o velho Thomas Wake, vivem uma rotina trabalhando em um farol. Conforme o tempo passa, a tensão aumenta e eles começam a questionar a sanidade um do outro.",
        ano: "2019",
        tempo: "1h 49min",
        categoria: "Drama, Fantasia, Terror",
        tags: ["isolamento", "loucura", "farol"],
        direcao: "Robert Eggers",
        elenco: "Willem Dafoe, Robert Pattinson",
        visualizacao: 1,
        avaliacoes: 1,
        like: 1
      },
      {
        id: '18',
        img: "https://br.web.img2.acsta.net/c_310_420/pictures/19/10/17/16/58/1689390.jpg",
        name: "História de um Casamento",
        sinopse: "Nicole e seu marido Charlie estão passando por um divórcio complicado, onde precisam lidar com a custódia do filho e seus sentimentos conflitantes.",
        ano: "2019",
        tempo: "2h 17min",
        categoria: "Drama",
        tags: ["divórcio", "relacionamentos"],
        direcao: "Noah Baumbach",
        elenco: "Scarlett Johansson, Adam Driver, Laura Dern",
        visualizacao: 1,
        avaliacoes: 1,
        like: 1
      },
      {
        id: '19',
        img: "https://br.web.img3.acsta.net/c_310_420/pictures/19/02/19/11/44/5457998.jpg",
        name: "Rocketman",
        sinopse: "A história de como o tímido Reginald Dwight se transformou em Elton John, ícone da música pop.",
        ano: "2019",
        tempo: "2h 1min",
        categoria: "Biografia, Drama, Música",
        tags: ["elton John", "música", "anos 70"],
        direcao: "Dexter Fletcher",
        elenco: "Taron Egerton, Jamie Bell, Richard Madden",
        visualizacao: 1,
        avaliacoes: 1,
        like: 1
      },
      {
        id: '20',
        img: "https://br.web.img3.acsta.net/c_310_420/pictures/17/11/28/18/40/3044833.jpg",
        name: "A Forma da Água",
        sinopse: "Em plena Guerra Fria, Elisa, uma zeladora muda, trabalha em um laboratório secreto do governo. Sua vida muda quando ela se apaixona por uma criatura fantástica mantida em cativeiro.",
        ano: "2017",
        tempo: "2h 3min",
        categoria: "Drama, Fantasia, Romance",
        tags: ["amor proibido", "monstro"],
        direcao: "Guillermo del Toro",
        elenco: "Sally Hawkins, Doug Jones, Michael Shannon",
        visualizacao: 1,
        avaliacoes: 1,
        like: 1
      },
      {
        id: '21',
        img: "https://br.web.img3.acsta.net/c_310_420/pictures/20/08/19/21/05/1514931.jpg",
        name: "Nomadland",
        sinopse: "Após o colapso econômico de uma cidade na zona rural de Nevada, Fern, uma mulher de 60 anos, embarca em uma jornada pelo oeste dos Estados Unidos, vivendo como uma nômade moderna.",
        ano: "2020",
        tempo: "1h 47min",
        categoria: "Drama",
        tags: ["oscar", "vida nômade", "estrada"],
        direcao: "Chloé Zhao",
        elenco: "Frances McDormand, David Strathairn, Linda May",
        visualizacao: 1,
        avaliacoes: 1,
        like: 1
      },
      {
        id: '22',
        img: "https://br.web.img3.acsta.net/c_310_420/pictures/18/02/01/11/38/0063535.jpg",
        name: "Três Anúncios para um Crime",
        sinopse: "Após o assassinato de sua filha, Mildred Hayes aluga três outdoors em uma estrada abandonada para questionar a ineficácia da polícia local. A ação repercute em toda a cidade e gera consequências inesperadas.",
        ano: "2017",
        tempo: "1h 55min",
        categoria: "Crime, Drama",
        tags: ["oscar", "justiça", "vingança"],
        direcao: "Martin McDonagh",
        elenco: "Frances McDormand, Woody Harrelson, Sam Rockwell",
        visualizacao: 1,
        avaliacoes: 1,
        like: 1
      },
      {
        id: '23',
        img: "https://br.web.img3.acsta.net/c_310_420/pictures/17/01/24/17/13/228823.jpg",
        name: "La La Land: Cantando Estações",
        sinopse: "Em Los Angeles, Sebastian, um pianista de jazz, e Mia, uma aspirante a atriz, se apaixonam enquanto buscam seus sonhos na cidade dos sonhos. Mas o relacionamento é testado pelo sucesso e pelas oportunidades que surgem.",
        ano: "2016",
        tempo: "2h 8min",
        categoria: "Comédia, Drama, Musical",
        tags: ["oscar", "amor", "sonhos"],
        direcao: "Damien Chazelle",
        elenco: "Ryan Gosling, Emma Stone, John Legend",
        visualizacao: 1,
        avaliacoes: 1,
        like: 1
      },
      {
        id: '24',
        img: "https://br.web.img3.acsta.net/c_310_420/pictures/18/08/15/13/09/1891759.jpg",
        name: "Green Book: O Guia",
        sinopse: "Tony Lip, um segurança ítalo-americano, é contratado como motorista do Dr. Don Shirley, um pianista negro de classe alta, durante uma turnê pelo sul dos Estados Unidos nos anos 1960. A viagem desafia suas diferenças e os leva a uma amizade improvável.",
        ano: "2018",
        tempo: "2h 10min",
        categoria: "Biografia, Comédia, Drama",
        tags: ["oscar", "amizade", "racismo"],
        direcao: "Peter Farrelly",
        elenco: "Viggo Mortensen, Mahershala Ali, Linda Cardellini",
        visualizacao: 1,
        avaliacoes: 1,
        like: 1
      },
      {
        id: '25',
        img: "https://br.web.img3.acsta.net/c_310_420/pictures/17/04/19/21/08/577190.jpg",
        name: "Corra!",
        sinopse: "Chris, um jovem negro, vai visitar a família de sua namorada branca em uma propriedade isolada. A princípio, ele acredita que o comportamento excessivamente amoroso dos pais dela é uma tentativa de lidar com o relacionamento interracial, mas logo descobre uma verdade muito mais perturbadora.",
        ano: "2017",
        tempo: "1h 44min",
        categoria: "Mistério, Suspense, Terror",
        tags: ["racismo", "mente", "oscar"],
        direcao: "Jordan Peele",
        elenco: "Daniel Kaluuya, Allison Williams, Bradley Whitford",
        visualizacao: 1,
        avaliacoes: 1,
        like: 1
      },
      {
        id: '26',
        img: "https://br.web.img2.acsta.net/c_310_420/pictures/20/09/14/19/55/4722183.jpg",
        name: "Os 7 de Chicago",
        sinopse: "Em 1969, sete pessoas são acusadas de conspirar para incitar a desordem durante a Convenção Nacional Democrata, em Chicago. O julgamento que se segue se torna um dos eventos mais notórios da história judicial dos EUA.",
        ano: "2020",
        tempo: "2h 9min",
        categoria: "Drama, História, Suspense",
        tags: ["julgamento", "conspiração", "anos 60"],
        direcao: "Aaron Sorkin",
        elenco: "Eddie Redmayne, Alex Sharp, Sacha Baron Cohen",
        visualizacao: 1,
        avaliacoes: 1,
        like: 1
      },
      {
        id: '27',
        img: "https://br.web.img3.acsta.net/c_310_420/pictures/21/03/12/14/52/2700323.jpg",
        name: "Meu Pai",
        sinopse: "Um homem idoso, Anthony, vive sozinho em seu apartamento em Londres e recusa a ajuda de sua filha. À medida que ele começa a duvidar de suas próprias memórias, ele se vê navegando por um turbilhão de emoções enquanto tenta entender o que está acontecendo ao seu redor.",
        ano: "2020",
        tempo: "1h 37min",
        categoria: "Drama",
        tags: ["memória", "melacionamento pai e filha", "envelhecimento"],
        direcao: "Florian Zeller",
        elenco: "Anthony Hopkins, Olivia Colman, Mark Gatiss",
        visualizacao: 1,
        avaliacoes: 1,
        like: 1
      },
      {
        id: '28',
        img: "https://br.web.img2.acsta.net/c_310_420/pictures/21/01/29/10/11/0547305.jpg",
        name: "Judas e o Messias Negro",
        sinopse: "No final dos anos 1960, o ativista dos direitos civis Fred Hampton se torna presidente do Partido dos Panteras Negras e atrai a atenção do FBI. Um jovem criminoso chamado William O'Neal é recrutado para se infiltrar no grupo e vigiar Hampton.",
        ano: "2021",
        tempo: "2h 6min",
        categoria: "Biografia, Drama, História",
        tags: ["panteras negras", "infiltrado", "luta pelos direitos civis"],
        direcao: "Shaka King",
        elenco: "Daniel Kaluuya, LaKeith Stanfield, Jesse Plemons",
        visualizacao: 1,
        avaliacoes: 1,
        like: 1
      },
      {
        id: '29',
        img: "https://br.web.img2.acsta.net/c_310_420/pictures/16/09/21/19/14/207893.jpg",
        name: "Capitão Fantástico",
        sinopse: "Ben e Leslie são pais dedicados que decidem criar seus seis filhos nas florestas selvagens do Pacífico Norte, distantes da civilização. No entanto, um evento trágico faz com que eles tenham que deixar seu refúgio e se confrontem com o mundo exterior.",
        ano: "2016",
        tempo: "1h 58min",
        categoria: "Comédia, Drama",
        tags: ["família", "natureza", "sociedade"],
        direcao: "Matt Ross",
        elenco: "Viggo Mortensen, George MacKay, Samantha Isler",
        visualizacao: 1,
        avaliacoes: 1,
        like: 1
      },
      {
        id: '30',
        img: "https://br.web.img3.acsta.net/c_310_420/pictures/17/02/09/16/34/449299.jpg",
        name: "Moonlight: Sob a Luz do Luar",
        sinopse: "Um jovem negro enfrenta dificuldades durante sua infância e adolescência enquanto tenta descobrir sua identidade e lidar com a sua sexualidade. Conforme os anos passam, ele encontra apoio em figuras inesperadas.",
        ano: "2016",
        tempo: "1h 51min",
        categoria: "Drama",
        tags: ["oscar", "identidade", "sexualidade"],
        direcao: "Barry Jenkins",
        elenco: "Mahershala Ali, Naomie Harris, Trevante Rhodes",
        visualizacao: 1,
        avaliacoes: 1,
        like: 1
      },
      {
        id: '31',
        img: "https://br.web.img3.acsta.net/c_310_420/pictures/20/10/22/00/38/3179794.jpg",
        name: "Mank",
        sinopse: "Em 1940, o roteirista Herman J. Mankiewicz é contratado para escrever o roteiro de Cidadão Kane. Conforme ele trabalha no projeto, ele enfrenta diversos desafios e lida com seu próprio passado e a complexa personalidade de Orson Welles.",
        ano: "2020",
        tempo: "2h 11min",
        categoria: "Biografia, Drama",
        tags: ["Hollywood", "Cinema", "Oscar"],
        direcao: "David Fincher",
        elenco: "Gary Oldman, Amanda Seyfried, Lily Collins",
        visualizacao: 1,
        avaliacoes: 1,
        like: 1
      },
      {
        id: '32',
        img: "https://br.web.img3.acsta.net/c_310_420/pictures/20/09/25/09/06/1984747.jpg",
        name: "O som do silêncio",
        sinopse: "Ruben é um baterista que começa a perder sua audição. Desesperado, ele se junta a um abrigo para surdos e descobre um novo modo de vida, enfrentando desafios e aceitando sua nova realidade.",
        ano: "2019",
        tempo: "2h",
        categoria: "Drama, Música",
        tags: ["surdez", "aceitação", "música"],
        direcao: "Darius Marder",
        elenco: "Riz Ahmed, Olivia Cooke, Paul Raci",
        visualizacao: 1,
        avaliacoes: 1,
        like: 1
      },
      {
        id: '33',
        img: "https://br.web.img2.acsta.net/c_310_420/pictures/19/10/11/23/59/1464289.jpg",
        name: "Dois Papas",
        sinopse: "O filme imagina uma série de conversas fictícias entre o Papa Bento XVI e o então Cardeal Jorge Bergoglio, o futuro Papa Francisco. Juntos, eles enfrentam seus passados e debatem os rumos da Igreja Católica.",
        ano: "2019",
        tempo: "2h 5min",
        categoria: "Biografia, Comédia, Drama",
        tags: ["papa", "religião", "conversas"],
        direcao: "Fernando Meirelles",
        elenco: "Anthony Hopkins, Jonathan Pryce, Juan Minujín",
        visualizacao: 1,
        avaliacoes: 1,
        like: 1
      },
      {
        id: '34',
        img: "https://br.web.img3.acsta.net/c_310_420/pictures/21/03/15/18/55/1357053.jpg",
        name: "Bela Vingança",
        sinopse: "Cansada de homens que se aproveitam de mulheres bêbadas, Cassie, uma jovem inteligente e astuta, decide se vingar. Ela passa a frequentar bares e simula estar bêbada, esperando que alguém tente se aproveitar dela. Quando isso acontece, ela revela sua verdadeira identidade e ensina uma lição aos abusadores.",
        ano: "2020",
        tempo: "1h 53min",
        categoria: "Comédia, Crime, Drama",
        tags: ["vingança", "feminismo", "abuso"],
        direcao: "Emerald Fennell",
        elenco: "Carey Mulligan, Bo Burnham, Alison Brie",
        visualizacao: 1,
        avaliacoes: 1,
        like: 1
        },
     {
          id: '35',
          img: "https://br.web.img2.acsta.net/c_310_420/medias/nmedia/18/87/10/53/19872062.jpg",
          name: "Jumper",
          sinopse: "David Rice tem a habilidade de se teletransportar para qualquer lugar que imaginar. Ele usa este dom para sair pelo mundo e vive do dinheiro que rouba ao 'pular' nos cofres dos bancos. Ele é capturado pelo maldoso Roland Cox, que sabe como fazer David parar de se teletransportar. No entanto, ele escapa e se une à sua paixão dos tempos de escola, Millie, formando uma aliança com o amigo Griffin para um combate mortal com Cox.",
          ano: "2008",
          tempo: "1h 28min",
          categoria: "Ficção científica, Aventura, Drama de ação",
          tags: ["teletransporte", "ação", "aventura", "ficção científica", "poderes", "combate"],
          direcao: "Doug Liman",
          elenco: "Hayden Christensen, Jamie Bell, Samuel L. Jackson, Rachel Bilson, Diane Lane, Michael Rooker, Max Thieriot, AnnaSophia Robb, Teddy Dunn, Jesse James, Kristen Stewart",
          visualizacao: 1,
          avaliacoes: 1,
          like: 1
        },
        {
          id: '36',
          img: "https://br.web.img3.acsta.net/c_310_420/pictures/18/06/11/23/14/4213171.jpg",
          name: "De Carona para o Amor",
          sinopse: "Jocelyn é um empresário mulherengo e sedutor que inventa mentiras a fim de levar vantagem em qualquer situação promissora. Um dia, seduz uma mulher que finge ser portadora de deficiência física. No entanto, ao apresentar-se à nova cunhada, que é de fato deficiente, sustentar a farsa fica mais difícil.",
          ano: "2018",
          tempo: " 1h 49min",
          categoria: "Comédia",
          tags: ["comédia", "mentiras", "sedução", "deficiência física", "romance"],
          direcao: " Franck Dubosc",
          elenco: "Franck Dubosc, Alexandra Lamy, Elsa Zylberstein, Gérard Darmon, Caroline Anglade, Laurent Bateau, Claude Brasseur, François-Xavier Demaison",
          visualizacao: 1,
          avaliacoes: 1,
          like: 1
        },
        {
      id: '37',
      img: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/90/93/20/20120876.jpg",
      name: "O Poderoso Chefão",
      sinopse: "Em 1945, Don Corleone (Marlon Brando) é o chefe de uma mafiosa família italiana de Nova York. Ele costuma apadrinhar várias pessoas, realizando importantes favores para elas, em troca de favores futuros. Com a chegada das drogas, as famílias começam uma disputa pelo promissor mercado. Quando Corleone se recusa a facilitar a entrada dos narcóticos na cidade, não oferecendo ajuda política e policial, sua família começa a sofrer atentados para que mudem de posição. É nessa complicada época que Michael (Al Pacino), um herói de guerra nunca envolvido nos negócios da família, vê a necessidade de proteger o seu pai e tudo o que ele construiu ao longo dos anos.",
      ano: "1972",
      tempo: "2h 57min",
      categoria: "Drama, Policial",
      tags: ["máfia", "crime", "família", "violência", "máfia italiana"],
      direcao: "Francis Ford Coppola",
      elenco: "Marlon Brando, Al Pacino, James Caan",
      visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    {
      id: '38',
      img: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/90/16/48/20083748.jpg",
      name: "Um Sonho de Liberdade",
      sinopse: "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem-sucedido banqueiro, tem sua vida radicalmente modificada quando mandado para uma penitenciária para cumprir prisão perpétua por ter assassinado sua mulher e o amante dela. No presídio, faz amizade com Ellis Boyd Redding (Morgan Freeman), um prisioneiro que cumpre pena há 20 anos e controla o mercado negro do presídio.",
      ano: "1994",
      tempo: "2h 22min",
      categoria: "Drama, Policial",
      tags: ["prisão", "redenção", "amizade", "liberdade", "esperança"],
      direcao: "Frank Darabont",
      elenco: "Tim Robbins, Morgan Freeman, Bob Gunton",
      visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    {
      id: "39",
      img: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/86/98/32/19870786.jpg",
      name: "Batman: O Cavaleiro das Trevas",
      sinopse: "Após dois anos desde o surgimento do Batman (Christian Bale), os criminosos de Gotham City têm muito o que temer. Com a ajuda do tenente James Gordon (Gary Oldman) e do promotor público Harvey Dent (Aaron Eckhart), Batman luta contra o crime organizado. Acuados com o combate, os chefes do crime aceitam a proposta feita pelo Coringa (Heath Ledger) e o contratam para combater o Homem-Morcego.",
      ano: "2008",
      tempo: "152 minutos",
      categoria: "Ação, Drama, Policial, Super-herói",
      tags: ["Batman", "herói", "ação", "crime", "combate"],
      direcao: "Christopher Nolan",
      elenco: "Christian Bale, Aaron Eckhart, Gary Oldman, Heath Ledger, Maggie Gyllenhaal",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    {
      id: "40",
      img: "https://br.web.img3.acsta.net/c_310_420/pictures/19/04/10/19/44/2904073.jpg",
      name: "A Lista de Schindler",
      sinopse: "A história real ronda em torno do alemão Oskar Schindler, que viu na mão-de-obra judia uma solução barata e viável para lucrar com negócios durante a guerra. Com sua forte influência dentro do partido nazista, foi fácil conseguir as autorizações e abrir uma fábrica. O que poderia parecer uma atitude de um homem não muito bondoso transformou-se em um dos maiores casos de amor à vida da História, quando este alemão abdicou de toda sua fortuna para salvar a vida de mais de mil judeus, em plena luta contra o extermínio alemão.",
      ano: "1993",
      tempo: "195 minutos",
      categoria: "Biografia, Drama, Guerra, História",
      tags: ["Schindler", "holocausto", "judeus", "nazismo", "guerra", "vida"],
      direcao: "Steven Spielberg",
      elenco: "Liam Neeson, Adam Siemion, Adi Nitzan, Agnieszka Korzeniowska, Agnieszka Krukówna",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    {
      id: "41",
      img: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/87/16/32/19872655.jpg",
      name: "Pulp Fiction: Tempo de Violência",
      sinopse: "Os caminhos de vários criminosos se cruzam nestas três histórias de Quentin Tarantino. Um pistoleiro se apaixona pela mulher de seu chefe, um boxeador não se sai bem em uma luta e um casal tenta executar um plano de roubo que foge do controle.",
      ano: "1994",
      tempo: "154 minutos",
      categoria: "Drama, Policial, Suspense",
      tags: ["Tarantino", "crime", "violência", "roubo", "amor", "boxe"],
      direcao: "Quentin Tarantino",
      elenco: "Bruce Willis, John Travolta, Samuel L. Jackson, Tim Roth, Uma Thurman",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    {
      id: "42",
      img: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/87/30/21/19874092.jpg",
      name: "Forrest Gump: O Contador de Histórias",
      sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de um rapaz com QI abaixo da média que, por obra do acaso, consegue participar de momentos cruciais, como a Guerra do Vietnã e Watergate.",
      ano: "1994",
      tempo: "142 minutos",
      categoria: "Drama, Romance",
      tags: ["Forrest Gump", "história", "Estados Unidos", "Guerra do Vietnã", "Watergate"],
      direcao: "Robert Zemeckis",
      elenco: "Tom Hanks, Aaron Izbicki, Aaron Michael Lacey, Afemo Omilami, Alexander Zemeckis",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    {
      id: "43",
      img: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/90/95/96/20122166.jpg",
      name: "Clube da Luta",
      sinopse: "Um explosivo sofredor de insônia e um carismático vendedor de sabonetes canalizam agressão primitiva masculina transformando-a em uma nova e chocante forma de terapia. Seu conceito pega, e formam-se diversos clubes da luta clandestinos em cada cidade, até que a sensual e excêntrica Marla entra na jogada e desencadeia uma situação fora de controle rumo ao caos. Baseado no romance homônimo de Chuck Palahniuk.",
      ano: "1999",
      tempo: "139 minutos",
      categoria: "Drama, Thriller",
      tags: ["insônia", "agressão", "terapia", "caos", "clube da luta", "chuck palahniuk"],
      direcao: "David Fincher",
      elenco: "Brad Pitt, Edward Norton, Helena Bonham Carter, Carl Ciarfalio, David Andrews",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    {
      id: "44",
      img: "https://br.web.img3.acsta.net/c_310_420/pictures/15/10/18/18/39/408904.jpg",
      name: "Star Wars, Episódio VII: O Despertar da Força",
      sinopse: "Décadas após a queda de Darth Vader e do Império, surge uma nova ameaça: a Primeira Ordem, uma organização sombria que busca minar o poder da República. Eles conseguem capturar Poe Dameron, um dos principais pilotos da Resistência, que envia através do pequeno robô BB-8 o mapa de onde vive o mitológico Luke Skywalker. Ao fugir pelo deserto, BB-8 encontra a jovem Rey, que vive sozinha catando destroços de naves antigas. Paralelamente, Poe recebe a ajuda de Finn, um stormtrooper que decide abandonar o posto repentinamente. Juntos, eles escapam do domínio da Primeira Ordem.",
      ano: "2015",
      tempo: "135 minutos",
      categoria: "Ação, Aventura, Ficção Científica",
      tags: ["Star Wars", "Jedi", "Força", "galáxia", "ação", "aventura", "ficção científica"],
      direcao: "J.J. Abrams",
      elenco: "Daisy Ridley, John Boyega, Oscar Isaac, Adam Driver, Andrew Jack",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    {
      id: "44",
      img: "https://br.web.img3.acsta.net/c_310_420/pictures/15/10/18/18/39/408904.jpg",
      name: "Star Wars, Episódio VII: O Despertar da Força",
      sinopse: "Décadas após a queda de Darth Vader e do Império, surge uma nova ameaça: a Primeira Ordem, uma organização sombria que busca minar o poder da República. Eles conseguem capturar Poe Dameron, um dos principais pilotos da Resistência, que envia através do pequeno robô BB-8 o mapa de onde vive o mitológico Luke Skywalker. Ao fugir pelo deserto, BB-8 encontra a jovem Rey, que vive sozinha catando destroços de naves antigas. Paralelamente, Poe recebe a ajuda de Finn, um stormtrooper que decide abandonar o posto repentinamente. Juntos, eles escapam do domínio da Primeira Ordem.",
      ano: "2015",
      tempo: "135 minutos",
      categoria: "Ação, Aventura, Ficção Científica",
      tags: ["Star Wars", "Jedi", "Força", "galáxia", "ação", "aventura", "ficção científica"],
      direcao: "J.J. Abrams",
      elenco: "Daisy Ridley, John Boyega, Oscar Isaac, Adam Driver, Andrew Jack",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    {
      id: "45",
      img: "https://br.web.img2.acsta.net/c_310_420/medias/nmedia/18/87/29/07/19873973.jpg",
      name: "Gladiador",
      sinopse: "Nos dias finais do reinado de Marcus Aurelius, o imperador desperta a ira de seu filho Commodus ao tornar pública sua predileção em deixar o trono para Maximus, o comandante do exército romano. Sedento pelo poder, Commodus mata seu pai, assume a coroa e ordena a morte de Maximus, que consegue fugir antes de ser pego e passa a se esconder sob a identidade de um escravo e gladiador do Império Romano.",
      ano: "2000",
      tempo: "155 minutos",
      categoria: "Ação, Aventura, Drama",
      tags: ["gladiador", "império romano", "ação", "aventura", "drama"],
      direcao: "Ridley Scott",
      elenco: "Joaquin Phoenix, Russell Crowe, Adam Levy, Al Ashton, Allan Corduner",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    {
      id: "46",
      img: "https://br.web.img2.acsta.net/c_310_420/medias/nmedia/18/87/30/40/20028676.jpg",
      name: "Avatar",
      sinopse: "'Avatar' nos conduz por um mundo espetacular além da imaginação, onde um herói relutante embarca numa jornada de redenção, descobertas e amor inesperado, ao liderar uma batalha heróica para salvar a civilização. No futuro, Jake é o ex-fuzileiro naval paraplégico enviado a um planeta chamado Pandora. Lá, além da riqueza em biodiversidade, existe também a raça humanóide Na'vi, com sua própria língua e cultura, o que evidentemente entra em choque com os humanos da Terra.\n\nVencedor de três Oscars, nas categorias de Melhor Fotografia, Melhor Direção de Arte e Melhores Efeitos Visuais.",
      ano: "2009",
      tempo: "162 minutos",
      categoria: "Ação, Aventura, Fantasia, Ficção Científica",
      tags: ["Avatar", "Pandora", "Na'vi", "biodiversidade", "ação", "aventura", "fantasia", "ficção científica"],
      direcao: "James Cameron",
      elenco: "Michelle Rodriguez, Sam Worthington, Stephen Lang, Wes Studi, Zoe Saldana",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    {
      id: "47",
      img: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/89/56/94/20055685.jpg",
      name: "Titanic",
      sinopse: "Uma expedição aos destroços do Titanic leva uma sobrevivente do naufrágio a relembrar uma grande história de amor que viveu no navio. Em 1912, na única viagem do que então era o maior navio já construído, Rose é uma jovem da alta sociedade prestes a se casar com seu rico noivo. Mas a bordo do Titanic ela conhece Jack Dawson, um jovem simples e aventureiro, e se apaixona pelo rapaz. As diferenças sociais fazem com que muitos se oponham ao relacionamento que surge. Em meio ao intenso romance e à rebeldia dos dois, acontece o trágico acidente, que eles enfrentam juntos.",
      ano: "1997",
      tempo: "194 minutos",
      categoria: "Drama, Romance",
      tags: ["Titanic", "naufrágio", "amor", "1912", "relacionamento", "drama", "romance"],
      direcao: "James Cameron",
      elenco: "Billy Zane, Frances Fisher, Kate Winslet, Kathy Bates, Leonardo DiCaprio",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1,
    },
    {
      id: "48",
      img: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/92/91/47/20224867.jpg",
      name: "O Senhor dos Anéis: O Retorno do Rei",
      sinopse: "Sauron planeja um grande ataque a Minas Tirith, capital de Gondor, o que faz com que Gandalf e Pippin partam para o local na intenção de ajudar a resistência. Um exército é reunido por Theoden em Rohan, em mais uma tentativa de deter as forças de Sauron. Enquanto isso, Frodo, Sam e Gollum seguem sua viagem rumo à Montanha da Perdição, para destruir o Um Anel. Baseado no romance homônimo de J. R. R. Tolkien.",
      ano: "2003",
      tempo: "201 minutos",
      categoria: "Aventura, Fantasia",
      tags: ["Sauron", "Minas Tirith", "Gondor", "Gandalf", "Pippin", "Theoden", "Rohan", "Frodo", "Sam", "Gollum", "Montanha da Perdição", "Um Anel", "J.R.R. Tolkien"],
      direcao: "Peter Jackson",
      elenco: "Billy Boyd, Elijah Wood, Orlando Bloom, Alan Howard, Ali Astin",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    {
      id: "49",
      img: "https://br.web.img3.acsta.net/c_310_420/pictures/17/06/08/16/58/110585.jpg",
      name: "Dunkirk",
      sinopse: "Na Operação Dínamo, mais conhecida como a Evacuação de Dunquerque, soldados aliados da Bélgica, do Império Britânico e da França são rodeados pelo exército alemão e devem ser resgatados durante uma feroz batalha no início da Segunda Guerra Mundial. A história acompanha três momentos distintos: uma hora de confronto no céu, onde o piloto Farrier precisa destruir um avião inimigo, um dia inteiro em alto mar, onde o civil britânico Dawson leva seu barco de passeio para ajudar a resgatar o exército de seu país, e uma semana na praia, onde o jovem soldado Tommy busca escapar a qualquer preço.",
      ano: "2017",
      tempo: "106 minutos",
      categoria: "Ação, Drama, Guerra, História",
      tags: ["Operação Dínamo", "Evacuação de Dunquerque", "soldados aliados", "exército alemão", "Segunda Guerra Mundial", "Farrier", "Dawson", "Tommy"],
      direcao: "Christopher Nolan",
      elenco: "Aneurin Barnard, Cillian Murphy, Fionn Whitehead, Harry Styles, Jack Lowden",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    {
      id: "50",
      img: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/96/07/36/20443914.jpg",
      name: "O Resgate do Soldado Ryan",
      sinopse: "Durante a Segunda Guerra Mundial, o alto comando do exército descobre que quatro irmãos Ryan estavam nas forças armadas e que três deles foram mortos. O Capitão John Miller é designado para salvar o último soldado da família Ryan que ainda está vivo e retirá-lo do conflito. Porém, é preciso descobrir onde ele está, percorrendo diversas regiões do território em guerra. Durante a missão, Miller e seus soldados enfrentam inimigos e seus próprios medos.",
      ano: "1998",
      tempo: "169 minutos",
      categoria: "Ação, Drama, Guerra",
      tags: ["Segunda Guerra Mundial", "exército", "John Miller", "soldado", "conflito", "missão", "inimigos"],
      direcao: "Steven Spielberg",
      elenco: "Matt Damon, Tom Hanks, Tom Sizemore, Vin Diesel, Adam Goldberg",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    {
      id: "51",
      img: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/92/91/32/20224832.jpg",
      name: "O Senhor dos Anéis: A Sociedade do Anel",
      sinopse: "Numa terra fantástica e única, chamada Terra-Média, um hobbit recebe de presente de seu tio o Um Anel, um anel mágico e maligno que precisa ser destruído antes que caia nas mãos do mal. Para isso, o hobbit Frodo terá um caminho árduo pela frente, onde encontrará perigo, medo e personagens bizarros. Ao seu lado, ele poderá contar com outros hobbits, um elfo, um anão, dois humanos e um mago, totalizando 9 pessoas que formarão a Sociedade do Anel. Baseado no romance homônimo de J. R. R. Tolkien.",
      ano: "2001",
      tempo: "178 minutos",
      categoria: "Aventura, Drama, Fantasia",
      tags: ["Terra-Média", "hobbit", "anel", "magia", "aventura", "fantasia", "jornada"],
      direcao: "Peter Jackson",
      elenco: "Andy Serkis, Billy Boyd, Cate Blanchett, Christopher Lee, Dominic Monaghan",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    {
      id: "52",
      img: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/91/98/15/20172684.jpg",
      name: "Indiana Jones e a Última Cruzada",
      sinopse: "Os inimigos nazistas de Indy estão de volta e sequestraram seu pai, professor Henry Jones Sr., para ajudá-los na busca do Santo Graal. Seguindo a pista da América até Veneza e aos desertos da Terra Santa, só depende de Indy salvar seu pai, salvar o Graal e salvar o dia.",
      ano: "1989",
      tempo: "2h 7min",
      categoria: "Ação, Aventura, Fantasia",
      tags: ["nazistas", "Indiana Jones", "aventura", "ação", "fantasia"],
      direcao: "Steven Spielberg",
      elenco: "Alison Doody, Denholm Elliott, Harrison Ford, John Rhys-Davies, Julian Glover",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    {
      id: "53",
      img: "https://br.web.img3.acsta.net/c_310_420/pictures/14/10/10/19/21/152595.jpg",
      name: "O Iluminado",
      sinopse: "Durante o inverno, um homem é contratado para ficar como vigia em um hotel no Colorado e vai para lá com a mulher e seu filho. Porém, o contínuo isolamento começa a lhe causar problemas mentais sérios, e ele vai se tornando cada vez mais agressivo e perigoso, ao mesmo tempo que seu filho passa a ter visões de acontecimentos ocorridos no passado, que também foram causados pelo isolamento excessivo.",
      ano: "1980",
      tempo: "2h 26min",
      categoria: "Mistério, Terror",
      tags: ["inverno", "isolamento", "hotel", "problemas mentais", "agressividade", "visões", "terror"],
      direcao: "Stanley Kubrick",
      elenco: "Danny Lloyd, Jack Nicholson, Scatman Crothers, Shelley Duvall, Alison Coleridge",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    {
      id: "54",
      img: "https://br.web.img2.acsta.net/c_310_420/medias/nmedia/18/72/74/31/20080748.jpg",
      name: "Amadeus",
      sinopse: "Amadeus é uma adaptação da peça sobre a vida de Mozart, o gênio da música. A história foca em Salieri, músico contemporâneo de Mozart que, ao mesmo tempo em que admira e inveja o talento do compositor, o despreza por seu comportamento grosseiro. Salieri se pergunta por que Deus deu tamanho talento a alguém tão vulgar, enquanto ele, esforçado e devoto, está tão aquém de tal genialidade. A inveja torna Salieri um rival, disposto a usar sua influência na corte de Viena para sabotar Mozart.",
      ano: "1984",
      tempo: "3h",
      categoria: "Biografia, Drama, Música",
      tags: ["Mozart", "música", "genialidade", "inveja", "sabotagem", "drama", "biografia"],
      direcao: "Miloš Forman",
      elenco: "Elizabeth Berridge, Tom Hulce, Atka Janouskova, Barbara Bryne, Brian Pettifer",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    
    {
      id: "55",
      img: "https://br.web.img3.acsta.net/c_310_420/pictures/210/108/21010802_20130606193222789.jpg",
      name: "2001: Uma Odisseia no Espaço",
      sinopse: "Desde a 'Aurora do Homem' (a pré-história), um misterioso monólito negro parece emitir sinais de outra civilização interferindo no nosso planeta. Quatro milhões de anos depois, no século XXI, uma equipe de astronautas liderada pelo experiente David Bowman (Keir Dullea) e Frank Poole (Gary Lockwood) é enviada a Júpiter para investigar o enigmático monólito na nave Discovery, totalmente controlada pelo computador HAL 9000.",
      ano: "1968",
      tempo: "2h 28min",
      categoria: "Experimental, Ficção Científica, Mistério",
      tags: ["monólito", "astronautas", "civilização", "Júpiter", "nave espacial", "computador", "ficção científica"],
      direcao: "Stanley Kubrick",
      elenco: "Douglas Rain, Keir Dullea, Alan Gifford, Andy Wallace, Ann Gillis",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    {
      id: "56",
      img: "https://br.web.img3.acsta.net/c_310_420/pictures/16/10/19/01/57/552532.jpg",
      name: "A Chegada",
      sinopse: "Quando seres interplanetários deixam marcas na Terra, a Dra. Louise Banks (Amy Adams), uma linguista especialista no assunto, é procurada por militares para traduzir os sinais e desvendar se os alienígenas representam uma ameaça ou não. No entanto, a resposta para todas as perguntas e mistérios pode ameaçar a vida de Louise e a existência de toda a humanidade. Baseado no conto História da Sua Vida, de Ted Chiang.",
      ano: "2016",
      tempo: "1h 56min",
      categoria: "Drama, Ficção Científica, Mistério, Suspense, Thriller",
      tags: ["alienígenas", "linguista", "ameaça", "militares", "contato", "mistério"],
      direcao: "Denis Villeneuve",
      elenco: "Amy Adams, Forest Whitaker, Jeremy Renner, Michael Stuhlbarg, Tzi Ma",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    
    {
      id: "57",
      img: "https://br.web.img3.acsta.net/c_310_420/pictures/14/10/31/20/39/476171.jpg",
      name: "Interestelar",
      sinopse: "Após ver a Terra consumindo boa parte de suas reservas naturais, um grupo de astronautas recebe a missão de verificar possíveis planetas para receberem a população mundial, possibilitando a continuação da espécie. Cooper (Matthew McConaughey) é chamado para liderar o grupo e aceita a missão sabendo que pode nunca mais ver os filhos. Ao lado de Brand (Anne Hathaway), Jenkins (Marlon Sanders) e Doyle (Wes Bentley), ele seguirá em busca de uma nova casa. Com o passar dos anos, sua filha Murph (Mackenzie Foy e Jessica Chastain) investirá numa própria jornada para também tentar salvar a população do planeta.",
      ano: "2014",
      tempo: "2h 49min",
      categoria: "Aventura, Drama, Ficção Científica",
      tags: ["espaço", "astronautas", "planetas", "sobrevivência", "família", "viagem", "ciência"],
      direcao: "Christopher Nolan",
      elenco: "Anne Hathaway, Bill Irwin, Ellen Burstyn, Jessica Chastain, Matthew McConaughey",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
      {
      id: "58",
      img: "https://br.web.img3.acsta.net/c_310_420/pictures/14/05/28/21/00/073505.jpg",
      name: "O Grande Hotel Budapeste",
      sinopse: "No período entre as duas guerras mundiais, o famoso gerente de um hotel europeu conhece um jovem empregado e os dois tornam-se melhores amigos. Entre as aventuras vividas pelos dois, constam o roubo de um famoso quadro do Renascimento, a batalha pela grande fortuna de uma família e as transformações históricas durante a primeira metade do século XX.",
      ano: "2014",
      tempo: "1h 40min",
      categoria: "Aventura, Comédia, Drama",
      tags: ["hotel", "amizade", "roubo", "guerras mundiais", "fortuna", "história"],
      direcao: "Wes Anderson",
      elenco: "Adrien Brody, Bill Murray, Edward Norton, F. Murray Abraham, Harvey Keitel",
       visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    
    {
      id: "60",
      img: "https://br.web.img3.acsta.net/c_310_420/pictures/210/527/21052756_20131024195513383.jpg",
      name: "A Viagem de Chihiro",
      sinopse: "Chihiro é uma garota de 10 anos que acredita que todo o universo deve atender aos seus caprichos. Após saber através de seus pais que estarão mudando de cidade ela fica furiosa, sem fazer nenhum esforço para esconder sua raiva. Em meio a lembranças de seus amigos que terá que deixar, Chihiro percebe que seu pai se perdeu no caminho para a nova cidade onde irão morar, indo parar defronte um túnel aparentemente sem fim que é guardado por uma estranha estátua. Curiosos, os pais de Chihiro decidem entrar no túnel. Apesar dos pedidos para voltarem ao carro, Chihiro acaba seguindo junto com eles para descobrir que ele leva a um mundo aparentemente deserto, onde existe uma cidade sem nenhum habitante. Famintos, os pais de Chihiro decidem comer a comida que está disponível em uma das casas, enquanto que a própria Chihiro decide explorar um pouco a cidade. Entretanto, logo ela encontra com Haku, um garoto que lhe diz para ir embora da cidade o mais rápido possível. Ao reencontrar seus pais, Chihiro fica surpresa ao ver que eles se transformaram em gigantescos porcos, enquanto que misteriosos seres começam a surgir do nada. É o início da jornada de Chihiro em um mundo fantasma, povoado por seres fantásticos, no qual humanos não são bem-vindos.",
      ano: "2001",
      tempo: "2h 5min",
      categoria: "Animação, Anime, Aventura, Família, Fantasia, Mistério",
      tags: ["garota, universo, mudança, túnel, mundo deserto, seres fantásticos"],
      direcao: "Hayao Miyazaki",
      elenco: "Miyu Irino Haku, Rumi Hîragi Chihiro,Akio Nakamura Sem-Rosto,Bunta Sugawara Kamajii,Koba Hayashi Deus Malcheiroso",
       visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    {
      id: "61",
      img: "https://br.web.img3.acsta.net/c_310_420/pictures/15/07/20/20/30/209828.jpg",
      name: "Oldboy",
      sinopse: "Oh Dae-su é preso depois de uma bebedeira. Ao sair da cadeia ele resolve ligar para casa. É aniversário de três anos de sua filha. Na cena seguinte acorda em um quarto onde há apenas uma televisão. Sem saber por quem e nem por que, Oh Dae-su fica preso durante 15 anos. Ao sair daquele lugar, procura entender o que se passou em sua vida. Mesmo afastado de tudo ele foi acusado de matar sua mulher. Oh Dae-su quer vingança. Custe o que custar. Para isso terá que viver uma história perturbadora, de fortes emoções.",
      ano: "2003",
      tempo: "2h",
      categoria: "Drama, Mistério, Thriller",
      tags: ["prisão", "vingança", "mistério", "trama perturbadora"],
      direcao: "Park Chan-wook",
      elenco: "Choi Min Shik, Dae-han Ji, Il-han Oo, Jae-woong Park, Kang Hye Jung",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    
    {
      id: "62",
      img: "https://br.web.img3.acsta.net/c_310_420/pictures/15/12/17/18/20/090910.jpg",
      name: "O Regresso",
      sinopse: "Em uma expedição pelo desconhecido deserto americano, o lendário explorador Hugh Glass (Leonardo DiCaprio) é brutalmente atacado por um urso e deixado como morto pelos membros de sua própria equipe de caça. Em uma luta para sobreviver, Glass resiste à dor inimaginável, bem como à traição de seu confidente, John Fitzgerald (Tom Hardy). Guiado pela força de vontade e pelo amor de sua família, Glass deve navegar um inverno brutal em uma incessante busca por sobrevivência e redenção.",
      ano: "2015",
      tempo: "2h 36min",
      categoria: "Aventura, Biografia, Drama, Faroeste, Thriller",
      tags: ["expedição", "sobrevivência", "traição", "redenção"],
      direcao: "Alejandro G. Iñárritu",
      elenco: "Leonardo DiCaprio, Tom Hardy, Arthur RedCloud, Brad Carter, Brendan Fletcher",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    {
      id: "63",
      img: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/87/14/49/19872468.jpg",
      name: "O Labirinto do Fauno",
      sinopse: "Espanha, 1944. Oficialmente a Guerra Civil já terminou, mas um grupo de rebeldes ainda luta nas montanhas ao norte de Navarra. Ofelia (Ivana Baquero), de 10 anos, muda-se para a região com sua mãe, Carmen (Ariadna Gil). Lá as espera seu novo padrasto, um oficial fascista que luta para exterminar os guerrilheiros da localidade. Solitária, a menina logo descobre a amizade de Mercedes (Maribel Verdú), jovem cozinheira da casa, que serve de contato secreto dos rebeldes. Além disso, em seus passeios pelo jardim da imensa mansão em que moram, Ofelia descobre um labirinto que faz com que todo um mundo de fantasias se abra, trazendo consequências para todos à sua volta.",
      ano: "2006",
      tempo: "1h 58min",
      categoria: "Drama, Fantasia, Guerra",
      tags: ["guerra civil", "rebeldes", "amizade", "fantasias"],
      direcao: "Guillermo del Toro",
      elenco: "Ariadna Gil, Doug Jones, Ivana Baquero, Maribel Verdú, Sergi López",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    
    {
      id: "64",
      img: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/92/80/77/20218701.jpg",
      name: "Os Invencíveis",
      sinopse: "Nos anos de 1930, no deserto da Manchúria, três coreanos foras-da-lei envolvem-se numa aventura cheia de ação. O Estranho rouba um mapa de um oficial japonês; O Mau é pago para recuperá-lo; O Bom é um caçador de recompensas que vai atrás dos dois outros homens. Num clima de faroeste, o destino destes três homens se cruza e todos terão de lidar com os exércitos nipônico e chinês, além de vários bandidos russos que cruzam pelo caminho.",
      ano: "2008",
      tempo: "2h 16min",
      categoria: "Ação, Aventura, Comédia, Faroeste, Guerra",
      tags: ["deserto", "aventura", "foras-da-lei", "faroeste"],
      direcao: "Kim Jee Woon",
      elenco: "Deok-jae Jo, Jung Woo-sung, Kijoon Hong, Lee Byung-Hun",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    {
      id: "65",
      img: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/93/34/89/20250778.jpg",
      name: "A Princesa Prometida",
      sinopse: "A princesa Buttercup é raptada por uma bizarra gangue com um plano mirabolante para criar um incidente internacional. Seus membros logo descobrem que estão sendo perseguidos pelo pirata Roberts, que pode ser também Westley, o único - porém já esquecido - amor da princesa. Uma combinação bizarra de lutas de capa e espada, aventura, fantasia e comédia. Um divertidíssimo trabalho do diretor Rob Reiner.",
      ano: "1987",
      tempo: "1h 38min",
      categoria: "Aventura, Comédia, Família",
      tags: ["princesa", "aventura", "comédia", "fantasia", "lutas", "capa e espada"],
      direcao: "Rob Reiner",
      elenco: "Cary Elwes, Chris Sarandon, Mandy Patinkin, Robin Wright, André the Giant",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    
    {
      id: "66",
      img: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/90/70/38/20299699.jpg",
      name: "A Caça",
      sinopse: "Lucas acaba de dar entrada em seu divórcio. Ele tem um novo emprego na creche local, uma nova namorada e está ansioso pela visita de natal de seu filho, Marcus. Mas o espírito de natal desaparece quando Klara, uma aluna de cinco anos de idade, faz uma acusação de abuso sexual contra Lucas, o que desencadeia o ódio de toda a comunidade em que ele vive.",
      ano: "2012",
      tempo: "1h 55min",
      categoria: "Drama",
      tags: ["divórcio", "creche", "acusação", "abuso sexual", "comunidade"],
      direcao: "Thomas Vinterberg",
      elenco: "Mads Mikkelsen, Alexandra Rapaport, Anne Louise Hassing, Annika Wedderkopp, Lars Ranthe",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    {
      id: "67",
      img: "https://br.web.img2.acsta.net/c_310_420/medias/nmedia/18/91/11/73/20130409.jpg",
      name: "Janela Indiscreta",
      sinopse: "Em Greenwich Village, Nova York, L.B. Jeffries (James Stewart), um fotógrafo profissional, está confinado em seu apartamento por ter quebrado a perna enquanto trabalhava. Como não tem muitas opções de lazer, vasculha a vida dos seus vizinhos com um binóculo, quando vê alguns acontecimentos que o fazem suspeitar que um assassinato foi cometido.",
      ano: "1954",
      tempo: "1h 52min",
      categoria: "Mistério, Suspense, Thriller",
      tags: ["fotógrafo", "assassinato", "vizinhos", "suspense", "misterioso"],
      direcao: "Alfred Hitchcock",
      elenco: "Grace Kelly, James Stewart, Thelma Ritter",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    
    {
      id: "68",
      img: "https://br.web.img3.acsta.net/c_310_420/pictures/210/100/21010003_20130603204213408.jpg",
      name: "Clube dos Cinco",
      sinopse: "Em virtude de terem cometido pequenos delitos, cinco adolescentes são confinados no colégio em um sábado, tendo de escrever uma redação de mil palavras sobre o que eles pensam de si mesmos. Apesar de serem pessoas bem diferentes, enquanto o dia transcorre passam a aceitar uns aos outros e várias confissões são feitas entre eles.",
      ano: "1985",
      tempo: "1h 37min",
      categoria: "Comédia, Drama",
      tags: ["adolescentes", "colégio", "redação", "aceitação", "confissões"],
      direcao: "John Hughes",
      elenco: "Ally Sheedy, Anthony Michael Hall, Emilio Estévez, Judd Nelson, Molly Ringwald",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    
    {
      id: "69",
      img: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/65/39/11/19172280.jpg",
      name: "Se Meu Apartamento Falasse",
      sinopse: "Bud Baxter é um funcionário de uma companhia de seguros em Nova York que descobriu uma maneira mais rápida de evoluir de cargo: emprestar seu apartamento para que os executivos da empresa levam para lá suas amantes. O problema começa quando Fran Kubelik, uma dessas mulheres, tenta se matar em seu apartamento.",
      ano: "1960",
      tempo: "2h 5min",
      categoria: "Comédia, Drama, Romance",
      tags: ["companhia de seguros", "apartamento", "amantes", "tentativa de suicídio", "romance"],
      direcao: "Billy Wilder",
      elenco: "Benny Burt, David A.R. White, David Macklin, Dick Cherney, Dorothy Abbott",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    
    {
      id: "70",
      img: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/95/33/59/20397971.jpg",
      name: "A Felicidade Não Se Compra",
      sinopse: "Em Bedford Falls, no Natal, George Bailey (James Stewart), que sempre ajudou a todos, pensa em se suicidar saltando de uma ponte, em razão das maquinações de Henry Potter (Lionel Barrymore), o homem mais rico da região. Mas tantas pessoas oram por ele que Clarence (Henry Travers), um anjo que espera há 220 anos para ganhar asas, é mandado à Terra, para tentar fazer George mudar de ideia, demonstrando sua importância através de flashbacks.",
      ano: "1946",
      tempo: "2h 10min",
      categoria: "Drama, Família, Fantasia",
      tags: ["Natal", "suicídio", "anjo", "flashbacks", "importância"],
      direcao: "Frank Capra",
      elenco: "Donna Reed, Henry Travers, James Stewart, Lionel Barrymore, Thomas Mitchell",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    
    {
      id: "71",
      img: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/95/33/59/20397971.jpg",
      name: "A Felicidade Não Se Compra",
      sinopse: "Em Bedford Falls, no Natal, George Bailey (James Stewart), que sempre ajudou a todos, pensa em se suicidar saltando de uma ponte, em razão das maquinações de Henry Potter (Lionel Barrymore), o homem mais rico da região. Mas tantas pessoas oram por ele que Clarence (Henry Travers), um anjo que espera há 220 anos para ganhar asas, é mandado à Terra, para tentar fazer George mudar de ideia, demonstrando sua importância através de flashbacks.",
      ano: "1946",
      tempo: "2h 10min",
      categoria: "Drama, Família, Fantasia",
      tags: ["Natal", "suicídio", "anjo", "flashbacks", "importância"],
      direcao: "Frank Capra",
      elenco: "Donna Reed, Henry Travers, James Stewart, Lionel Barrymore, Thomas Mitchell",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    },
    
    {
      id: "72",
      img: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/91/22/03/20135122.jpg",
      name: "Noivo Neurótico, Noiva Nervosa",
      sinopse: "Alvy Singer (Woody Allen), um humorista judeu e divorciado que faz análise há quinze anos, acaba se apaixonando por Annie Hall (Diane Keaton), uma cantora em início de carreira com uma cabeça um pouco complicada. Em um curto espaço de tempo eles estão morando juntos, mas depois de um certo período crises conjugais começam a se fazer sentir entre os dois.",
      ano: "1977",
      tempo: "1h 33min",
      categoria: "Comédia, Romance",
      tags: ["humorista", "análise", "apaixonado", "crises conjugais"],
      direcao: "Woody Allen",
      elenco: "Carol Kane, Diane Keaton, Paul Simon, Tony Roberts, Woody Allen",
     visualizacao: 1,
      avaliacoes: 1,
      like: 1
    }
      ]

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
function exibirResultados(filmes, tags) {
  let tela = document.getElementById('telas');
  let strHtml = '';
  let objDados = lerDados();

  // Ordenar os filmes com base no maior número de tags destacadas em ordem decrescente
  filmes.sort((a, b) => contarTagsDestacadas(b.tags, tags) - contarTagsDestacadas(a.tags, tags));

  filmes.forEach(filme => {
    strHtml += `<div class="filmes" onclick="window.location.href='resultado.html?query=${filme.id}'">
      <div class="title-img">
        <img class="capa" src="${filme.img}">
      </div>
      <div class="info-filmes">
      <p><h2 style="text-transform: uppercase;"><strong>${filme.name}</strong></h2></p>
        <p>
          <strong style="color:black">Sinopse:</strong> ${filme.sinopse.length > 20 ? filme.sinopse.substring(0, 300).concat('...') : filme.sinopse}<br>
          <strong style="color:black">Ano:</strong> ${filme.ano}<br>
          <strong style="color:black">Tempo:</strong> ${filme.tempo}<br>
          <strong style="color:black">Categoria:</strong> ${filme.categoria}<br>
          <strong style="color:black">Tags:</strong> ${destacarTags(filme.tags, tags)}<br>
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
  });

  salvarDados(objDados);
  tela.innerHTML = strHtml;
}

function destacarTags(tagsFilme, tagsDestaque) {
  const tagsHtml = tagsFilme
    .map(tag => {
      const destacada = tagsDestaque.includes(tag) ? 'tagDestacada' : '';
      return `<span class="${destacada}">${tag}</span>`;
    })
    .join(', ');

  return tagsHtml;
}

function contarTagsDestacadas(tagsFilme, tagsDestaque) {
  let contador = 0;

  tagsFilme.forEach(tag => {
    if (tagsDestaque.includes(tag)) {
      contador++;
    }
  });

  return contador;
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
  let tela = document.getElementById('lista-filmespopulares');
  let strHtml = '';

  filmes.forEach(filme => {
    strHtml += `
    <div class="filmes" onclick="window.location.href='resultado.html?query=${filme.id}'">
      <div class="title-img">
        <h2 style="text-transform: uppercase; width:208px"><strong>${filme.name}</strong></h2><br>
        <img class="capa" src="${filme.img}">
      </div>
      <div class="info-filmes">
        <p>
          <strong style="color:black">Sinopse:</strong> ${filme.sinopse.length > 20 ? filme.sinopse.substring(0, 300).concat('...') : filme.sinopse}<br>
          <strong style="color:black">Ano:</strong> ${filme.ano}<br>
          <strong style="color:black">Tempo:</strong> ${filme.tempo}<br>
          <strong style="color:black">Categoria:</strong> ${filme.categoria}<br>
          <strong style="color:black">Tags:</strong> ${filme.tags}<br>
          <strong style="color:black">Direção:</strong> ${filme.direcao}<br>
          <strong style="color:black">Elenco:</strong> ${filme.elenco}<br>
          <strong style="color:black">Visualizações:</strong> ${filme.visualizacao}
        </p>
      </div>
    </div>`;
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


