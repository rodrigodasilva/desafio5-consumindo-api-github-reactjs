# Rascunho de estudo

- Para facilitar a inicialização de projetos sem ter que configurar o babel, webpack, webpack server, etc tudo do zero o react disponibilizar uma 'CLI' (Interface de Linha de Comando) que gera toda a estrutura pronta
  > yarn create react-app modulo05

## Configurando ESLint, Prettier e EditorConfig

### EditorConfig

- Primeria adicionamos a extensão 'EditorConfig' no programa que estamo usando
- Na raiz do projeto clicamos com o botão direito e selecionamos a opção 'Generate .editorconfig' e modificamos as opções 'false' para 'true'. O arquivo ficará da seguinte forma:

```
root = true

[*]
end_of_line = lf
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

### ESLint e Prettier

- ESLint: procura por erros
- Prettier: deixa o código mais 'bonito'

1. Adicionamos o 'eslint' como depedência de desenvolvimento
   > yarn add eslint -D
2. Inicializamos o arquivo de configuração do eslint
   > yarn eslint --init
3. Selecionamos as seguintes opções que vão aparecer no terminal
   3.1. How would you like to use ESLint?
   To check syntax only
   To check syntax and find problems
   ❯ To check syntax, find problems, and enforce code style

   3.2. What type of modules does your project use? (Use arrow keys)
   ❯ JavaScript modules (import/export)
   CommonJS (require/exports)
   None of these

   3.3. Which framework does your project u
   se? (Use arrow keys)
   ❯ React
   Vue.js
   None of these

   3.4. Where does your code run?
   ❯ ◉ Browser
   ◯ Node

   3.5. How would you like to define a style for your project?
   (Use arrow keys)
   ❯ Use a popular style guide
   Answer questions about your style
   Inspect your JavaScript file(s)

   3.6. Which style guide do you want to follow? (Use arrow keys)
   ❯ Airbnb (https://github.com/airbnb/javascript)
   Standard (https://github.com/standard/standard)
   Google (https://github.com/google/eslint-config-google)

   3.7. What format do you want your config file to be in? (Use arrow keys)
   ❯ JavaScript
   YAML
   JSON

4. A instalação é feita por padrão utilizando o 'npm', o que gera
   um arquivo 'package-lock.json', mas como estamos trabalhando
   com o yarn, removemos este arquivo e rodamos o yarn para realizar
   o mapeamento das novas dependencias no 'yarn.lock'

   > yarn

5. Instalamos a extenção ESlint na IDE

6. Adicionamos as bibliotecas para integração do ESlint com o Prettier

   > yarn add prettier eslint-config-prettier eslint-plugin-prettier babel-eslint -D

7. Configuramos o arquivo '.eslintrc.js'

```
module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["airbnb", "prettier", "prettier/react"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "react/jsx-filename-extension": ["warn", { extensions: [".jsx", ".js"] }],
    "import/prefer-default-export": "off"
  }
};
```

8. Criamos um arquivo '.prettierrc' para resolver problema de regras duplicadas entre o ESlint e o Prettier na raiz do projeto

```
{
  "singleQuote": true,
  "trailingComma": "es5"
}
```

9. No arquivo 'settings.json' do VSCode inserimos as configurações abaixo

```
"eslint.autoFixOnSave": true,
"eslint.validate": [
  {
    "language": "javascript",
    "autoFix": true
  },
  {
    "language": "javascriptreact",
    "autoFix": true
  }
],
```

10. Dá um fix em todos os arquivos '.js' na pasta 'src'
    > yarn eslint --fix src --ext .js

## Roteamento no React

- Para fazer o roteamento entre uma página e outra o react tem um módulo pronto chamado 'react-router-dom'
  > yarn add react-router-dom
  > Importações utilizadas

```
import { BrowserRouter, Switch, Route } from 'react-router-dom';
```

- BrowserRouter: define o estilo de chamada das rotas
- Switch: Garante que apenas uma rota seja chamada por vez, já que o react-router-dom pode chamar mais de uma rota, quando necessário
- Route: representa a rota com a página da aplicação

- Parâmetro 'exact' passado no 'route' garante que a rota seja chamada somente de a chamada for exatamente igual o 'path'.

```
<BrowserRouter>
  <Switch>
    <Route path="/" exact component={Main} />
    <Route path="/repository" component={Repository} />
  </Switch>
</BrowserRouter>
```

## Styled Components

Muda a forma como escrevemos css em aplicações react/react-native

- Adicionamos sua dependência

  > yarn add styled-components

- Instalamos a extensão 'vscode-styled-components
  ' no editor
- Criamos um arquivo externo para estilização, só que em formato '.js', importando a biblioteca 'styled-components'

### Funcionalidades

- Passar um proriedade como paramêtro podemos acessar no arquivo 'styles' e usar este paramêtro para definir a cor do elemento por exemplo

```
<Title error={false}>
```

```
export const Title = styled.h1`
color: ${props => (props.error ? 'red' : '#7159c1')};
....
```

### Definindo estilos globais

- Criamos uma pasta 'style' dentro de 'src' e dentro dela um arquivo 'global.js' que vai receber as propriedades css globais da aplicação

```
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100%;
  }

  body {
    background: #7159c1;
    -webkit-font-smoothing: antialiased!important;
  }
`;
```

- Importamos o arquivo em 'App.js' para aplicar a estilização globalmente.

```
import React from 'react';
import Routes from './routes';
import GlobalStyle from './styles/global';

function App() {
  return (
    <>
      <Routes />
      <GlobalStyle />
    </>
  );
}

export default App;
```

### Estilizando página Main

- Para trabalhar com icones adicionamos a depência 'react-icons' que vem com os pacotes de icones mais famosos
  > yarn add react-icons
- Importando um svg

```
import { FaGithubAlt, FaPlus } from 'react-icons/fa';
```

```
<h1>
        <FaGithubAlt />
        Repositórios
      </h1>
```

- Passando atributos dos componentes através do método 'Styled Component'. Podemos definir, por exemplo, que o botão é do tipo 'submit' no 'Styled Component' ao invés de ser no componente em si

```
export const SubmitButton = styled.button.attrs({
  type: 'submit',
})`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
```

## Adicionando repositórios

- Vamos buscar na API do github a informação do repositório e salvar no estado do componente
- Para consumir essa API utilizamos o 'axios'

  > yarn add axios

- Dentro da pasta 'src' criamos uma pasta chamada 'services' e dentro dela um arquivo 'api.js'

## Navegando entre paginas com 'react-router-dom'

- Para fazer a navegação utilizamos um link proprio desta biblioteca

- Passando paramentros no link

```
  <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
    Detalhes
  </Link>
```

- Declarando esses parametros no arquivo de rota

```
  <Route path="/repository/:repository" component={Repository} />
```

- Capturando esses paramêtros no componente

```
  export default function Repository({ match }) {
  return <h1>Repository: {decodeURIComponent(match.params.repository)} </h1>;
  }
```
