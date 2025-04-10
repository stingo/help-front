import HelpSidebar from '../../components/HelpSidebar';
export default function HelpPage() {
  return (
    <div className="flex min-h-screen">
      <HelpSidebar />
      <main className="p-8 prose prose-lg">
        <h1>Welcome to the Help Center</h1>
        <p>Here you’ll find answers to frequently asked questions and guides on getting started.</p>
      </main>
    </div>
  );
}
