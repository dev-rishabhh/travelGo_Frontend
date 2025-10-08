"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Users, Calendar, Phone, User, CalendarDays } from 'lucide-react';
import { BASE_URL } from '@/apis/api';

import { Button } from '@/components/ui/button';


const QueryPage = () => {
    const router = useRouter()
    const [query, setquery] = useState([])

    async function fetchQuery() {
        try {
            const response = await fetch(`${BASE_URL}/admin/query`, {
                credentials: "include",
            });
            if (response.ok) {
                const data = await response.json();
                setquery(data)
            }
            else {
                return router.push("/")
            }
        } catch (err) {
            console.error("Error fetching  queries:", err);
        }
    }

    async function handleDelete(id) {
        try {
            const response = await fetch(`${BASE_URL}/admin/query`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
                credentials: "include",
            });
            if (response.ok) {
                return router.push("/admin/query")
            }
            else {
                return router.push("/")
            }
            fetchQuery();
        } catch (err) {
            console.error("Error deleting query :", err);
        }
    }

    useEffect(() => {
        fetchQuery();
    }, []);


    return (
        <div className="px-4 m-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-2xl font-semibold text-gray-900">Query Dashboard</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all queries including their details and status.
                    </p>
                </div>
            </div>

            {/* Query Table */}
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            {/* no query found */}
                            {query.length === 0 ? (
                                <div className="text-center py-2">
                                    <CalendarDays size={64} className="mx-auto text-gray-400 mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No queries found</h3>
                                    <p className="text-gray-500 mb-2">Start planning your next adventure!</p>
                                </div>
                            ) : (
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                Id
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                User
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                Phone
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                Subject
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                Message
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                Delete
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {/* if query exists */}
                                        {query.map((query, idx) => (
                                            <tr key={query._id} className="hover:bg-gray-50 transition-colors duration-200">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    #{idx + 1}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="ml-4">
                                                            <div className="text-sm text-gray-500">Name: {query.name}</div>
                                                            <div className="text-sm font-medium text-gray-900">Email: {query.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-900">{query.phone}</span>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full`}>
                                                        {query.subject}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {query.message}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <Button
                                                        onClick={() => handleDelete(query._id)}
                                                        variant='destructive'
                                                    >
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QueryPage