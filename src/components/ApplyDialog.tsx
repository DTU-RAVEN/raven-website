import { useMemo, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { createApplicationMailto, applicationBody } from '@/lib/mailto'
import { cn } from '@/lib/utils'

type ApplyDialogProps = {
  subject?: string
  label?: string
  buttonClassName?: string
  buttonText?: string
}

const ApplyDialog = ({
  subject,
  label,
  buttonClassName,
  buttonText = 'Apply',
}: ApplyDialogProps) => {
  const displaySubject = subject ?? 'General application'
  const initialSubject = subject
    ? `RAVEN application - ${subject}`
    : 'RAVEN application - General'
  const [subjectText, setSubjectText] = useState(initialSubject)
  const [message, setMessage] = useState(applicationBody)
  const mailto = useMemo(() => createApplicationMailto(subjectText, message), [subjectText, message])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className={cn(buttonClassName ?? 'apply')}>
          {buttonText}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{label ?? `Apply for ${displaySubject}`}</DialogTitle>
          <DialogDescription>
            Open your email client with a pre-filled application subject and message.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block" htmlFor="application-subject">
              Email subject
            </label>
            <input
              id="application-subject"
              type="text"
              value={subjectText}
              onChange={(event) => setSubjectText(event.target.value)}
              className="w-full rounded-md border border-muted bg-background p-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block" htmlFor="application-message">
              Email message
            </label>
            <textarea
              id="application-message"
              rows={10}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="w-full rounded-md border border-muted bg-background p-3 text-sm leading-relaxed text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button type="button" className="btn-secondary">
              Cancel
            </button>
          </DialogClose>
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              const link = document.createElement('a')
              link.href = mailto
              link.style.display = 'none'
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)

              if (window.location.href !== mailto) {
                window.location.href = mailto
              }
            }}
          >
            Open email client
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ApplyDialog
