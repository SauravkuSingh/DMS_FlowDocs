import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
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
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AddDocumentDialog from '@/components/dashboard/AddDocumentDialog';

const DashboardPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [tabValue, setTabValue] = useState('all');
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = (value) => {
    if (value === 'professional' || value === 'personal') {
      setOpenDialog(true);
    }
  };

  const handleClose = (open) => {
    setOpenDialog(open);
    if (!open) {
      setSelectedValue('');
    }
  };

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Close dialog or show success message
    }, 1000);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 470);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tabs = [
    { label: 'All', value: 'all', icon: <FileText className="h-4 w-4" /> },
    { label: 'Unfullfilled', value: 'Unfullfilled', icon: <Clock className="h-4 w-4" /> },
    { label: 'Unpaid', value: 'Unpaid', icon: <Clock className="h-4 w-4" /> },
    { label: 'Open', value: 'Open', icon: <FileText className="h-4 w-4" /> },
    { label: 'Close', value: 'Close', icon: <CheckCircle2 className="h-4 w-4" /> },
    { label: 'Add', value: 'Add', icon: <PlusCircle className="h-4 w-4" /> },
  ];

  return (
    <div className="dashboard_container flex max-w-screen flex-col gap-5 animate-in fade-in duration-500">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-xl shadow-sm border border-slate-100">
        <div className="flex flex-wrap items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="h-6 w-6 text-purple-600" />
            <span>Documents</span>
          </h2>
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
            <span className="font-medium">9</span> documents found
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>

         <AddDocumentDialog />
        </div>
      </div>

      
    </div>
  );
};

export default DashboardPage;
