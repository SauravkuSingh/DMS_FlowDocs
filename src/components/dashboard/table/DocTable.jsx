import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { FileSpreadsheet, MessageSquare, MoreVertical, Download, Trash, Pencil, ChevronsUpDown, Calendar, Search, Filter, CalendarIcon, Eye } from 'lucide-react';
import { BiMessageDetail } from 'react-icons/bi';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function DocTable() {
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const documents = [
    {
      id: 1,
      name: 'Financial Report Q1 2023.pdf',
      owner: 'John Smith',
      dateCreated: '2023-03-15 • 10:30 AM',
      lastUpdated: '2 days ago • John Smith',
      status: 'Approved',
      category: 'Finance',
    },
    {
      id: 2,
      name: 'Project Proposal.pdf',
      owner: 'Emily Johnson',
      dateCreated: '2023-03-10 • 2:15 PM',
      lastUpdated: '5 days ago • Emily Johnson',
      status: 'In Review',
      category: 'Projects',
    },
    {
      id: 3,
      name: 'Marketing Campaign Results.pdf',
      owner: 'Michael Brown',
      dateCreated: '2023-03-05 • 9:45 AM',
      lastUpdated: '1 week ago • Michael Brown',
      status: 'Approved',
      category: 'Marketing',
    },
    {
      id: 4,
      name: 'Employee Handbook.pdf',
      owner: 'Sarah Davis',
      dateCreated: '2023-02-28 • 3:20 PM',
      lastUpdated: '2 weeks ago • Sarah Davis',
      status: 'Published',
      category: 'HR',
    },
    {
      id: 5,
      name: 'Product Roadmap 2023.pdf',
      owner: 'David Wilson',
      dateCreated: '2023-02-20 • 11:10 AM',
      lastUpdated: '3 weeks ago • David Wilson',
      status: 'Draft',
      category: 'Product',
    },
    {
      id: 6,
      name: 'Client Meeting Notes.pdf',
      owner: 'Jennifer Lee',
      dateCreated: '2023-02-15 • 4:30 PM',
      lastUpdated: '1 month ago • Jennifer Lee',
      status: 'In Review',
      category: 'Sales',
    },
    {
      id: 7,
      name: 'Budget Planning 2023.pdf',
      owner: 'Robert Taylor',
      dateCreated: '2023-02-10 • 1:45 PM',
      lastUpdated: '1 month ago • Robert Taylor',
      status: 'Approved',
      category: 'Finance',
    },
    {
      id: 8,
      name: 'Website Redesign Mockups.pdf',
      owner: 'Amanda Martinez',
      dateCreated: '2023-02-05 • 10:20 AM',
      lastUpdated: '1 month ago • Amanda Martinez',
      status: 'In Progress',
      category: 'Design',
    },
    {
      id: 9,
      name: 'Sales Report Q4 2022.pdf',
      owner: 'Thomas Anderson',
      dateCreated: '2023-01-30 • 2:50 PM',
      lastUpdated: '2 months ago • Thomas Anderson',
      status: 'Published',
      category: 'Sales',
    },
    {
      id: 10,
      name: 'Competitor Analysis.pdf',
      owner: 'Jessica White',
      dateCreated: '2023-01-25 • 9:15 AM',
      lastUpdated: '2 months ago • Jessica White',
      status: 'Confidential',
      category: 'Research',
    },
    {
      id: 11,
      name: 'Board Meeting Presentation.pdf',
      owner: 'Daniel Clark',
      dateCreated: '2023-01-20 • 3:40 PM',
      lastUpdated: '2 months ago • Daniel Clark',
      status: 'Approved',
      category: 'Executive',
    },
    {
      id: 12,
      name: 'Product Launch Plan.pdf',
      owner: 'Isabella Rodriguez',
      dateCreated: '2023-01-15 • 11:30 AM',
      lastUpdated: '5 hrs ago • Isabella Rodriguez',
      status: 'In Progress',
      category: 'Launch',
    },
  ];

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedDocs([]);
    } else {
      setSelectedDocs(filteredDocuments.map(doc => doc.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectDoc = (id) => {
    if (selectedDocs.includes(id)) {
      setSelectedDocs(selectedDocs.filter(docId => docId !== id));
      setSelectAll(false);
    } else {
      setSelectedDocs([...selectedDocs, id]);
      if (selectedDocs.length + 1 === filteredDocuments.length) {
        setSelectAll(true);
      }
    }
  };

  const handleDownload = (id) => {
    console.log(`Downloading document with ID: ${id}`);
  };

  const handleDownloadSelected = () => {
    console.log(`Downloading selected documents: ${selectedDocs.join(', ')}`);
  };

  const [previewDoc, setPreviewDoc] = useState(null);
  const isPreviewable = (fileName) => {
    const lower = fileName.toLowerCase();
    return lower.endsWith('.pdf') || lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png') || lower.endsWith('.gif') || lower.endsWith('.webp');
  };

  const filteredDocuments = documents.filter(doc => {

    const matchesSearch = searchQuery === '' || 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;

    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    
    const docDate = new Date(doc.dateCreated.split(' ')[0]);
    const matchesFromDate = !fromDate || docDate >= fromDate;
    const matchesToDate = !toDate || docDate <= toDate;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesFromDate && matchesToDate;
  });

  useEffect(() => {
    setSelectAll(false);
    setSelectedDocs([]);
  }, [searchQuery, categoryFilter, statusFilter, fromDate, toDate]);

  const categories = [...new Set(documents.map(doc => doc.category))];
  const statuses = [...new Set(documents.map(doc => doc.status))];

  const FileIcon = ({ fileName }) => {
    if (fileName.endsWith('.pdf')) {
      return <FileSpreadsheet className="h-5 w-5 text-red-500" />;
    } else if (fileName.endsWith('.jpg') || fileName.endsWith('.png') || fileName.endsWith('.jpeg')) {
      return <FileSpreadsheet className="h-5 w-5 text-blue-500" />;
    } else {
      return <FileSpreadsheet className="h-5 w-5 text-gray-500" />;
    }
  };

  const StatusBadge = ({ status }) => {
    let bgColor = '';
    let textColor = '';

    switch (status) {
      case 'Approved':
        bgColor = 'bg-green-100';
        textColor = 'text-green-800';
        break;
      case 'In Review':
        bgColor = 'bg-yellow-100';
        textColor = 'text-yellow-800';
        break;
      case 'Published':
        bgColor = 'bg-blue-100';
        textColor = 'text-blue-800';
        break;
      case 'Draft':
        bgColor = 'bg-gray-100';
        textColor = 'text-gray-800';
        break;
      case 'In Progress':
        bgColor = 'bg-purple-100';
        textColor = 'text-purple-800';
        break;
      case 'Confidential':
        bgColor = 'bg-red-100';
        textColor = 'text-red-800';
        break;
      default:
        bgColor = 'bg-gray-100';
        textColor = 'text-gray-800';
    }

    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${bgColor} ${textColor}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex w-full max-w-md items-center">
          <Search className="absolute left-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search documents..."
            className="pl-8 pr-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px]" hideIcon>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]" hideIcon>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tags</SelectItem>
              {statuses.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[140px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {fromDate ? fromDate.toLocaleDateString() : "From Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={fromDate}
                onSelect={setFromDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[140px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {toDate ? toDate.toLocaleDateString() : "To Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={toDate}
                onSelect={setToDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          {(searchQuery || categoryFilter !== 'all' || statusFilter !== 'all' || fromDate || toDate) && (
            <Button 
              variant="ghost" 
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
                setStatusFilter('all');
                setFromDate(null);
                setToDate(null);
              }}
              className="text-sm"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>
      
      <div className="overflow-hidden rounded-lg border">
        {selectedDocs.length > 0 && (
          <div className="p-2 bg-gray-50 flex items-center justify-between">
            <span className="text-sm text-gray-700">{selectedDocs.length} document(s) selected</span>
            <button 
              onClick={handleDownloadSelected}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
            >
              <Download className="h-4 w-4" /> Download Selected
            </button>
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <div className="flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    checked={selectAll && filteredDocuments.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300"
                    disabled={filteredDocuments.length === 0}
                  />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <span>Name</span>
                  <ChevronsUpDown className="h-4 w-4 cursor-pointer text-black/70" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <span>Owner</span>
                  <ChevronsUpDown className="h-4 w-4 cursor-pointer text-black/70" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <span>Date Created</span>
                  <ChevronsUpDown className="h-4 w-4 cursor-pointer text-black/70" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <span>Last Updated</span>
                  <ChevronsUpDown className="h-4 w-4 cursor-pointer text-black/70" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <span>Tags</span>
                  <ChevronsUpDown className="h-4 w-4 cursor-pointer text-black/70" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <span>Category</span>
                  <ChevronsUpDown className="h-4 w-4 cursor-pointer text-black/70" />
                </div>
              </TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No documents found matching your filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredDocuments.map((document) => (
                <TableRow key={document.id}>
                  <TableCell>
                    <input 
                      type="checkbox" 
                      checked={selectedDocs.includes(document.id)}
                      onChange={() => handleSelectDoc(document.id)}
                      className="rounded border-gray-300"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileIcon fileName={document.name} />
                      <span className="font-medium">{document.name}</span>
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            className="ml-1 inline-flex items-center rounded p-1 text-gray-500 hover:text-blue-600"
                            onClick={() => setPreviewDoc(document)}
                            aria-label="Preview file"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl w-[calc(100%-2rem)]">
                          <DialogHeader>
                            <DialogTitle>Preview: {previewDoc?.name}</DialogTitle>
                          </DialogHeader>
                          {previewDoc && isPreviewable(previewDoc.name) ? (
                            previewDoc.name.toLowerCase().endsWith('.pdf') ? (
                              <iframe title="PDF preview" className="h-[70vh] w-full rounded" src={`/${encodeURIComponent(previewDoc.name)}`} />
                            ) : (
                              <img alt={previewDoc.name} className="max-h-[70vh] w-auto rounded" src={`/${encodeURIComponent(previewDoc.name)}`} />
                            )
                          ) : (
                            <div className="text-sm text-gray-600">
                              Preview is not available for this file type. Please download to view.
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                  <TableCell>{document.owner}</TableCell>
                  <TableCell>{document.dateCreated}</TableCell>
                  <TableCell>{document.lastUpdated}</TableCell>
                  <TableCell>
                    <StatusBadge status={document.status} />
                  </TableCell>
                  <TableCell>{document.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Pencil className="h-4 w-4 cursor-pointer text-gray-500 hover:text-blue-600" />
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreVertical className="h-4 w-4 cursor-pointer text-gray-500" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleDownload(document.id)} className="cursor-pointer">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer text-red-600">
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
