using mservicio_usuarios.Extensions;
using Microsoft.EntityFrameworkCore;
using mservicio_usuarios.Services;
using mservicio_usuarios.Data;

DotNetEnv.Env.Load(); // Cargar variables de entorno

var builder = WebApplication.CreateBuilder(args);

// Configuración de la base de datos (tu código original)
var connectionString = $"Server={Environment.GetEnvironmentVariable("DB_HOST")};Port={Environment.GetEnvironmentVariable("DB_PORT")};Database={Environment.GetEnvironmentVariable("DB_NAME")};User={Environment.GetEnvironmentVariable("DB_USER")};Password={Environment.GetEnvironmentVariable("DB_PASSWORD")};Connect Timeout=60;";
builder.Configuration["ConnectionStrings:DefaultConnection"] = connectionString;

// Servicios
builder.Services.AddCustomDatabase(builder.Configuration);
builder.Services.AddCustomAuthentication(builder.Configuration);
builder.Services.AddCustomSwagger();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddScoped<AuthService>();

// Configuración de CORS (¡aquí es correcto!)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy
            .WithOrigins("http://localhost:3000") // Frontend Next.js
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});

var app = builder.Build();

// --- Middlewares ---
app.UseCors("AllowFrontend");   
app.UseSwagger();
app.UseSwaggerUI();
app.UseAuthentication();
app.UseAuthorization();

// Migraciones (opcional)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate(); // Descomentar si necesitas migraciones automáticas
}

app.MapControllers();
app.Run();