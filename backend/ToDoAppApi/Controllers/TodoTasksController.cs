using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoAppApi.Database;
using ToDoAppApi.Models;

namespace ToDoAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoTasksController : ControllerBase
    {
        private readonly MyDbContext _context;

        public TodoTasksController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/GetToDoTasks
        [HttpGet("GetToDoTasks")]
        public async Task<ActionResult<IEnumerable<TodoTask>>> GetToDoTasks()
        {
            return await _context.TodoTask.ToListAsync();
        }

        // GET: api/GetCompletedToDoTasks
        [HttpGet("GetCompletedToDoTasks")]
        public async Task<ActionResult<IEnumerable<TodoTask>>> GetCompletedToDoTasks()
        {
            return await _context.TodoTask
                .Where(t => t.IsCompleted)
                .Take(5)  
                .ToListAsync();
        }

        // GET: api/GetNotCompletedToDoTasks
        [HttpGet("GetNotCompletedToDoTasks")]
        public async Task<ActionResult<IEnumerable<TodoTask>>> GetNotCompletedToDoTasks()
        {
            return await _context.TodoTask
                .Where(t => t.IsCompleted == false)
                .Take(5)  
                .ToListAsync();
        }


        // GET: api/GetToDoTask/{id}
        [HttpGet("GetToDoTask/{id}")]
        public async Task<ActionResult<TodoTask>> GetToDoTask(int id)
        {
            var task = await _context.TodoTask.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        // POST: api/CreateToDoTask
        [HttpPost("CreateToDoTask")]
        public async Task<ActionResult<TodoTask>> CreateToDoTask(TodoTask task)
        {
            task.CreatedAt = DateTime.UtcNow;
            _context.TodoTask.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetToDoTask), new { id = task.Id }, task);
        }

        // PUT: api/EditToDoTask/{id}
        [HttpPut("EditToDoTask/{id}")]
        public async Task<IActionResult> EditToDoTask(int id, TodoTask task)
        {
            if (id != task.Id)
            {
                return BadRequest();
            }

            _context.Entry(task).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoTaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/RemoveToDoTask/{id}
        [HttpDelete("RemoveToDoTask/{id}")]
        public async Task<IActionResult> RemoveToDoTask(int id)
        {
            var task = await _context.TodoTask.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            _context.TodoTask.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TodoTaskExists(int id)
        {
            return _context.TodoTask.Any(e => e.Id == id);
        }
    }
}
