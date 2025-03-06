async function getGroupData(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/groups`);
  if (!res.ok) throw new Error("Failed to fetch groups");
  const groups = await res.json();
  return groups.find((g) => g.slug === slug);
}

export default async function Page({ params }) {
  const group = await getGroupData(params.slug);

  if (!group) {
    return <div>Group not found</div>;
  }

  return (
    <div>
      <h1>{group.groupName}</h1>
      <p>{group.shortDescription}</p>
    </div>
  );
}
