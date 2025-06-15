// modelo que recibe las credenciales
namespace mservicio_usuarios.Models;

//clase 
public class LoginDto
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
