# SARA — Sistema de Administração do Restaurante Acadêmico

Sistema web para controle nutricional, cardápios, reservas de refeições e monitoramento de desperdício no IFCE. Protótipo frontend organizado no padrão **MVC**, com telas separadas em arquivos HTML e carregamento dinâmico — sem necessidade de script de build.

## Funcionalidades

### Perfil Aluno

* Dashboard com KPIs, refeição do dia e ranking da turma
* Reserva de refeições e tickets digitais
* Controle nutricional (macros, calorias, tabela)
* Ranking de turmas
* Transparência de desperdício e impacto financeiro
* Perfil com restrições alimentares e histórico

### Perfil Nutricionista

* Dashboard administrativo com alertas e gráficos
* Gerenciamento de cardápios, tickets e cadastros
* Registro de desperdício com cálculos automáticos
* Módulo financeiro, análises e relatórios
* Gerenciamento de ranking de turmas

### Autenticação

* Tela de login institucional
* Cadastro em 3 passos (modal)
* Recuperação de senha (modal)
* Acesso rápido demo (Aluno / Nutricionista)

## Tecnologias

| Camada      | Tecnologia                               |
| ----------- | ---------------------------------------- |
| Frontend    | HTML5, CSS3, JavaScript (ES Modules)     |
| Arquitetura | MVC (Model — View — Controller)          |
| Fontes      | Google Fonts (Outfit, Space Grotesk)     |
| Ícones      | Font Awesome 6.5                         |
| Gráficos    | Canvas HTML5 (sem dependências externas) |
| Dados       | Mock local (protótipo sem backend)       |

## Estrutura do projeto

```
SARA/
├── index.html                  # Redireciona para auth/login.html
│
├── models/                     # MODEL — dados e regras de negócio
│   ├── AppState.js
│   ├── UserModel.js
│   ├── TicketModel.js
│   ├── CardapioModel.js
│   └── ...
│
├── controllers/                # CONTROLLER — lógica e orquestração
│   ├── AuthController.js
│   ├── RouterController.js
│   ├── AlunoController.js
│   └── NutriController.js
│
├── views/
│   ├── html/                   # VIEW (HTML) — markup das telas
│   │   ├── auth/               # Login, cadastro, recuperação
│   │   ├── layout/             # Sidebar e topbar
│   │   ├── aluno/              # Telas do aluno
│   │   ├── nutri/              # Telas da nutricionista
│   │   ├── modals/             # Modais do app
│   │   └── shared/             # Notificações
│   └── js/                     # VIEW (JS) — renderização no DOM
│       ├── AlunoView.js
│       ├── NutriView.js
│       └── BaseView.js
│
├── auth/
│   └── login.html              # Entrada da autenticação (shell)
│
├── app/
│   └── index.html              # Entrada do sistema (shell)
│
└── assets/
    ├── css/styles.css
    └── js/
        ├── main.js             # Bootstrap
        ├── config/             # Rotas e lista de views
        └── services/           # Toast, modal, gráficos, sessão
```

## Padrão MVC

As três camadas ficam em **pastas próprias na raiz do projeto**:

```
Usuário clica no HTML
        │
        ▼
  Controller  ──lê/escreve──▶  Model
        │
        ▼
  View (JS) atualiza o DOM
```

### Model — `models/`

Responsável por **dados e regras de negócio**. Não manipula HTML.

| Arquivo               | Domínio                                               |
| --------------------- | ----------------------------------------------------- |
| `AppState.js`         | Estado global (usuário logado, página atual, filtros) |
| `UserModel.js`        | Usuários e login                                      |
| `TicketModel.js`      | Tickets de refeição                                   |
| `CardapioModel.js`    | Cardápio e tipos de refeição                          |
| `RankingModel.js`     | Ranking de turmas                                     |
| `DesperdicioModel.js` | Registros e cálculos de desperdício                   |
| `FinanceiroModel.js`  | Dados financeiros                                     |
| `CadastroModel.js`    | Cadastros pendentes                                   |
| `NotificacaoModel.js` | Notificações                                          |

### View — duas camadas

| Camada        | Pasta         | O que faz                           |
| ------------- | ------------- | ----------------------------------- |
| **View HTML** | `views/html/` | Estrutura visual das telas (markup) |
| **View JS**   | `views/js/`   | Renderiza dados do Model no DOM     |

