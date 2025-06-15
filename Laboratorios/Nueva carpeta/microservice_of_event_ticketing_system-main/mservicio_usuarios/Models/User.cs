// Declaramos
//esta clase pertenece al namespace 'mservicio_usuarios.Models'.
namespace mservicio_usuarios.Models;


// Definición de la clase User
public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Password_Hash { get; set; } = null!;
    public string Role { get; set; } = "user";
    public DateTime Created_At { get; set; } = DateTime.UtcNow;
}
