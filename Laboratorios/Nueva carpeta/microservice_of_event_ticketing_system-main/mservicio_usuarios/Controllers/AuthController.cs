using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using mservicio_usuarios.Services;
using mservicio_usuarios.Models;
using System.Security.Claims;

namespace mservicio_usuarios.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        // Constructor: recibe el servicio de autenticación por inyección de dependencias
        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok("El endpoint de autenticación está funcionando correctamente.");
        }


        // Inicia sesión de usuario.
        // Recibe las credenciales y retorna un token JWT si son válidas.

        /// <param name="loginDto">Credenciales de usuario</param>
        /// <returns>Token JWT y fecha de expiración, o error si no es válido</returns>
        [HttpPost("create-token")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var (token, expiration, error) = await _authService.LoginAsync(loginDto);
            if (error != null)
                return Unauthorized(error);

            return Ok(new { token, expiration });
        }


        // Obtiene la información del usuario autenticado actual.
        // Requiere autenticación (token válido).
        // <returns>Datos del usuario autenticado o error si no está autenticado</returns>
        [Authorize]
        [HttpGet("validar-token")]
        public async Task<IActionResult> GetCurrentUser()
        {
            // Obtiene el ID del usuario desde el token JWT
            var userId = User.FindFirstValue("id");
            if (userId == null)
                return Unauthorized();

            // Busca el usuario en la base de datos
            var user = await _authService.GetCurrentUserAsync(userId);
            if (user == null)
                return NotFound();

            // Retorna los datos del usuario autenticado
            return Ok(new
            {
                user.Id,
                user.Username,
                user.Email,
                user.Role
            });
        }
    }
}