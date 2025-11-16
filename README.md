## Full-Stack Todo Application (Next.js + AWS Amplify Gen 2)

This repository contains a production-style full-stack Todo application built with Next.js 16, TypeScript, Tailwind CSS, and AWS Amplify Gen 2. The application implements authenticated, multi-user task management on a fully serverless backend.

## Demo

Watch the demo video on Loom:  
[https://www.loom.com/share/4ab47f70488f4489a55bab3202872dde](https://www.loom.com/share/4ab47f70488f4489a55bab3202872dde)

## Features

- Next.js 16 with App Router and server-side rendering  
- Email/password authentication with AWS Cognito and email verification  
- Create, read, update, and delete todos backed by AWS AppSync (GraphQL) and DynamoDB  
- Owner-based authorization so each user only sees their own data  
- Responsive UI implemented with Tailwind CSS  
- End-to-end TypeScript, including typed data access via `aws-amplify/data`

## Why AWS Amplify Gen 2

AWS Amplify Gen 2 is used to define the backend entirely in TypeScript instead of configuring services manually in the AWS console. The backend is expressed in a small set of source files:

- `amplify/auth/resource.ts` defines the authentication configuration (Cognito with email/password).  
- `amplify/data/resource.ts` defines the `Todo` data model and its authorization rules.  
- `amplify/backend.ts` composes the backend and is used by Amplify to synthesize the AWS stack.  

Running `npm run sandbox` uses Amplify Gen 2 to provision Cognito, AppSync, and DynamoDB in your AWS account and generates `amplify_outputs.json`, which the Next.js app consumes to talk to the deployed backend.

## Architecture

- Frontend: Next.js 16, React, TypeScript, Tailwind CSS  
- Backend: AWS Amplify Gen 2 (Cognito, AppSync, DynamoDB)  

The frontend interacts with the backend via the generated client from `aws-amplify/data` (for example, `client.models.Todo.list`, `create`, `update`, `delete`).

## Getting Started

### Prerequisites

- Node.js 18+ and npm  
- AWS account and AWS CLI configured (`aws configure`)

### Installation and local run

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


