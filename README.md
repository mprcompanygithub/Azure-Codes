# Movies Full Stack Deployment on Azure

This project is a complete full stack implementation of a Movies CRUD application using:

* **Backend**: ASP.NET Core Web API
* **Frontend**: ReactJS
* **Database**: Azure SQL Server
* **Deployment**: Azure App Services and Azure Static Web Apps

---

## Overview

This guide walks through building and deploying a Movie CRUD system with full backend, frontend, and database integration hosted entirely on Microsoft Azure.

---

## Backend: ASP.NET Core Web API

### 1. Create the Project

* Use Visual Studio to create an ASP.NET Core Web API project.
* Save it in your desired folder structure.

### 2. Install Dependencies

Use NuGet Package Manager to install:

```bash
Microsoft.EntityFrameworkCore.SqlServer
```

### 3. Define the Schema

Create models inside the `Models/` folder, for example `Movie.cs`, to define your database structure.

### 4. Configure DbContext

Add a `DbContext` class and link your schema:

```csharp
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
```

### 5. Implement Repository Pattern

Create a `Repository/` folder containing:

* `IMovieRepo.cs` (interface)
* `MovieRepo.cs` (implementation)

Register in `Program.cs`:

```csharp
builder.Services.AddScoped<IMovieRepo, MovieRepo>();
```

### 6. Create Controllers

Inject the repository via the constructor and implement CRUD operations. Return appropriate status codes using `Ok()`, `NotFound()`, etc.

### 7. Connect to Local SQL Server

Configure your `appsettings.json` connection string. Test that your API connects to your local SQL database.

### 8. Create and Connect to Azure SQL

* Create a SQL Server in Azure Portal
* Create tables and seed with initial data
* Update your connection string in the API to point to the Azure SQL instance

---

## Frontend: React Js

### 1. Initialize React App

Create your frontend application:

```bash
npx create-react-app movies-crud-ui
```

Install required packages like Bootstrap:

```bash
npm install bootstrap
```

### 2. Build UI Components

Implement React components for:

* Listing movies
* Adding/updating movies
* Deleting movies

### 3. Connect to API

Set the API base URL using environment variables:

```env
BASE_URL = "https://localhost:44392/api/Movie";
```

### 4. Handle CORS

If the frontend fails to connect to the backend due to CORS, add the following to `Program.cs`:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

app.UseCors("AllowAll");
```

### 5. Test Locally

Ensure the React app correctly fetches and displays data from the backend connected to Azure SQL.

### 6. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

---

## Deployment to Azure

### Backend Deployment

1. In Azure Portal, create a **Web App** with .NET runtime.
2. Deploy the API using Kudu Console or GitHub Actions.
3. Visit the deployed URL to ensure your API is running.

### Frontend Deployment

1. Push your frontend code to GitHub.
2. In Azure Portal, create a **Static Web App**.
3. Link your GitHub repo and branch.
4. Azure creates a CI/CD workflow using GitHub Actions.
5. After deployment, visit the provided URL to view your live frontend.

---

## Final Outcome

* API live on Azure App Service
* Frontend live on Azure Static Web Apps
* Data stored and retrieved from Azure SQL Database

---

## Folder Structure

```
MovieFSD/
├── backend/               # ASP.NET Core API
│   ├── Models/
│   ├── Repository/
│   ├── Controllers/
│   └── Program.cs
│
├── frontend/              # React App
│   ├── src/
│   ├── public/
│   └── package.json
```

---

## 🎉 Congratulations!

You've successfully deployed a **Full Stack Movie CRUD Application** using:

* ASP.NET Core Web API (Backend)
* ReactJS (Frontend)
* Azure SQL (Database)
* Azure App Services & Static Web Apps (Deployment)

Your application is now live and functional on the cloud! Feel free to build on top of this, add authentication, advanced filtering, or even modern UI libraries.

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Credits

Thanks for following along! For a visual walkthrough, check out the related YouTube video (https://www.youtube.com/@MaskyBoiiiiii).
