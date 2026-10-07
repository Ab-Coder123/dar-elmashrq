import { cn } from '@dar-elmashrq/utils'

interface BlueprintCrosshairProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  className?: string
}

export function BlueprintCrosshair({
  position = 'top-left',
  className,
}: BlueprintCrosshairProps) {
  const positionClasses = {
    'top-left': '-top-2 -left-2',
    'top-right': '-top-2 -right-2',
    'bottom-left': '-bottom-2 -left-2',
    'bottom-right': '-bottom-2 -right-2',
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        'blueprint-crosshair opacity-60 pointer-events-none',
        positionClasses[position],
        className
      )}
    />
  )
}
