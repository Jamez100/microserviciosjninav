using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using mservicio_usuarios.Data;

namespace mservicio_usuarios.Extensions
{
    public static class DatabaseServiceExtensions
    {
        /// Agrega el contexto de base de datos MySQL al contenedor de servicios.
        public static IServiceCollection AddCustomDatabase(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseMySql(
                    configuration.GetConnectionString("DefaultConnection"),
                    ServerVersion.AutoDetect(configuration.GetConnectionString("DefaultConnection")),
                    mySqlOptions => mySqlOptions.EnableRetryOnFailure()
                )
            );

            return services;
        }
    }
}
