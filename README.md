## Full-Stack Todo Application (Next.js + AWS Amplify Gen 2)

This project is a full-stack Todo application built with Next.js 16, TypeScript, Tailwind CSS, and AWS Amplify Gen 2. It demonstrates a modern, serverless architecture with authentication, a typed GraphQL API, and a responsive UI.

## Demo

Watch the demo video on Loom:  
[https://www.loom.com/share/4ab47f70488f4489a55bab3202872dde](https://www.loom.com/share/4ab47f70488f4489a55bab3202872dde)

## Why we decided to use AWS Amplify Gen 2

For this project, AWS Amplify Gen 2 was chosen to keep the backend simple, type-safe, and aligned with the frontend stack:

- **Backend defined in TypeScript:** The entire backend (auth, data models, API) is defined in code using the `@aws-amplify/backend` library, which fits naturally with a TypeScript/Next.js application.
- **Serverless and managed:** Amplify synthesizes and deploys a real AWS stack (Cognito for auth, AppSync for GraphQL, DynamoDB for data), so there is no need to manage servers, networking, or manual CloudFormation templates.
- **Tight integration with the frontend:** The generated `amplify_outputs.json` is consumed directly by the Next.js app, and the typed client from `aws-amplify/data` allows us to call `client.models.Todo.*` with full TypeScript support.

In this project:
- `amplify/auth/resource.ts` defines the authentication flow (email/password with Cognito).
- `amplify/data/resource.ts` defines the `Todo` model and authorization rules.
- `amplify/backend.ts` wires these into a single backend.
- `npm run sandbox` deploys this backend to your AWS account and generates `amplify_outputs.json`, which the Next.js app uses to connect to the cloud resources.

## Features

- Next.js 16 with App Router and server-side rendering  
- Email/password authentication with AWS Cognito, including email verification  
- CRUD operations for todos backed by AWS AppSync (GraphQL) and DynamoDB  
- Owner-based authorization (each user only sees their own todos)  
- Responsive UI styled with Tailwind CSS  
- End-to-end TypeScript across frontend and backend definitions  

## Architecture

- Frontend: Next.js 16, React, TypeScript, Tailwind CSS  
- Backend (via AWS Amplify Gen 2): Cognito (authentication), AppSync (GraphQL API), DynamoDB (data store)  

The Todo model is defined in `amplify/data/resource.ts` and used by Amplify to generate the GraphQL schema and DynamoDB table.

## Getting Started

### Prerequisites

- Node.js 18+ and npm  
- AWS account and AWS CLI configured (`aws configure`)  

### Setup

```bash
git clone https://github.com/ftavafi/fullstack-todo-nextjs-amplify.git
cd fullstack-todo-nextjs-amplify
npm install
```

Deploy the backend (one-time per environment):

```bash
npm run sandbox
```

Start the development server:

```bash
npm run dev
```

Open the application at `http://localhost:3000`.

### First-time user flow

1. Sign up with your email and password.  
2. Check your email for the verification code.  
3. Enter the verification code in the app to confirm your account.  
4. Sign in with your credentials.  
5. Create, complete, and delete todos.  

## Project structure (high level)

- `app/` – Next.js App Router (layout, page, and UI components)  
- `app/components/TodoApp.tsx` – main application logic and UI  
- `amplify/` – backend definition (auth and data models)  
- `amplify_outputs.json` – generated configuration used by the frontend  

## Author

Tara Tavafi  
GitHub: [@ftavafi](https://github.com/ftavafi)

This project is open source under the [MIT License](LICENSE).


