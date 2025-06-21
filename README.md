# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:
## Hướng dẫn cài đặt môi trường Dev (Bắt buộc)

Để chạy dự án này trên máy local với HTTPS (cần thiết để xử lý cookie an toàn trong môi trường dev), bạn cần thực hiện các bước sau **MỘT LẦN DUY NHẤT** trên máy tính của mình.

### Bước 1: Cài đặt mkcert

`mkcert` là một công cụ để tạo chứng chỉ SSL được tin cậy trên máy local.

- **Trên Windows (dùng Chocolatey):**
  *Nếu chưa có Chocolatey, hãy cài đặt nó trước.*
  ```powershell
  choco install mkcert
  ```

- **Trên macOS (dùng Homebrew):**
  ```bash
  brew install mkcert
  ```

### Bước 2: Cài đặt Local CA (Quan trọng nhất)

Sau khi cài `mkcert`, chạy lệnh sau để máy tính và trình duyệt của bạn "tin tưởng" các chứng chỉ do nó tạo ra:

```bash
mkcert -install
```

### Bước 3: Cài đặt Dependencies của dự án

Di chuyển vào thư mục dự án và chạy:
```bash
npm install
```

### Bước 4: Chạy dự án

```bash
npm run dev
```

Server sẽ khởi động tại `https://localhost:5173`.

---

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
