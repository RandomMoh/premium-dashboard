"use client"

import { useState, useMemo } from "react"
import { Search, SlidersHorizontal, MoreHorizontal, Download } from "lucide-react"

const MOCK_CLIENTS = [
  { id: 1, name: "Acme Corp", contact: "sarah@acme.com", status: "Active", spent: "$12,450" },
  { id: 2, name: "Globex Inc", contact: "mike@globex.com", status: "Pending", spent: "$3,200" },
  { id: 3, name: "Soylent", contact: "john@soylent.com", status: "Active", spent: "$8,900" },
  { id: 4, name: "Initech", contact: "peter@initech.com", status: "Inactive", spent: "$0" },
  { id: 5, name: "Umbrella Corp", contact: "alice@umbrella.com", status: "Active", spent: "$45,000" },
  { id: 6, name: "Stark Industries", contact: "tony@stark.com", status: "Active", spent: "$125,000" },
  { id: 7, name: "Wayne Enterprises", contact: "bruce@wayne.com", status: "Active", spent: "$89,000" },
]

export default function ClientsPage() {
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  // Filter logic
  const filteredClients = useMemo(() => {
    return MOCK_CLIENTS.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase()) || 
      c.contact.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  // Pagination logic
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage)
  const paginatedClients = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredClients.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredClients, currentPage])

  // Reset page when searching
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setCurrentPage(1)
  }

  // CSV Export logic
  const handleExportCSV = () => {
    const headers = ["Company Name", "Primary Contact", "Status", "Total Spent"]
    const rows = filteredClients.map(c => `"${c.name}","${c.contact}","${c.status}","${c.spent}"`)
    const csvContent = [headers.join(","), ...rows].join("\n")
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "strata_clients_export.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-end justify-between">
        <div>
          <div className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-black/5 dark:bg-white/10 text-muted mb-4">
            Directory
          </div>
          <h2 className="text-4xl font-medium tracking-tight">Clients</h2>
        </div>
        
        <button 
          onClick={handleExportCSV}
          className="h-10 px-6 rounded-full bg-foreground text-background font-medium hover:scale-[0.98] transition-transform flex items-center gap-2"
        >
          <Download size={16} />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="double-bezel-outer">
        {/* Removed inline bg-white so dark mode variables take over naturally */}
        <div className="double-bezel-inner overflow-hidden bg-transparent">
          
          <div className="p-6 border-b border-border flex items-center justify-between bg-black/[0.02] dark:bg-white/[0.02]">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
              <input 
                type="text" 
                placeholder="Search clients..." 
                value={search}
                onChange={handleSearchChange}
                className="h-10 w-full rounded-full bg-transparent border border-border pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-black/10 dark:focus:ring-white/20"
              />
            </div>
            <button className="h-10 px-4 rounded-full border border-border bg-transparent flex items-center gap-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </button>
          </div>

          <div className="w-full overflow-x-auto min-h-[300px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-sm font-medium text-muted">
                  <th className="py-4 px-6 font-medium">Company Name</th>
                  <th className="py-4 px-6 font-medium">Primary Contact</th>
                  <th className="py-4 px-6 font-medium">Status</th>
                  <th className="py-4 px-6 font-medium">Total Spent</th>
                  <th className="py-4 px-6 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedClients.map((client) => (
                  <tr key={client.id} className="border-b border-border last:border-0 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors group">
                    <td className="py-4 px-6 font-medium">{client.name}</td>
                    <td className="py-4 px-6 text-muted">{client.contact}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        client.status === 'Active' ? 'bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400' : 
                        client.status === 'Pending' ? 'bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400' : 
                        'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400'
                      }`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono text-sm">{client.spent}</td>
                    <td className="py-4 px-6 text-right">
                      <button className="p-2 text-muted hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {paginatedClients.length === 0 && (
              <div className="py-24 text-center text-muted">
                <p>No clients found matching your search.</p>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted bg-black/[0.02] dark:bg-white/[0.02]">
            <span>Showing {paginatedClients.length} of {filteredClients.length} results</span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-border bg-transparent hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50 transition-colors"
              >
                Previous
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-3 py-1.5 rounded-lg border border-border bg-transparent hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50 transition-colors"
              >
                Next
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
