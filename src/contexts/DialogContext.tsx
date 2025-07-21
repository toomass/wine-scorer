import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { WorkingDialog } from '../components/WorkingDialog';

interface DialogContextType {
  showDialog: (content: ReactNode) => void;
  hideDialog: () => void;
  isOpen: boolean;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<ReactNode>(null);

  const showDialog = (content: ReactNode) => {
    setDialogContent(content);
    setIsOpen(true);
  };

  const hideDialog = () => {
    setIsOpen(false);
    setDialogContent(null);
  };

  return (
    <DialogContext.Provider value={{ showDialog, hideDialog, isOpen }}>
      {children}
      <WorkingDialog isOpen={isOpen} onClose={hideDialog}>
        {dialogContent}
      </WorkingDialog>
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
} 