import LocateDetails from './LocateDetails'

export default async function IndividualPost({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <LocateDetails id={id} />
}
