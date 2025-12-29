import Link from 'next/link'
import React from 'react'

const AdminSidebar = () => {
  return (
    <>
        <Link href="/dashboard">
            <span>Dashboard</span>
        </Link>
        <ul>
            <li><Link href="/dashboard/add-project">add project</Link></li>
        </ul>
    </>
  )
}

export default AdminSidebar