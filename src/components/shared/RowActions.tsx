import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface RowActionsProps {
  onEdit: () => void
  onDelete: () => void
  deleteConfirmMessage?: string
}

export function RowActions({ onEdit, onDelete, deleteConfirmMessage }: RowActionsProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    const message = deleteConfirmMessage ?? 'Tem certeza que deseja excluir este registro? Esta ação não pode ser desfeita.'
    if (window.confirm(message)) onDelete()
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit()
  }

  return (
    <div className="flex gap-1 justify-end" onClick={(e) => e.stopPropagation()}>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={handleEdit}
        title="Editar"
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-destructive hover:text-destructive"
        onClick={handleDelete}
        title="Excluir"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
