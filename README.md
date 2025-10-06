# Blog Frontend - Tech Challenge

## Este projeto é o frontend de um blog estudantil, desenvolvido em **Next.js 15** com **React**, **TypeScript**, **TailwindCSS** e autenticação via **JWT**.

---

## 🌐 Tecnologias Utilizadas

- **Next.js 15** (App Router)
- **React 18** + **TypeScript**
- **TailwindCSS**
- **React Hook Form**
- **React Hot Toast**
- **Zustand** (State Management)
- **React Icons**

---

## ✅ Funcionalidades Principais

- Login e Cadastro de usuários
- Proteção de rotas por perfil (Aluno / Professor) com `WithRole`
- CRUD de Posts (somente Professores podem criar/editar)
- Pesquisa de posts com contexto global (`SearchContext`)
- Componentes reutilizáveis (Inputs, Botões, Navbar, Loader)
- Responsividade mobile/desktop

---

## 📂 Estrutura de Diretórios

├── app/
│ ├── api/ # Endpoints do frontend para proxy do backend
│ │ ├── login/ # API route para login
│ │ ├── posts/ # API route para posts
│ │ └── auth/ # API route para registro
│ ├── libs/
│ │ ├── stores/ # Zustand store (auth, etc.)
│ │ └── contexts/ # Context API (ex: SearchContext)
│ ├── components/ # Componentes reutilizáveis
│ │ ├── Avatar/ # Avatar do usuário
│ │ ├── Button/ # Botões estilizados
│ │ ├── ClientOnly/ # Render condicional só no client
│ │ ├── Container/ # Wrapper responsivo
│ │ ├── EmptyState/ # Componente para estado vazio
│ │ ├── Heading/ # Títulos e subtítulos
│ │ ├── Input/ # Inputs de formulário
│ │ ├── Loader/ # Skeleton / Spinner
│ │ ├── Modal/ # Modais
│ │ ├── Navbar/ # Barra de navegação
│ │ ├── PageHeading/ # Cabeçalho de página
│ │ ├── PostList/ # Lista de posts
│ │ ├── Protected/ # Guard para as páginas
│ │ ├── SelectInput/ # Componente de Select
│ │ └── TextArea/ # Text Area
│ ├── pages/ # Páginas públicas e protegidas
│ │ ├── home/ # Dashboard de posts
│ │ ├── posts/
│ │ │ ├── create/ # Criar novo post
│ │ │ └── [postId]/ # Editar / deletar post
│ │ └── auth/ # Login e registro
├── public/ # Imagens e assets públicos
│ └── static/images/
├── next.config.js # Configurações Next.js
├── tsconfig.json # TypeScript config
├── package.json
└── .env # Variáveis de ambiente

## 🛠️ Componentes

| Componente    | Descrição                                                       |
| ------------- | --------------------------------------------------------------- |
| `Avatar`      | Mostra a foto do usuário no menu, com fallback para placeholder |
| `Button`      | Botão estilizado reutilizável com ícones                        |
| `ClientOnly`  | Renderiza o conteúdo apenas no client (útil para SSR)           |
| `Container`   | Wrapper responsivo para centralizar conteúdo                    |
| `EmptyState`  | Exibe uma mensagem quando não há dados                          |
| `Heading`     | Títulos e subtítulos com tipografia consistente                 |
| `Input`       | Inputs controlados com React Hook Form                          |
| `Loader`      | Spinner ou skeleton de carregamento                             |
| `Modal`       | Modal reutilizável para formulários ou alertas                  |
| `Navbar`      | Barra de navegação com menu, avatar e responsividade            |
| `PageHeading` | Cabeçalho da página com título e descrição                      |
| `PostList`    | Lista de posts com cards, usada na página inicial               |

## ❗️ Pontos importantes

Autenticação: JWT salvo no Zustand store (AuthStore)

Busca global: SearchContext com provider

Responsividade: Navbar adaptativa, menu mobile

Avatar: Componente reutilizável para exibir o usuário

Feedback: Toasts com react-hot-toast

Formulários: Gerenciados com react-hook-form, incluindo validações

## ⚙️ Configuração do `.env`

Crie um arquivo `.env` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=http://localhost:3010  # URL do backend
```

## 🚀 Comandos para Desenvolvimento

1. Instalar dependências

```
npm install
```

2. Rodar o projeto localmente

```
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:3000
```

3. Build para produção

```
npm run build
npm run start
```

---

Feito com ❤️ para a aplicação Blog Frontend.
