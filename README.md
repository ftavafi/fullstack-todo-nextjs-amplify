# 📝 Full-Stack Todo Application with Next.js & AWS Amplify

A modern, production-ready full-stack Todo application demonstrating cloud-native development with Next.js 16, TypeScript, and AWS Amplify Gen 2.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![AWS Amplify](https://img.shields.io/badge/AWS-Amplify%20Gen%202-orange)](https://aws.amazon.com/amplify/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)](https://tailwindcss.com/)

## 🎥 Demo

Watch demo video on Loom:  
[https://www.loom.com/share/4ab47f70488f4489a55bab3202872dde](https://www.loom.com/share/4ab47f70488f4489a55bab3202872dde)

## ✨ Features

- 🚀 **Server-Side Rendering** - Next.js 16 with App Router for optimal performance
- 🔐 **User Authentication** - Secure email/password authentication with AWS Cognito
- 💾 **Real-time Data Sync** - GraphQL API with AWS AppSync for seamless data updates
- 🗄️ **Serverless Database** - Amazon DynamoDB for scalable, cost-effective storage
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 📱 **Type-Safe** - End-to-end TypeScript for better developer experience
- ☁️ **Cloud-Native** - Fully serverless architecture on AWS

## 🏗️ Architecture

```
Next.js Frontend (SSR) → AWS AppSync (GraphQL) → Amazon DynamoDB
                      ↓
                  AWS Cognito (Auth)
```

### Technology Stack

**Frontend:**
- Next.js 16 with App Router
- React 19 with Server Components
- TypeScript
- Tailwind CSS

**Backend:**
- AWS Amplify Gen 2 (Backend-as-Code)
- AWS Cognito (Authentication)
- AWS AppSync (GraphQL API)
- Amazon DynamoDB (Database)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- AWS Account (for backend deployment)
- AWS CLI configured with credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ftavafi/fullstack-todo-nextjs-amplify.git
   cd fullstack-todo-nextjs-amplify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure AWS credentials**
   ```bash
   aws configure
   ```

4. **Deploy the backend** (when ready)
   ```bash
   npm run sandbox
   ```
   This creates AWS resources (Cognito, AppSync, DynamoDB) and generates `amplify_outputs.json`.

5. **Start the development server**
```bash
npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

7. **First time setup**
   - Sign up with your email and password
   - Check your email for a verification code
   - Enter the verification code to confirm your account
   - Sign in with your credentials
   - Start creating todos!

## 📁 Project Structure

```
├── app/
│   ├── components/
│   │   ├── AmplifyProvider.tsx    # Amplify configuration
│   │   └── TodoApp.tsx            # Main Todo application
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   └── globals.css                # Global styles
├── amplify/
│   ├── backend.ts                 # Backend configuration
│   ├── auth/
│   │   └── resource.ts           # Authentication setup
│   └── data/
│       └── resource.ts           # Data model (Todo schema)
├── scripts/
│   ├── md-to-pdf.js              # PDF export utility
│   └── pdf-styles.css            # PDF styling
└── package.json
```

## 🔑 Key Concepts

### Server Components vs Client Components

- **Server Components** (default): Render on the server for better performance
- **Client Components** (`'use client'`): Interactive components with hooks and events

### AWS Amplify Gen 2

- **Backend-as-Code**: Define infrastructure in TypeScript
- **Auto-generated APIs**: GraphQL API created from schema
- **Built-in Security**: Authorization rules defined in code
- **Serverless**: No server management required

### Data Model

```typescript
Todo {
  title: string (required)
  description: string (optional)
  completed: boolean (default: false)
  createdAt: datetime
}
```

With owner-based authorization - users can only access their own todos.

## 🎯 Project Highlights

- ✅ Full-stack TypeScript application
- ✅ Server-side rendering for better SEO and performance
- ✅ Modern React patterns (Server Components, App Router)
- ✅ Cloud-native serverless architecture
- ✅ Production-ready code structure
- ✅ Responsive, accessible UI

## 🔒 Security

- Owner-based authorization on all data operations
- JWT-based authentication with AWS Cognito
- Secure password policies enforced
- All sensitive files excluded from Git (`.gitignore`)

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [AWS Amplify Gen 2 Docs](https://docs.amplify.aws/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 🤝 Contributing

This is a portfolio project. Feel free to fork and use as a reference for your own projects!

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Tara Tavafi**
- GitHub: [@ftavafi](https://github.com/ftavafi)
- Portfolio: [Your Portfolio URL]

---

**Built with ❤️ using Next.js and AWS Amplify Gen 2**
