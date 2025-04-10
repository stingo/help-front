export default function HelpSidebar() {
  return (
    <aside className="w-64 p-4 border-r border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <ul className="space-y-2 text-sm">
        <li><a href="#" className="hover:underline">Getting Started</a></li>
        <li><a href="#" className="hover:underline">Buying</a></li>
        <li><a href="#" className="hover:underline">Selling</a></li>
      </ul>
    </aside>
  );
}
