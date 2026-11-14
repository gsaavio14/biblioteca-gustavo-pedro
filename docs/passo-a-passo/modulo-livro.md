# Passo a passo: módulo livro (CRUD)

Este guia mostra como o módulo `livro` foi construído, da entidade até as telas. Ele serve de modelo para os demais módulos do sistema (autor, usuário e empréstimo).

Fluxo geral: navegador -> rota do controller -> service -> banco de dados -> view EJS -> navegador.

## 1. Estrutura de arquivos

```
src/modules/livro/
  livro.entity.ts          <- tabela do banco
  livro.service.ts         <- regras e acesso ao banco
  livro.controller.ts      <- rotas
  livro.module.ts          <- junta controller e service
  livro.view.helpers.ts    <- helpers usados só nas views do livro
  dtos/
    create-livro.dto.ts    <- regras de validação do formulário
views/livro/
  index.ejs                <- listagem
  formulario.ejs           <- cadastro e atualização
  exclusao.ejs             <- confirmação de exclusão
```

## 2. Entidade (`livro.entity.ts`)

A classe `Livro` estende `BaseEntity` e é mapeada para a tabela `livro`. Campos:

| Campo | Tipo | Observação |
|---|---|---|
| `id` | int | chave primária gerada pelo banco |
| `titulo` | varchar(200) | |
| `isbn` | varchar(20) | |
| `editora` | varchar(100) | |
| `anoPublicacao` | int | |
| `genero` | varchar(100) | |
| `quantidadeTotal` | int | exemplares que a biblioteca possui |
| `quantidadeDisponivel` | int | exemplares na estante |
| `sinopse` | text | opcional no banco |
| `criadoEm` / `atualizadoEm` | datetime | preenchidos automaticamente |

Com `DB_SYNCHRONIZE=true`, a tabela é criada ao iniciar a aplicação. Isso só funciona porque o arquivo termina em `.entity.ts` (veja `database.providers.ts`).

## 3. Service (`livro.service.ts`)

| Método | O que faz |
|---|---|
| `findAll()` | lista todos os livros |
| `findOne(id)` | busca um livro; retorna `null` se não existir |
| `create(dados)` | cria o livro com `quantidadeDisponivel` igual ao total |
| `update(id, dados)` | atualiza; se o total mudar, ajusta a quantidade disponível pela diferença |
| `remove(id)` | exclui; retorna `false` se não existir |

## 4. Validação (`create-livro.dto.ts`)

O DTO usa `class-validator` com mensagens em português. Os campos numéricos usam `@Type(() => Number)`, porque o formulário envia texto. Todo campo precisa ter ao menos um decorator, senão o `whitelist: true` do `ValidationPipe` o descarta.

Quando há erro, o `@ValidationView` reabre o formulário com os dados digitados e a lista de erros, em vez de retornar JSON.

## 5. Rotas (`livro.controller.ts`)

| Método | Rota | Ação |
|---|---|---|
| GET | `/livros` | lista os livros |
| GET | `/livros/novo` | formulário de cadastro |
| POST | `/livros/novo` | valida e salva; redireciona para `/livros` |
| GET | `/livros/:id/atualizacao` | formulário preenchido |
| POST | `/livros/:id/atualizacao` | valida e atualiza |
| GET | `/livros/:id/exclusao` | tela de confirmação |
| POST | `/livros/:id/exclusao` | exclui e redireciona |

Formulários HTML só enviam GET e POST, por isso a exclusão usa POST.

## 6. Views

- `index.ejs`: tabela com `forEach` sobre `listaLivros`, botões Atualizar e Excluir e botão Novo livro.
- `formulario.ejs`: um formulário só para cadastro e atualização. O título e o `action` mudam conforme exista `livro.id`.
- `exclusao.ejs`: mostra os dados do livro e pede confirmação.
- Helpers usados: `dateFormat` (global, em `app.locals`), `validationErrors` (global) e `_h.rotuloDisponibilidade` (do módulo, enviado pelo controller).

## 7. Como testar

1. `npm run start:dev` com o MySQL ligado e o `.env` preenchido.
2. Acesse `http://localhost:3000/livros`.
3. Cadastre um livro com campos vazios: devem aparecer os avisos de validação.
4. Cadastre um livro válido: ele aparece na lista com a etiqueta Disponível.
5. Atualize o livro e mude a quantidade de exemplares: a quantidade disponível acompanha a diferença.
6. Exclua o livro: cancele uma vez e confirme outra.

## 8. Checklist para criar um novo módulo

- Criar `src/modules/<nome>/<nome>.entity.ts` (nome do arquivo terminando em `.entity.ts`).
- Criar `<nome>.service.ts` com `findAll`, `findOne`, `create`, `update` e `remove`.
- Criar `dtos/create-<nome>.dto.ts` com as validações.
- Criar `<nome>.controller.ts` com as rotas da tabela acima.
- Criar `<nome>.module.ts` e importá-lo no `AppModule`.
- Criar as views em `views/<nome>/` (`index`, `formulario`, `exclusao`).
- Acrescentar o link no menu em `views/layouts/main.ejs`.


## Professor, fiz esse guia de funcionalidade pq o senhor fez no seu projeto também. 