using mservicio_usuarios.Data;          // Acceso al contexto de base de datos
using mservicio_usuarios.Models;        // Modelo de usuario
using Microsoft.EntityFrameworkCore; // Métodos async de EF Core
using Microsoft.Extensions.Configuration; // Configuración para JWT
using Microsoft.IdentityModel.Tokens; // Seguridad para JWT
using System.IdentityModel.Tokens.Jwt; // Manejo de tokens JWT
using System.Security.Claims;       // Claims para JWT
using System.Text;                 // Codificación de claves

namespace mservicio_usuarios.Services
{
    public class AuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        // Constructor: inicializa el contexto de base de datos y la configuración
        public AuthService(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // Valida las credenciales del usuario y genera un token JWT si son correctas
        // Devuelve el token, la fecha de expiración o un mensaje de error
        public async Task<(string? token, DateTime? expiration, string? error)> LoginAsync(LoginDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == loginDto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password_Hash))
                return (null, null, "Credenciales inválidas.");

            // Claims incluidos en el token JWT (id, username, rol, identificador único)
            /*var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),  // id del usuario
                new Claim(JwtRegisteredClaimNames.UniqueName, user.Username), // nombre de usuario
                new Claim(ClaimTypes.Role, user.Role), // rol del usuario
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()) // identificador único del token
            };*/

            // Claims incluidos en el token JWT (id, username, rol, identificador único)
            var claims = new[]
            {
                new Claim("id", user.Id.ToString()),
                new Claim("username", user.Username),
                new Claim("role", user.Role),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            // Genera la clave de firma y las credenciales
            var jwtKey = _configuration["Jwt:Key"];
            if (string.IsNullOrEmpty(jwtKey))
                throw new InvalidOperationException("JWT key is not configured.");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Crea el token JWT con los claims y la configuración
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: null,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1), // expiración del token
                signingCredentials: creds
            );

            // Devuelve el token generado, la fecha de expiración y null como error
            return (new JwtSecurityTokenHandler().WriteToken(token), token.ValidTo, null);
        }

        // Obtiene el usuario actual a partir del id (devuelve el usuario o null si no existe)
        public async Task<User?> GetCurrentUserAsync(string userId)
        {
            return await _context.Users.FindAsync(int.Parse(userId));
        }
    }
}