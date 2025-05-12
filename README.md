# Mlakumulu Backend

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd mlakumulu-be
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` and fill in your database credentials and JWT secret.

4. **Run database migrations**

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the application**
   ```bash
   npm run start:dev
   ```

## API Documentation

- [Postman Collection (Endpoints Documentation)](https://andreastimothy.postman.co/workspace/Andreas-Timothy's-Workspace~d0f760e2-ec03-4af6-85c7-4c6fb882ca0b/collection/43541203-0676eaf0-985d-4fd6-adb9-084bef88912b?action=share&creator=43541203)
