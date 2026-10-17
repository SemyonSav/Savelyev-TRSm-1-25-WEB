/**
 * @param {{ title: string, text?: string, children?: import('react').ReactNode }} props
 */
export default function EmptyState({ title, text, children }) {
  return (
    <div className="empty-state text-center py-5">
      <p className="h5 mb-2">{title}</p>
      {text && <p className="text-body-secondary mb-3">{text}</p>}
      {children}
    </div>
  );
}
