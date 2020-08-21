import api from './api';

class teste {
  constructor() {
    //criando array dos repositorios 
    this.repositories = [];

    //registrando referencia do input
    this.formElement = document.getElementById('repo-form');
    this.inputElement = document.querySelector('input[name=repository]');

    //registrando referenia da lista
    this.listElement = document.getElementById('repo-list');  

    this.registerEvent();
  }

  //registrar os eventos usando arrow function
  registerEvent(){
    this.formElement.onsubmit = event => this.addRepository(event);
  }

  //configurando o loading
  setLoading(loading = true){
    if(loading === true) {
      let loadingElement = document.createElement('span');
      loadingElement.appendChild(document.createTextNode('Carregando'));
      loadingElement.setAttribute('id', 'loading');

      this.formElement.appendChild(loadingElement);
    }else {
      document.getElementById('loading').remove();
    }
  }
  //adicionar novo repositorio
  async addRepository(){
   event.preventDefault();

   //pegar o valor do input
   const repoInput = this.inputElement.value;

   this.setLoading();

   try {
   //checando se o valor nao e nulo
   if(repoInput.length === 0)
    return;

    //obtendo resposta da api
    const response = await api.get(`/repos/${repoInput}`);

    //desestruturaçao
    const {name, description, owner: {avatar_url, html_url} } = response.data;

    //push = empurrando novo para o this.repositories
   this.repositories.push({
      name,
      description,
      avatar_url,
      html_url,
   });

   //Passando valor vazio para input
   this.inputElement.value = '';

   //renderizando tudo na tela
   this.render();
    } catch (err) {
      alert('O repositorio nao existe');
    }

    //finalizando loading como false
    this.setLoading(false);
  }

  render() {
    this.listElement.innerHTML = '';

    this.repositories.forEach(repo => {
      
      //variavel criando a imagem
      let imgElement = document.createElement('img');
      imgElement.setAttribute('src', repo.avatar_url);

      //ccriando variavel strong
      let titleElement = document.createElement('strong');
      titleElement.appendChild(document.createTextNode(repo.name));

      // criando variavel descricao 
      let descriptionElement = document.createElement('p');
      descriptionElement.appendChild(document.createTextNode(repo.description));

      //criando variavel para link
      let linkElement = document.createElement('a');
      linkElement.setAttribute('target', '_blank');
      linkElement.setAttribute('href', repo.html_url);
      linkElement.appendChild(document.createTextNode('Acessar'));

      //criando todos os elementos dentro da lista 
      let listItemElement = document.createElement('li');
      listItemElement.appendChild(imgElement);
      listItemElement.appendChild(titleElement);
      listItemElement.appendChild(descriptionElement);
      listItemElement.appendChild(linkElement);

      //salvando todos dentro da lista 
      this.listElement.appendChild(listItemElement);

    });
  }
}
  
new teste();