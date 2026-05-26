import { useState, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Upload, FileText, Image as ImageIcon, FileSpreadsheet, File as FileIcon, Trash2, Download, FolderOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { getSupabase } from '@/lib/supabaseClient'
import { usePreferences, formatDate } from '@/contexts/PreferencesContext'

const BUCKET = 'materiais'

interface Material {
  name: string
  fullPath: string
  size: number
  updated_at: string
  mime?: string
}

function iconFor(name: string) {
  const ext = name.split('.').pop()?.toLowerCase() ?? ''
  if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(ext)) return ImageIcon
  if (['xlsx', 'xls', 'csv'].includes(ext)) return FileSpreadsheet
  if (['pdf', 'doc', 'docx', 'txt', 'md', 'pptx', 'ppt'].includes(ext)) return FileText
  return FileIcon
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function useMaterials() {
  return useQuery({
    queryKey: ['materiais'],
    queryFn: async (): Promise<Material[]> => {
      const supabase = await getSupabase()
      const { data, error } = await supabase.storage.from(BUCKET).list('', {
        limit: 1000,
        sortBy: { column: 'created_at', order: 'desc' },
      })
      if (error) throw error
      return (data ?? [])
        .filter((f) => f.name && f.name !== '.emptyFolderPlaceholder')
        .map((f) => ({
          name: f.name,
          fullPath: f.name,
          size: (f.metadata as any)?.size ?? 0,
          updated_at: f.updated_at ?? f.created_at ?? '',
          mime: (f.metadata as any)?.mimetype,
        }))
    },
  })
}

export function Materiais() {
  const { prefs } = usePreferences()
  const qc = useQueryClient()
  const { data: files = [], isLoading } = useMaterials()
  const [filter, setFilter] = useState('')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState<string | null>(null)
  const fileInput = useRef<HTMLInputElement>(null)
  const dropRef = useRef<HTMLDivElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const uploadMutation = useMutation({
    mutationFn: async (fileList: File[]) => {
      const supabase = await getSupabase()
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i]
        setProgress(`${i + 1}/${fileList.length} — ${file.name}`)
        const safeName = `${Date.now()}-${file.name.replace(/[^\w.\-]/g, '_')}`
        const { error } = await supabase.storage.from(BUCKET).upload(safeName, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type || undefined,
        })
        if (error) throw error
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['materiais'] }),
  })

  const deleteMutation = useMutation({
    mutationFn: async (path: string) => {
      const supabase = await getSupabase()
      const { error } = await supabase.storage.from(BUCKET).remove([path])
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['materiais'] }),
  })

  const handleFiles = async (fl: FileList | null) => {
    if (!fl || fl.length === 0) return
    setUploading(true)
    try {
      await uploadMutation.mutateAsync(Array.from(fl))
    } catch (e) {
      window.alert(`Erro ao enviar: ${(e as Error).message}`)
    } finally {
      setUploading(false)
      setProgress(null)
      if (fileInput.current) fileInput.current.value = ''
    }
  }

  const handleDownload = async (path: string) => {
    const supabase = await getSupabase()
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
    window.open(data.publicUrl, '_blank', 'noopener')
  }

  const handleDelete = (path: string, name: string) => {
    if (window.confirm(`Excluir "${name}"?`)) deleteMutation.mutate(path)
  }

  const visible = files.filter((f) => f.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Materiais</h1>
        <p className="text-muted-foreground">Documentos, fotos, planilhas e PDFs para uso nas reuniões.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div
            ref={dropRef}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragOver(false)
              handleFiles(e.dataTransfer.files)
            }}
            className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-lg p-10 transition-colors cursor-pointer ${
              dragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
            }`}
            onClick={() => fileInput.current?.click()}
          >
            <Upload className="h-10 w-10 text-muted-foreground" />
            <div className="text-center">
              <p className="font-medium">Arraste arquivos aqui ou clique para selecionar</p>
              <p className="text-sm text-muted-foreground">PDF, DOCX, XLSX, PPTX, imagens — qualquer arquivo até 50&nbsp;MB</p>
            </div>
            {uploading && <p className="text-sm text-primary">Enviando {progress}…</p>}
            <input
              ref={fileInput}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" /> Arquivos ({files.length})
          </CardTitle>
          <Input
            placeholder="Buscar por nome…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="max-w-xs"
          />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Carregando…</p>
          ) : visible.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">
              {files.length === 0 ? 'Nenhum material enviado ainda.' : 'Nenhum arquivo corresponde à busca.'}
            </p>
          ) : (
            <div className="space-y-2">
              {visible.map((f) => {
                const Icon = iconFor(f.name)
                return (
                  <div key={f.fullPath} className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted/40 transition-colors">
                    <Icon className="h-6 w-6 text-muted-foreground shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{f.name.replace(/^\d+-/, '')}</p>
                      <p className="text-xs text-muted-foreground flex gap-2 items-center flex-wrap">
                        <Badge variant="outline" className="font-normal">{formatSize(f.size)}</Badge>
                        <span>{formatDate(f.updated_at, prefs.dateLocale)}</span>
                        {f.mime && <span className="truncate">{f.mime}</span>}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDownload(f.fullPath)} title="Abrir / baixar">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(f.fullPath, f.name)} title="Excluir">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
