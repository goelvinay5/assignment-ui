
## database

Install MySQL

create schema librarydb

update details as following connection string or update the connection string with your schema details
"Server=localhost; port = 3306;  Database =librarydb; uid=root;Password=Scaler@001"

open nuget package manager in API and run following commands:
Add-Migration InitialCreate
Update-Database
                OR create Blog Table
CREATE TABLE `blogs` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Username` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `DateCreated` datetime DEFAULT NULL,
  `Text` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

## Backend

Run the API project first

## Frontend

Run `ng serve -o` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

# Blog Management Application
The application is divided into two parts, the frontend and the backend. 
The application is designed using Angular version 17.3.7. for frontend and .Net Core 6.0 for backend using MySQL for database
The frontend is responsible for the user interface and the backend is responsible for the business logic and data access. 
The frontend communicates with the backend using RESTful APIs. 
The frontend is organized into components, services, and modules. 
The backend is organized into controllers, services, and repositories build using MVC Architectutre
The application is designed to be: 
        scalable and maintainable using best practices and design patterns
        easy to understand and extend using clean code and comments
        secure and reliable using authentication and authorization
        responsive and user-friendly using Angular Material and Bootstrap
        fast and efficient using lazy loading and caching
        easy to deploy and manage using docker and kubernetes
        easy to test and debug using unit tests and integration tests
        easy to maintain and update using version control and continuous integration
        easy to use and navigate using search and filter
        easy to learn and use using tutorials and documentation

Performance Considerations:
For large number of blog posts we can implemnet
        Pagination
        Lazy Loading
        Sorting
        Searching
        Caching
        Indexing
        Sharding
