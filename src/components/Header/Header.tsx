export default function Header({headertitle}: {headertitle: string}) {
  return (
    <div>
      <h1 className="bg-gradient-to-r from-primary via-tersier to-secondary bg-clip-text text-transparent text-3xl font-extrabold">
        {headertitle}
      </h1>
    </div>
  );
}
