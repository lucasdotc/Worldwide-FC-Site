# Lambda Deployment Guide — AWS Console

## Before you start

Make sure SES is out of sandbox mode (or that `info@worldwidefc.ca` and `noreply@worldwidefc.ca` are both verified in SES). API Gateway binary media types must include `multipart/form-data` for the register function to receive files.

---

## Step 1 — Build the zip for each function

Open PowerShell and `cd` into the `lambda/` folder, then run:

```powershell
# Contact function
Set-Location contact
npm install
Set-Location ..
Compress-Archive -Path contact\* -DestinationPath contact.zip -Force

# Register function
Set-Location register
npm install
Set-Location ..
Compress-Archive -Path register\* -DestinationPath register.zip -Force
```

This installs the dependencies into `node_modules/` and zips the entire folder contents (code + node_modules) into a flat zip that Lambda expects.

---

## Step 2 — Create the Lambda functions

1. Go to **AWS Console → Lambda → Create function**
2. Choose **Author from scratch**
3. Runtime: **Node.js 20.x**
4. Architecture: x86_64
5. Create a new execution role (or use an existing one — it needs `ses:SendEmail` and `ses:SendRawEmail` permissions)
6. Click **Create function**

Repeat for both `worldwide-fc-contact` and `worldwide-fc-register`.

---

## Step 3 — Upload the zip

In each function:
1. **Code → Upload from → .zip file**
2. Upload `contact.zip` or `register.zip`
3. Set **Handler** to `index.handler`

---

## Step 4 — Set environment variables

Go to **Configuration → Environment variables** and add:

### Both functions
| Key | Value |
|-----|-------|
| `SES_SMTP_ENDPOINT` | `email-smtp.ca-central-1.amazonaws.com` |
| `SES_SMTP_USER` | `AKIAQPROMNAMDALFFVG4` |
| `SES_SMTP_PASS` | *(value from .env)* |
| `SES_FROM` | `noreply@worldwidefc.ca` |

### Register function only
| Key | Value |
|-----|-------|
| `GOOGLE_SERVICE_ACCOUNT_JSON` | *(paste the full JSON string)* |
| `SHEET_ID` | *(your Google Sheet ID)* |
| `DRIVE_FOLDER_ID` | *(your Google Drive folder ID)* |

---

## Step 5 — Configure API Gateway

1. Go to **API Gateway → Create API → HTTP API**
2. Add integrations pointing to each Lambda
3. Add routes:
   - `POST /api/contact` → `worldwide-fc-contact`
   - `POST /api/register` → `worldwide-fc-register`
   - `OPTIONS /api/contact` → same Lambda (handles preflight internally)
   - `OPTIONS /api/register` → same Lambda
4. Deploy to a stage (e.g. `prod`)
5. Copy the **Invoke URL** — this becomes your `VITE_API_URL`

### Enable binary media types (required for file uploads)
In API Gateway → your API → **Settings → Binary media types**, add:
```
multipart/form-data
```

---

## Step 6 — Update VITE_API_URL

In your deployment platform's environment variables, set:
```
VITE_API_URL=https://<api-id>.execute-api.ca-central-1.amazonaws.com/prod/
```

---

## IAM policy needed on the Lambda execution role

```json
{
  "Effect": "Allow",
  "Action": ["ses:SendEmail", "ses:SendRawEmail"],
  "Resource": "*"
}
```
