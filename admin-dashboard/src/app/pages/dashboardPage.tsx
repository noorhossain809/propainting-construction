"use client"

import React from 'react'
import DashboardLayout from '../dashboard/layout'
import { useDeleteProjectMutation, useGetAllProjectsQuery } from '@/redux/api/constructionProjectApi'

import { Trash2, Pencil } from 'lucide-react'
import StatCard from './StateCard'

const Dashboard = () => {
    const { data: projects, isLoading, isError } = useGetAllProjectsQuery()
    const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation()

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this project?")) {
            await deleteProject(id).unwrap()
        }
    }

    // stats গণনা (তোমার schema-তে status field না থাকলে category দিয়ে approximate করলাম — নিচে নোট দেখো)
    const total = projects?.length || 0
    const ended = projects?.filter((p) => !!p.completedDate).length || 0
    const running = total - ended

    if (isLoading) {
        return (
            <DashboardLayout>
                <p className="text-sm text-gray-500">Loading...</p>
            </DashboardLayout>
        )
    }

    if (isError) {
        return (
            <DashboardLayout>
                <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                    <p className="text-sm text-gray-500 mt-1">Overview of all construction projects</p>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="Total Projects"
                        value={total}
                        footer="Increased from last month"
                        footerType="increase"
                        variant="highlight"
                    />
                    <StatCard
                        title="Ended Projects"
                        value={ended}
                        footer="Increased from last month"
                        footerType="increase"
                    />
                    <StatCard
                        title="Running Projects"
                        value={running}
                        footer="Increased from last month"
                        footerType="increase"
                    />
                    <StatCard
                        title="Pending Project"
                        value={0}
                        footer="On Discuss"
                        footerType="neutral"
                    />
                </div>

                {/* Project list */}
                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-100">
                        <h2 className="text-base font-semibold text-gray-900">All Projects</h2>
                    </div>

                    {total === 0 ? (
                        <p className="px-5 py-8 text-center text-sm text-gray-400">
                            No projects yet. Create your first one to see it here.
                        </p>
                    ) : (
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-gray-400 border-b border-gray-100">
                                    <th className="px-5 py-3 font-medium">Title</th>
                                    <th className="px-5 py-3 font-medium">Category</th>
                                    <th className="px-5 py-3 font-medium">Location</th>
                                    <th className="px-5 py-3 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects?.map((project) => (
                                    <tr
                                        key={project._id}
                                        className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50"
                                    >
                                        <td className="px-5 py-3 font-medium text-gray-900">
                                            {project.title}
                                        </td>
                                        <td className="px-5 py-3 text-gray-500 capitalize">
                                            {project.category}
                                        </td>
                                        <td className="px-5 py-3 text-gray-500">
                                            {project.location || "—"}
                                        </td>
                                        <td className="px-5 py-3">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                                                    title="Edit"
                                                >
                                                    <Pencil size={15} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(project._id)}
                                                    disabled={isDeleting}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Dashboard