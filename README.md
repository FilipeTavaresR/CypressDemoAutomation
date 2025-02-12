
# Cypress End-to-End UI Tests for Registration Form

Este projeto contém testes de interface de usuário (UI) automatizados usando Cypress para o formulário de cadastro do site de exemplo [Automation Testing Demo](https://demo.automationtesting.in/Register.html).

## Objetivo

O objetivo deste projeto é validar o funcionamento correto do formulário de cadastro, cobrindo os seguintes cenários:

- Cadastro com sucesso.
- Validação de campos obrigatórios.
- Validação de e-mails inválidos.
- Validação de senhas fracas e não coincidentes.
- Validação de telefone inválido.

## Tecnologias Utilizadas

- **Cypress**: Para automação de testes end-to-end.
- **PageObjects**: Organização do projeto utilizando o padrão Page Object para mapear elementos da UI.
- **Fixtures**: Para armazenar dados de teste (massas de dados fixas).

## Estrutura do Projeto

A estrutura do projeto está organizada da seguinte forma:

```
/cypress
  /fixtures      # Dados de teste (massas de dados)
  /e2e           # Testes end-to-end
  /support       # Comandos e configurações auxiliares (se necessário)
  /pages         # Classes para representar as páginas e suas interações 
cypress.config.js # Configurações do Cypress
```

### Principais Arquivos

- **Fixtures**: Contém os dados utilizados nos testes, como informações de usuário válidas e inválidas.
- **Pages**: Contém classes que representam as páginas do site e as interações com o formulário de cadastro.
- **Testes (e2e)**: Contém os cenários de teste que validam o comportamento do formulário de cadastro.

## Como Rodar o Projeto

### Pré-requisitos

- **Node.js** (versão >= 14.x.x)
  
### Passos

1. Clone este repositório:
   ```bash
   git clone https://github.com/FilipeTavaresR/CypressDemoAutomation.git
   ```

2. Navegue até a pasta do projeto:
   ```bash
   cd caminho/CypressDemoAutomation
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Para rodar os testes, execute:
   ```bash
   npx cypress open
   ```
   Isso abrirá a interface gráfica do Cypress, onde você pode selecionar e rodar os testes.

## Testes Implementados

1. **Should register successfully with valid data**: Valida o preenchimento completo e correto do formulário.
2. **Should show error when fields are empty**: Valida se os campos obrigatórios geram mensagens de erro adequadas quando deixados em branco.
3. **Should show error when an invalid email is entered**: Testa o comportamento ao inserir um email inválido.
4. **should show error when a weak password is entered**: Testa senhas fracas.
5. **Should show error when an invalid phone is entered**: Testa um número de telefone inválido.
6. **Should show error for mismatched passwords**: Testa senhas que não coincidem com a confirmação.

## Contribuições

Você pode explorar este projeto e aprender sobre a implementação de testes end-to-end com Cypress.

## Licença

Este projeto não possui uma licença formal, mas é de código aberto para fins educacionais.
