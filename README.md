# InfoLive Brasil — LensCtrl Prototype

Protótipo de alta fidelidade do sistema de gestão de equipamentos.
Design: Cinematic Utility Suite | Powered by Force Training

## 🚀 Deploy na Vercel — Passo a Passo

### 1. Suba no GitHub
```bash
cd InfoLive-LensCtrl-Prototype
git init
git add .
git commit -m "InfoLive LensCtrl v1.0.4"
git branch -M main
git remote add origin https://github.com/dearaujofabiano-cpu/Infolive.git
git push -u origin main
```

### 2. Deploy na Vercel
- Acesse vercel.com → New Project → Import do GitHub
- Framework: **Other** (não é Vite/React puro)
- Build Command: `npm run build`
- Output Directory: `dist`
- Clique Deploy ✓

### Ou via Vercel CLI:
```bash
npm i -g vercel
vercel login
vercel --prod
```

## 👤 Login Demo
- Employee ID: **IL-000001** | Senha: **123456** (Admin — Luiz Gustavo)
- Employee ID: **IL-000042** | Senha: **123456** (Cameraman)

## 📱 Telas incluídas
1. **Login** — Tela de autenticação com parallax
2. **Dashboard** — Visão geral, alertas, retornos pendentes
3. **Inventory** — Catálogo de equipamentos com status
4. **Movements** — Registro de saídas e histórico

## Powered by Force Training
