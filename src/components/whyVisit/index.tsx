import { Compass, ShieldCheck, UserPlus } from 'lucide-react'
import { VisitCard } from '../visitCard'
import Image from 'next/image'
import Bags from '@/assets/images/bags.png'
import Maps from '@/assets/images/maps.png'

export function WhyVisit() {
  return (
    <div className='px-[4%] md:px-[10%] py-32 flex flex-col gap-6 justify-center items-center'>
      <Image
        className='absolute top-0 -right-60 -z-10 opacity-50 blur-sm'
        src={Maps}
        alt='Maps'
        width={600}
        height={600}
      />
      <Image
        className='absolute bottom-24 -left-52 opacity-50 blur-sm -rotate-12'
        src={Bags}
        alt='Bags'
        width={600}
        height={600}
      />
      <div className='w-full sm:w-[600px] flex flex-col gap-4 justify-center items-center'>
        <h1 className='text-2xl font-bold'>Por que visitar o Uíge?</h1>
        <p className='text-sm text-center'>
          O Uíge oferece uma combinação única de paisagens naturais
          deslumbrantes, cachoeiras majestosas e uma rica herança cultural.
          Desde a hospitalidade do povo até os sabores da culinária local, cada
          experiência será inesquecível.
        </p>
      </div>
      <div className='w-full flex flex-col lg:flex-row gap-4 justify-center items-center'>
        <VisitCard
          icon={<Compass className='text-white' size={44} />}
          title='Múltiplos Destinos'
          description='Explore vários lugares em uma única viagem! Combinando restaurantes, lojas e pontos turísticos, receba sugestões automáticas de rotas otimizadas e compartilhe seus itinerários com amigos.'
        />
        <VisitCard
          icon={<UserPlus className='text-white' size={44} />}
          title='Gastronomia Local'
          description='Descubra os sabores da cidade com uma seleção de restaurantes tradicionais e modernos. Experimente pratos típicos recomendados por moradores e leia avaliações reais para encontrar os melhores lugares para comer.'
        />
        <VisitCard
          icon={<ShieldCheck className='text-white' size={44} />}
          title='Cultura & Eventos'
          description='Mergulhe na cultura local com shows, feiras e festivais imperdíveis. Visite museus e exposições em destaque e acompanhe a agenda atualizada dos melhores eventos da cidade.'
        />
      </div>
    </div>
  )
}
