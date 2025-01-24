import Button from "./Button";
import NewTask from "./NewTask";

export default function Tasks({
  projectId,
  handleAddTask,
  handleDeleteTask,
  tasks
}) {
  return <section>
    <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
    <NewTask projectId={projectId} handleAddTask={handleAddTask}/>
    <p className="text-stone-800 my-4">
      This project does no have any tasks yet.
    </p>
    <ul className="mt-8">
      

        {tasks.filter(task=>task.projectId===projectId)?.map(task=>
          <div className="flex justify-between my-2 mx-4 px-4">
            <li key={task.id}>{task.description}</li>
            <Button onClick={()=>handleDeleteTask(task.id)}>delete</Button>
          </div>
        )}
        
    </ul>
  </section>
}