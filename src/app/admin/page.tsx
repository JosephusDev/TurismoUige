import { AppSidebar } from '@/components/sidebar'
import { TableLocates } from '@/components/table/locates'
export default async function Page() {
  return (
    <AppSidebar>
      <div className='m-8 sm:m-16'>
        <TableLocates />
      </div>
    </AppSidebar>
  )
}
