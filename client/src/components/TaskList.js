import {useEffect, useState} from 'react'
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TaskList() {
  const [tasks, setTasks] = useState([])
  const navigate = useNavigate()

  const loadTask = async () =>{
   const response = await fetch('/tasks')

   const data = await response.json()
   setTasks(data)
  }
  const handleDelete = async (id) =>{
  try {
    await fetch(`/tasks/${id}`,{
      method:'DELETE',
    })
    setTasks(
      tasks.filter(task => task.id !==id)
    )
  } catch (error) {
    console.log(error)
  }

   
    
  }
  useEffect(()=>{
    loadTask()
  },[])


  return (
   <>
    <h1>Lista de Tareas</h1>
    {
      tasks.map(task=>(
        <Card style={{
          marginBottom: ".7rem",
          backgroundColor: '#1e272e'
        }}
        key={task.id}>

          <CardContent style={{
            display:'flex',
            justifyContent:'space-between'
          }}>
            <div style={{color:'white'}}>
            <Typography>{task.title}</Typography>
            <Typography>{task.description}</Typography>
            </div>
            <div>
            <Button variant='contained' color='inherit' onClick={() => navigate(`/tasks/${task.id}/edit`) }>
              Editar
            </Button>
            <Button  variant='contained' color='warning' onClick={() => handleDelete(task.id)} style={{
              marginLeft:'.5rem'
            }}>
              Eliminar
            </Button>
            </div>
          </CardContent>
        </Card>

      ))
    }
   </>
  )
}
