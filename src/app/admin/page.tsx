import TableLocates from '@/components/Table/Locates'
import { AppSidebar } from '@/components/sidebar'
export default async function Page() {
  return (
    <AppSidebar>
      <div className='m-8 sm:m-16'>
        <TableLocates />
      </div>
    </AppSidebar>
  )
}