| Arquivo JS     | Telas que renderiza                                  |
| -------------- | ---------------------------------------------------- |
| `AlunoView.js` | Dashboard, reservas, nutrição, ranking, etc. (aluno) |
| `NutriView.js` | Dashboard, tickets, cardápio, etc. (nutricionista)   |
| `BaseView.js`  | Utilitários compartilhados (KPI cards, setHTML)      |

### Controller — `controllers/`

Orquestra Model ↔ View. Recebe eventos do HTML (`onclick`) e decide o que fazer.

| Arquivo               | Responsabilidade                              |
| --------------------- | --------------------------------------------- |
| `AuthController.js`   | Login, logout, cadastro, recuperação de senha |
| `RouterController.js` | Navegação entre telas (`goPage`)              |
| `AlunoController.js`  | Reservas, tickets, perfil (aluno)             |
| `NutriController.js`  | Cardápio, tickets, ranking, cadastros (nutri) |

### Exemplo de fluxo

```
1. Aluno clica "Reservar" no HTML
2. AlunoController.reservarRefeicao()     ← Controller
3. CardapioModel.findById()               ← Model (busca refeição)
4. TicketModel.create()                   ← Model (cria ticket)
5. AlunoView.renderReservas()             ← View (atualiza tela)
```

### O que NÃO é MVC

| Arquivo/Pasta         | Papel real                                       |
| --------------------- | ------------------------------------------------ |
| `index.html`          | Redirecionamento                                 |
| `auth/login.html`     | Shell de entrada (carrega HTML de auth)          |
| `app/index.html`      | Shell de entrada (carrega HTML do app)           |
| `assets/js/main.js`   | Bootstrap — conecta tudo e expõe funções globais |
| `assets/js/services/` | Utilitários (toast, modal, gráficos, sessão)     |

## Como executar

O projeto carrega telas via `fetch`, portanto **é necessário um servidor HTTP local** (abrir o arquivo direto no navegador não funciona).

```powershell
cd caminho/para/SARA
python -m http.server 8765
```

Acesse no navegador:

* **Entrada:** [http://localhost:8765](http://localhost:8765) (redireciona para login)
* **Login:** [http://localhost:8765/auth/login.html](http://localhost:8765/auth/login.html)
* **App:** [http://localhost:8765/app/index.html](http://localhost:8765/app/index.html) (requer login)

### Login demo

| Perfil        | E-mail                               | Senha      |
| ------------- | ------------------------------------ | ---------- |
| Aluno         | `antonio.soares08@aluno.ifce.edu.br` | `12345678` |
| Nutricionista | `jessica.silva@ifce.edu.br`          | `12345678` |

Também é possível usar os botões rápidos **Aluno** e **Nutricionista** na tela de login.

## Como editar telas

Não é necessário rodar nenhum script de build. Basta editar o HTML e recarregar a página (F5).

| O que editar                 | Onde                    |
| ---------------------------- | ----------------------- |
| Login, cadastro, recuperação | `views/html/auth/`      |
| Telas do aluno               | `views/html/aluno/`     |
| Telas da nutricionista       | `views/html/nutri/`     |
| Sidebar e topbar             | `views/html/layout/`    |
| Modais do app                | `views/html/modals/`    |
| Estilos                      | `assets/css/styles.css` |
| Lógica e dados               | `assets/js/`            |

### Adicionar uma nova tela ao app

1. Crie o HTML em `views/html/aluno/` ou `views/html/nutri/`
2. Registre o arquivo em `assets/js/config/appViews.js` (array `APP_PAGES`)
3. Adicione a rota em `assets/js/config/routes.js`
4. Crie o método de renderização em `views/js/` e vincule no `RouterController`

## Fluxo da aplicação

```
index.html → auth/login.html → app/index.html
                  │                    │
                  ▼                    ▼
           views/html/auth/     views/html/{layout,aluno,nutri}
                  │                    │
                  └──── controllers/ ──┘
                              │
                         models/
```

A sessão do usuário é mantida em `sessionStorage` entre `auth/` e `app/`.

## Arquivos legados

Os arquivos na raiz do repositório são mantidos apenas como referência histórica:

* `GRA TESTE.HTML`
* `GRA TESTE.CSS`

O sistema ativo utiliza a estrutura MVC descrita acima.

## Licença

Projeto acadêmico — IFCE.
