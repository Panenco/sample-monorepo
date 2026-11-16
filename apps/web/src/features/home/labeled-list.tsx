export interface LabeledItem {
  label: string;
  text: string;
}

// A list of "label: explanation" rows, such as folders, commands or skills.
export function LabeledList({ items }: { items: LabeledItem[] }) {
  return (
    <ul className="space-y-2 text-sm">
      {items.map((item) => (
        <li key={item.label} className="sm:flex sm:gap-4">
          <code className="block shrink-0 font-medium break-words sm:w-80">{item.label}</code>
          <span className="text-slate-600">{item.text}</span>
        </li>
      ))}
    </ul>
  );
}
