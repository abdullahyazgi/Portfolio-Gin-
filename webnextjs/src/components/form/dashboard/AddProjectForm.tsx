"use client"
import axios from 'axios'
import { DOMAIN } from "@/lib/constants";
import { ModelsProject } from "@/api/api";
import { useRouter } from 'next/navigation';
import { useState } from 'react';



const AddProjectForm = () => {
    const router = useRouter();
      const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post<ModelsProject[]>(`${DOMAIN}/api/projects`, {title, description});
            setTitle("");
      setDescription("");
             router.refresh();
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <form onSubmit={formSubmitHandler}>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <label htmlFor="description">Description:</label>
            <input type="text" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button type="submit">Add Project</button>
        </form>
    )
}

export default AddProjectForm