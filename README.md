# Todo App with Next.js and AWS Amplify Gen 2

A modern, full-stack Todo application built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **AWS Amplify Gen 2**. This project demonstrates how to build a scalable cloud application with server-side rendering, authentication, and real-time data synchronization.

## 🚀 Features

- **Next.js App Router**: Built with the latest Next.js App Router for optimal performance
- **Server-Side Rendering (SSR)**: Fast initial page loads with SSR support
- **User Authentication**: Sign up and sign in with email/password using AWS Cognito
- **CRUD Operations**: Create, read, update, and delete todos
- **Real-time Sync**: Todos are automatically synced with AWS AppSync
- **Modern UI**: Beautiful, responsive design with Tailwind CSS and gradient themes
- **Type-Safe**: Built with TypeScript for better developer experience
- **Serverless Backend**: Powered by AWS Amplify Gen 2 with auto-generated GraphQL API

## 🆚 Next.js vs React + Vite

This is the **Next.js version** of the Todo app. Key differences from the React + Vite version:

- **Server-Side Rendering**: Next.js provides SSR out of the box for better SEO and performance
- **App Router**: Uses Next.js 16 App Router with React Server Components
- **Built-in Routing**: File-based routing system
- **API Routes**: Can easily add API routes for server-side logic
- **Optimized Builds**: Better production optimizations with Next.js
- **Tailwind CSS**: Integrated Tailwind CSS for styling

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (v9 or higher) - Comes with Node.js
- **AWS Account** - [Create a free account](https://aws.amazon.com/)
- **Git** - [Download here](https://git-scm.com/)

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd amplify-gen2-nextjs-todo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure AWS Credentials

You'll need to configure AWS credentials to deploy the backend:

1. **Install AWS CLI** (if not already installed):
   ```bash
   # macOS
   brew install awscli
   
   # Or download from: https://aws.amazon.com/cli/
   ```

2. **Configure AWS credentials**:
   ```bash
   aws configure
   ```
   
   You'll be prompted for:
   - **AWS Access Key ID**: Get this from AWS IAM Console
   - **AWS Secret Access Key**: Get this from AWS IAM Console
   - **Default region**: e.g., `us-east-1`
   - **Default output format**: `json`

   **How to get AWS credentials:**
   - Go to [AWS IAM Console](https://console.aws.amazon.com/iam/)
   - Click "Users" → "Create user"
   - Select "Attach policies directly" → Choose "AdministratorAccess" (for development)
   - Click "Create user"
   - Click on the user → "Security credentials" tab → "Create access key"
   - Choose "Command Line Interface (CLI)"
   - Download and save your Access Key ID and Secret Access Key

### 4. Deploy the Amplify Backend

Start the Amplify sandbox environment (this creates your backend resources in AWS):

```bash
npm run sandbox
```

This command will:
- Deploy your authentication service (Cognito)
- Create your GraphQL API with AppSync
- Set up your database (DynamoDB)
- Generate `amplify_outputs.json` with your backend configuration

**Note:** The first deployment may take 3-5 minutes. Subsequent deployments are faster.

### 5. Start the Development Server

In a new terminal window:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 📱 Using the App

1. **Sign Up**: Create a new account with your email and password (minimum 8 characters)
2. **Sign In**: Use your credentials to sign in
3. **Add Todos**: Enter a title and optional description, then click "Add Todo"
4. **Complete Todos**: Click the checkbox to mark todos as complete
5. **Delete Todos**: Click the trash icon to delete a todo

## 🏗️ Project Structure

```
amplify-gen2-nextjs-todo/
├── app/
│   ├── components/
│   │   ├── AmplifyProvider.tsx    # Amplify configuration provider
│   │   └── TodoApp.tsx            # Main Todo app component
│   ├── layout.tsx                 # Root layout with Amplify provider
│   ├── page.tsx                   # Home page
│   └── globals.css                # Global styles
├── amplify/
│   ├── backend.ts                 # Backend configuration
│   ├── auth/
│   │   └── resource.ts            # Authentication settings
│   └── data/
│       └── resource.ts            # Data model (Todo schema)
├── amplify_outputs.json           # Generated backend config (DO NOT COMMIT)
├── package.json
└── README.md
```

## 🔑 Key Concepts: Next.js + Amplify Gen 2

### Next.js App Router

This project uses the Next.js App Router (Next.js 16+), which provides:
- **Server Components**: Default components are server-rendered
- **Client Components**: Marked with `'use client'` for interactivity
- **File-based Routing**: Routes are defined by folder structure
- **Layouts**: Shared layouts across routes

### Amplify Integration

Amplify is configured in `app/components/AmplifyProvider.tsx`:
- Uses `'use client'` directive for client-side configuration
- Configures Amplify with SSR support
- Provides Amplify context to all components

### Data Model

The Todo model is defined in `amplify/data/resource.ts`:

```typescript
Todo: a.model({
  title: a.string().required(),
  description: a.string(),
  completed: a.boolean().default(false),
  createdAt: a.datetime(),
}).authorization((allow) => [allow.owner()])
```

This creates:
- A DynamoDB table for storing todos
- A GraphQL API with CRUD operations
- Authorization rules (only the owner can access their todos)

## 🚢 Deployment

### Deploy to Production

1. **Stop the sandbox** (if running):
   ```bash
   npm run sandbox:delete
   ```

2. **Build the Next.js app**:
   ```bash
   npm run build
   ```

3. **Deploy to Vercel** (Recommended for Next.js):
   - Push your code to GitHub
   - Import your repository to [Vercel](https://vercel.com)
   - Vercel will automatically detect Next.js and deploy

4. **Or deploy to AWS Amplify Hosting**:
   - Push your code to GitHub
   - Connect your repository to AWS Amplify Console
   - Amplify will automatically deploy on every push

### Clean Up Resources

To delete all AWS resources created by the sandbox:

```bash
npm run sandbox:delete
```

## 🔒 Security Notes

- **Never commit `amplify_outputs.json`** - This file contains sensitive configuration. It should be in `.gitignore`
- Use environment-specific AWS credentials
- Follow the principle of least privilege for IAM users/roles in production

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [AWS Amplify Gen 2 Documentation](https://docs.amplify.aws/)
- [Amplify Gen 2 Quickstart](https://docs.amplify.aws/javascript/start/quickstart/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## 🐛 Troubleshooting

### Issue: "AWS credentials not found"

**Solution**: Run `aws configure` and enter your AWS credentials.

### Issue: "Sandbox deployment fails"

**Solution**: 
- Ensure your AWS account has proper permissions
- Check that your AWS region is supported
- Verify your AWS CLI is up to date: `aws --version`

### Issue: "Cannot sign in after sign up"

**Solution**: Check your email for a verification link from AWS Cognito. You may need to verify your email before signing in.

### Issue: "Port 3000 already in use"

**Solution**: Kill the process using that port or change the port:
```bash
PORT=3001 npm run dev
```

## 🎨 Customization

### Styling

The app uses Tailwind CSS. You can customize styles in:
- `app/globals.css` - Global styles
- Component files - Inline Tailwind classes

### Adding Features

Some ideas to extend the app:
- Add categories/tags for todos
- Add due dates and reminders
- Add todo sharing between users
- Add search and filtering
- Add dark mode toggle

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

Created as a portfolio project to demonstrate Next.js and AWS Amplify Gen 2 skills.

---

**Happy Coding! 🎉**
