## API Testing with Bruno

This project includes a Bruno collection in the `bruno/` directory for testing APIs locally.

### Open the collection

1. Install Bruno.
2. Open Bruno.
3. Choose **Open Collection**.
4. Select the `bruno/` folder from this repository.

### Local environment

Use the **Local** environment with:

* `baseUrl=http://localhost:3000`

### Available requests

* **Auth → Get Session** — `GET /api/auth/session`
* **Public → Signup** — `POST /api/v1/auth/signup`

Start the development server before sending requests:

```bash
pnpm dev
```

Bruno collections are stored as files in the repository, so they can be version-controlled and shared with all contributors.
