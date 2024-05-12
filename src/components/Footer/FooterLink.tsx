export default function FooterLink({ item, title }: any) {
  return (
    <div>
      <h1 className="font-bold text-lg">{title}</h1>
      <ul className="mt-4">
        {item.map((link : any) => (
          <li className="mb-2" key={link.path}>{link.name}</li>
        ))}
      </ul>
    </div>
  );
}
