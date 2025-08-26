# Order Frontend

### Site do projeto

https://order-frontend-psi.vercel.app/

---

### Sumário

- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Tecnologias utilizadas](#tecnologias-utilizadas)

---

### Requisitos

- **Node.js**: `v20.18.1`  
  Recomenda-se usar **nvm** para fixar a versão por projeto:

  ```sh
  nvm install 20.18.1
  nvm use 20.18.1
  ```

- **npm** (dei preferência em usar o npm pois ele ja vem com o Node, outros como yarn e pnpm precisam ser instalados)

---

### Instalação

1. **Instalar as dependências**

```sh
npm install
```

2. **Rodar em desenvolvimento**

```sh
npm run dev
```

> A aplicação foi configurada para rodar em `http://localhost:3000`.

3. **Rodar os testes unitários**

```sh
npm run test:unit
```

---

### Tecnologias utilizadas

- **Vue 3**
- **Vue Router**
- **Vite**
- **Vitest** (+ @vue/test-utils) – _testes unitários_
- **Cypress** – _planejado; ainda sem testes E2E_
- **Tailwind CSS**
- **Lucide Icons** (`lucide-vue-next`)
- **Axios**
- **ESLint**
- **Prettier**
