type Props = {
  params: Promise<{ id: string }>;
};

export default async function Book({params}: Props) {
    const { id } = await params;
    return <h1>Book {id} page</h1>
}