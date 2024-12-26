'use client'

import { useState, useEffect, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Task } from '@/types/task'
import { loadTasks, saveTasks } from '@/utils/localStorage'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import HoraAtual from '@/components/HoraAtual'

export default function TodoList() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTask, setNewTask] = useState('')
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>('none')

    useEffect(() => {
        setTasks(loadTasks())
    }, [])

    useEffect(() => {
        saveTasks(tasks)
    }, [tasks])

    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTask.trim()) {
            const now = new Date();
            const horaCriacao = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setTasks([...tasks, { id: uuidv4(), text: newTask.trim(), completed: false, hora: horaCriacao }]);
            setNewTask('');
        }
    };


    const toggleTask = (id: string) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ))
    }

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id))
    }

    const filteredAndSortedTasks = useMemo(() => {
        return tasks
            .filter(task => {
                const matchesFilter =
                    filter === 'all' ||
                    (filter === 'active' && !task.completed) ||
                    (filter === 'completed' && task.completed)
                const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase())
                return matchesFilter && matchesSearch
            })
            .sort((a, b) => {
                if (sortOrder === 'none') return 0
                const comparison = a.text.localeCompare(b.text)
                return sortOrder === 'asc' ? comparison : -comparison
            })
    }, [tasks, filter, searchQuery, sortOrder])

    return (
        <main className='flex flex-col items-center justify-center my-10 w-full'>
            <Card className="w-full max-w-2xl mx-auto md:shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Suas tarefas:</CardTitle>
                </CardHeader>
                <ScrollArea className='min-h-[400px] max-h-[400px] overflow-y-auto'>
                    <CardContent className='min-h-[400px] max-h-[400px]'>
                        <form onSubmit={addTask} className="flex space-x-2 mb-4">
                            <Input
                                type="text"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                placeholder="Adicionar uma nova tarefa"
                                className="flex-grow my-1"
                            />
                            <Button className='my-1' type="submit">Adicionar</Button>
                        </form>
                        <div className="flex space-x-2 mb-4">
                            <Input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Pesquisar tarefas"
                                className="flex-grow"
                            />
                            <Select value={sortOrder} onValueChange={(value: 'asc' | 'desc' | 'none') => setSortOrder(value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Sort Order" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">
                                        <span className="flex items-center">
                                            <ArrowUpDown className="mr-2 h-4 w-4" />
                                            Sem ordem
                                        </span>
                                    </SelectItem>
                                    <SelectItem value="asc">
                                        <span className="flex items-center">
                                            <ArrowUpDown className="mr-2 h-4 w-4" />
                                            A-Z
                                        </span>
                                    </SelectItem>
                                    <SelectItem value="desc">
                                        <span className="flex items-center">
                                            <ArrowUpDown className="mr-2 h-4 w-4" />
                                            Z-A
                                        </span>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Tabs value={filter} onValueChange={(value) => setFilter(value as 'all' | 'active' | 'completed')}>
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="all">Todas</TabsTrigger>
                                <TabsTrigger value="active">Para completar</TabsTrigger>
                                <TabsTrigger value="completed">Completas</TabsTrigger>
                            </TabsList>
                            <TabsContent value={filter}>
                                <ul className="space-y-2">
                                    {filteredAndSortedTasks.map(task => (
                                        <li key={task.id} className="flex items-center justify-between p-2 border rounded">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={task.id}
                                                    checked={task.completed}
                                                    onCheckedChange={() => toggleTask(task.id)}
                                                />
                                                <label
                                                    htmlFor={task.id}
                                                    className={`${task.completed ? 'line-through text-gray-500' : ''}`}
                                                >
                                                    {task.text}
                                                </label>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <HoraAtual hora={task.hora} />
                                                <Button variant="destructive" size="sm" onClick={() => deleteTask(task.id)}>
                                                    Deletar
                                                </Button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </TabsContent>
                        </Tabs>
                    </CardContent>

                </ScrollArea>
                <CardFooter className="mt-2 justify-between">
                    <p>{tasks.filter(task => !task.completed).length} tarefas pendentes</p>
                    <Button
                        variant="outline"
                        onClick={() => setTasks(tasks.filter(task => !task.completed))}
                        disabled={!tasks.some(task => task.completed)}
                    >
                        Limpar as completas
                    </Button>
                </CardFooter>
            </Card>
        </main>
    )
}

