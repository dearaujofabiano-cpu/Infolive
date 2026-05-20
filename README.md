# InfoLive Brasil — LensCtrl Prototype

Protótipo do sistema de gestão de equipamentos desenvolvido para a Infolive Brasil.

## 🚀 Deploy na Vercel

### Opção 1 — Via GitHub (recomendado)
1. Faça upload desta pasta no GitHub
2. Acesse vercel.com → "New Project" → importe o repositório
3. Configurações automáticas detectadas pelo Vite
4. Clique em **Deploy**

### Opção 2 — Via Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Opção 3 — Deploy da pasta /dist
```bash
npm run build
vercel deploy dist --prod
```

## 💻 Rodar localmente
```bash
npm install
npm run dev
```

## 👤 Login Demo
| Employee ID | Senha | Perfil |
|-------------|-------|--------|
| IL-000001 | 123456 | Admin |
| IL-000042 | 123456 | Cameraman |
| IL-000031 | 123456 | Diretora de Arte |

## 🛠️ Stack
- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Fontes: Sora + Geist + Material Symbols (Google Fonts)
- Design: Material You — paleta InfoLive Brasil

## Powered by Force Training
