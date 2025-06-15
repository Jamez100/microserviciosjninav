using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mservicio_usuarios.Data;
using mservicio_usuarios.Models;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;

namespace mservicio_usuarios.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        // Constructor que recibe el contexto de la base de datos.
        public UserController(AppDbContext context)
        {
            _context = context;
        }

        // Valida los datos del usuario.
        private string? ValidateUserInput(User user)
        {
            if (string.IsNullOrWhiteSpace(user.Username))
                return "El nombre de usuario es obligatorio.";

            if (string.IsNullOrWhiteSpace(user.Email))
                return "El correo electrónico es obligatorio.";

            if (!user.Email.Contains("@") || !user.Email.Contains("."))
                return "El correo electrónico no tiene un formato válido.";

            if (string.IsNullOrWhiteSpace(user.Password_Hash))
                return "La contraseña es obligatoria.";

            if (user.Password_Hash.Length < 6)
                return "La contraseña debe tener al menos 6 caracteres.";
            return null;
        }

        // Valida que el email y el username no estén repetidos.
        private string? ValidateUser(User user)
        {
            if (_context.Users.Any(u => u.Email == user.Email))
                return "El correo ya está registrado.";

            if (_context.Users.Any(u => u.Username == user.Username))
                return "El nombre de usuario ya está en uso.";

            return null;
        }

        // Prepara el usuario antes de guardarlo: asigna rol, hashea contraseña y fecha de creación.
        private void PrepareUser(User user)
        {
            user.Role = user.Role.ToLower();
            user.Password_Hash = BCrypt.Net.BCrypt.HashPassword(user.Password_Hash);
            user.Created_At = DateTime.UtcNow;
        }

        // Mostrar todos los usuarios registrados.
        [HttpGet("get-user")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        /// Registra un nuevo usuario con rol "user".
        [HttpPost("register-user")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            var inputValidationMsg = ValidateUserInput(user);
            if (inputValidationMsg != null)
                return BadRequest(inputValidationMsg);

            var duplicateValidationMsg = ValidateUser(user);
            if (duplicateValidationMsg != null)
                return BadRequest(duplicateValidationMsg);

            PrepareUser(user);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensaje = "Usuario creado correctamente.",
                user.Id,
                user.Username,
                user.Email,
                user.Role
            });
        }
    }
}