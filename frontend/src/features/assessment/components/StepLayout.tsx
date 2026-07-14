import { ReactNode } from "react";

interface StepLayoutProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
}

export function StepLayout({ title, subtitle, children }: StepLayoutProps) {
  return (
    <div className="flex-1 flex flex-col items-center w-full max-w-lg mx-auto">
      {(title || subtitle) && (
        <div className="text-center mb-8">
          {title && (
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-zinc-400 font-medium mt-3 text-[15px] max-w-md mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      <div className="w-full flex-1 flex flex-col pb-8 min-h-[50vh]">
        {children}
      </div>
    </div>
  );
}
