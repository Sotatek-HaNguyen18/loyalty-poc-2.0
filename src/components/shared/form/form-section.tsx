import type { ReactNode } from 'react'

type FormSectionProps = {
  title: string
  description?: string
  children: ReactNode
}

export const FormSection = ({
  title,
  description,
  children,
}: FormSectionProps) => {
  return (
    <section className="space-y-6 rounded-xl border border-app-border bg-white p-6">
      <div>
        <h2 className="text-lg font-semibold text-[#17211d]">
          {title}
        </h2>

        {description ? (
          <p className="mt-1 text-sm text-[#7d8a85]">
            {description}
          </p>
        ) : null}
      </div>

      {children}
    </section>
  )
}