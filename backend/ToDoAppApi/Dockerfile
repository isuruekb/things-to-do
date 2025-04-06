# Use the official image as a parent image
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the csproj file and restore any dependencies (via dotnet restore)
COPY ./ToDoAppApi.csproj ./ToDoAppApi/

WORKDIR /app/ToDoAppApi

RUN dotnet restore

# Copy the rest of the application
COPY . .

# Publish the application to the /app/publish directory
RUN dotnet publish -c Release -o /app/publish

# Set the base image to run the application
FROM mcr.microsoft.com/dotnet/aspnet:6.0

WORKDIR /app

# Copy the published files from the build container
COPY --from=build /app/publish .

# Set the entry point for the container to run the application
ENTRYPOINT ["dotnet", "ToDoAppApi.dll"]
