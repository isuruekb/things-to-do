# backend/ToDoAppApi/Dockerfile

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

WORKDIR /src
COPY ./ToDoAppApi.csproj ./ToDoAppApi/
WORKDIR /src/ToDoAppApi
RUN dotnet restore

COPY . .
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "ToDoAppApi.dll"]
