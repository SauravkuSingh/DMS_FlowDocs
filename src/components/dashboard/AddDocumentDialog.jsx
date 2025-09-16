import React, { useState, useEffect } from 'react'
import {
  Calendar1Icon,
  Download,
  PlusCircle,
  Search,
  Filter,
  SortAsc,
  MoreHorizontal,
  Plus,
  Upload,
  ChevronDown,
  FileText,
  Clock,
  CheckCircle2,
} from 'lucide-react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Calendar } from '@/components/ui/calendar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const AddDocumentDialog = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [tabValue, setTabValue] = useState('all')
  const [date, setDate] = useState(new Date())
  const [category, setCategory] = useState('')
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSelect = (value) => {
    if (value === 'professional' || value === 'personal') {
      setOpenDialog(true)
    }
  }

  const handleClose = (open) => {
    setOpenDialog(open)
    if (!open) {
      setSelectedValue('')
    }
  }

  const handleSave = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Close dialog or show success message
    }, 1000)
  }

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 470)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-purple-600 text-white shadow-md transition-all duration-200 hover:bg-purple-700 hover:shadow-lg">
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">Add Document</span>
          <ChevronDown className="h-4 w-4 sm:ml-1"></ChevronDown>
        </Button>
      </DialogTrigger>
      <DialogContent className="animate-in fade-in-50 zoom-in-95 duration-200 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <FileText className="h-5 w-5 text-purple-600" />
            Create New Document
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-5 py-4">
          {/* Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="name"
              className="text-right font-medium text-gray-700"
            >
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter customer name"
              className="col-span-3 focus:border-purple-400 focus:ring-purple-200"
            />
          </div>

          {/* Email */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="email"
              className="text-right font-medium text-gray-700"
            >
              Email
            </Label>
            <Input
              id="email"
              placeholder="Enter email"
              className="col-span-3 focus:border-purple-400 focus:ring-purple-200"
            />
          </div>

          {/* Date Picker */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium text-gray-700">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="col-span-3 justify-start text-left font-normal transition-all duration-200 hover:border-purple-400"
                >
                  <Calendar1Icon className="mr-2 h-4 w-4 text-purple-500" />
                  {date ? date.toDateString() : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="z-[9999] w-auto rounded-lg border border-purple-100 bg-white p-0 shadow-xl"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-lg"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Category */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-medium text-gray-700">
              Category
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="col-span-3 transition-all duration-200 hover:border-purple-400"
                >
                  {category || 'Select Category'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="animate-in fade-in-50 zoom-in-95 duration-200">
                <DropdownMenuLabel>Choose Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="hover:bg-purple-50">
                    Personal
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="animate-in fade-in-50 zoom-in-95 duration-200">
                    <DropdownMenuItem
                      onClick={() => setCategory('Personal - Family')}
                      className="cursor-pointer hover:bg-purple-50"
                    >
                      Family
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setCategory('Personal - Friends')}
                      className="cursor-pointer hover:bg-purple-50"
                    >
                      Friends
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="hover:bg-purple-50">
                    Professional
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="animate-in fade-in-50 zoom-in-95 duration-200">
                    <DropdownMenuItem
                      onClick={() => setCategory('Professional - Work')}
                      className="cursor-pointer hover:bg-purple-50"
                    >
                      Work
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setCategory('Professional - Business')}
                      className="cursor-pointer hover:bg-purple-50"
                    >
                      Business
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Remarks */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label
              htmlFor="remarks"
              className="text-right font-medium text-gray-700"
            >
              Remarks
            </Label>
            <Textarea
              id="remarks"
              placeholder="Enter remarks..."
              className="col-span-3 min-h-[100px] focus:border-purple-400 focus:ring-purple-200"
            />
          </div>

          {/*  File Upload */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label
              htmlFor="document"
              className="text-right font-medium text-gray-700"
            >
              Upload
            </Label>
            <div className="col-span-3">
              <label
                htmlFor="document"
                className="group flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-purple-200 transition-colors duration-200 hover:bg-purple-50"
              >
                <Upload className="mb-2 h-6 w-6 text-purple-500 transition-transform duration-200 group-hover:scale-110" />
                <span className="text-sm text-gray-500 transition-colors duration-200 group-hover:text-purple-700">
                  Click to upload PDF/Image
                </span>
              </label>
              <Input
                id="document"
                type="file"
                accept=".pdf,image/*"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
              {file && (
                <div className="animate-in fade-in mt-2 flex items-center gap-2 rounded-md border border-purple-100 bg-purple-50 p-2 text-sm text-gray-600 duration-200">
                  <FileText className="h-4 w-4 text-purple-500" />
                  <span>Selected: {file.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            className="bg-purple-600 transition-all duration-200 hover:bg-purple-700"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="animate-pulse">Saving...</span>
              </>
            ) : (
              'Save Document'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddDocumentDialog
