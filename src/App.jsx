import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectsSidebar";
import { v4 as uuid } from "uuid";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    addingProject: false,
    selectedProjectId: null,
    projects: [],
    tasks:[]
  });

  console.log(projectsState)

  function handleAddTask(projectId, taskDescription) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: [...prevState.tasks, {
          id: uuid(),
          projectId: projectId,
          description: taskDescription
        }],
      };
    });
  }

  function handleDeleteTask(taskId) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(task=>task.id !== taskId),
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        addingProject: true,
        selectedProjectId: null,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        addingProject: false,
      };
    });
  }

  function handleDeleteProject() {
    const newProjects = 
      projectsState.projects.filter(project=>project.id !== projectsState.selectedProjectId)
    const newTasks = 
      projectsState.tasks.filter(task=>task.projectId!==projectsState.selectedProjectId)
    setProjectsState((prevState)=>{
      return {
        ...prevState,
        selectedProjectId: null,
        projects:newProjects,
        tasks:newTasks
      };
    })
  }

  function handleSaveProject(projectData) {
    const newProject = {
      ...projectData,
      id: uuid(),
    };
    setProjectsState((prevState) => {
      return {
        ...prevState,
        addingProject: false,
        projects: [newProject, ...prevState.projects],
      };
    });
  }

  function setSelectedProjectId(projectId) {
    console.log(projectId);
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: projectId,
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );
  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <ProjectSidebar
          projects={projectsState.projects}
          onStartAddProject={handleStartAddProject}
          selectedProjectId={projectsState.selectedProjectId}
          onSelectProject={setSelectedProjectId}
        />
        {
        projectsState.addingProject ? (
          <NewProject
            cancelHandler={handleCancelAddProject}
            saveHandler={handleSaveProject}

          />
        ) : selectedProject ? (
          <SelectedProject 
            project={selectedProject} 
            onDeleteProject={handleDeleteProject}
            handleAddTask={handleAddTask}
            handleDeleteTask={handleDeleteTask}
            tasks={projectsState.tasks}
            />
        ) : (
          <NoProjectSelected onStartAddProject={handleStartAddProject} />
        )}
      </main>
    </>
  );
}

export default App;
