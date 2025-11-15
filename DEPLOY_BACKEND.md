# Deploy Backend with AWS Amplify Gen 2

## Step 1: Configure AWS Credentials

If you haven't configured AWS credentials yet, you need to:

1. **Get your AWS Access Keys** (if you don't have them):
   - Go to <https://console.aws.amazon.com/iam/>
   - Users → Your IAM user → Security credentials
   - Create access key → Copy Access Key ID and Secret Access Key

2. **Configure AWS CLI**:

   ```bash
   aws configure
   ```

   Enter:
   - AWS Access Key ID
   - AWS Secret Access Key
   - Default region: `us-east-1` (or your preferred region)
   - Default output format: `json` (just press Enter)

## Step 2: Deploy the Backend

Once credentials are configured, deploy:

```bash
npm run sandbox
```

This will:

- ✅ Create AWS Cognito User Pool (authentication)
- ✅ Create AWS AppSync GraphQL API
- ✅ Create DynamoDB table for todos
- ✅ Generate `amplify_outputs.json` with backend configuration
- ⏱️ Takes 3-5 minutes on first deployment

## Step 3: Verify Deployment

After deployment completes:

- Check that `amplify_outputs.json` was created
- The file contains your backend endpoints and configuration

## Step 4: Start the App

```bash
npm run dev
```

Visit <http://localhost:3000> and test:

- Sign up with a new account
- Sign in
- Create todos
- Mark todos as complete
- Delete todos

## Troubleshooting

### "AWS credentials not found"

- Run `aws configure` and enter your credentials

### "Access Denied"

- Make sure your IAM user has AdministratorAccess policy
- Wait a minute after creating credentials (AWS needs time to propagate)

### "Region not found"

- Use a valid AWS region like `us-east-1`, `us-west-2`, `eu-west-1`

### Deployment fails

- Check AWS account has proper permissions
- Verify AWS CLI is up to date: `aws --version`
- Check your AWS account limits

## Clean Up (Optional)

To delete all AWS resources:

```bash
npm run sandbox:delete
```

---

**Ready to deploy? Configure AWS credentials first, then run `npm run sandbox`!**
