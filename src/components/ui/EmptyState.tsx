export function EmptyState({ message }: { message: string }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-10 text-center">
      <p className="font-body-md text-body-md text-on-surface-variant">{message}</p>
    </div>
  );
}

