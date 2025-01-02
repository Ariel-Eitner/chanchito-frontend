import RecentTransactions from "@/components/RecentTransactions/RecentTransactions";

export default function Home() {
  return (
    <div className="container">
      <div className="max-w-full overflow-x-auto">
        <RecentTransactions />
      </div>
    </div>
  );
}
