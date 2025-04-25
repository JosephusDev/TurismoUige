import { MapPinCheckInside, Star } from "lucide-react";
import { CardContent } from "../ui/card";
import { Card } from "../ui/card";

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../ui/carousel";

export function Coments() {
  return (
    <div className='px-[4%] md:px-[10%] flex flex-col sm:flex-row justify-between'>
      <div className='flex flex-col gap-4 max-w-full sm:max-w-[40%]'>
        <h1 className='text-3xl sm:text-5xl font-bold'>
          Recomendados por mais de 5.000 utilizadores!
        </h1>
        <p className='text-sm max-w-[80%] sm:max-w-[60%]'>
          Conheça Uíge de forma fácil e completa! Com nosso app, explore
          cachoeiras deslumbrantes, trilhas naturais e locais históricos com
          apenas alguns cliques. Planeje sua viagem e viva experiências
          inesquecíveis.
        </p>
      </div>
      <div>
        <Carousel>
            <CarouselContent>
                <CarouselItem>
                    <Card className="w-full h-full max-w-[500px] p-6 rounded-3xl border-none bg-muted">
                        <CardContent>
                            <div className="flex flex-row gap-4 justify-between mb-4">
                                <div className="flex items-center gap-1">
                                    <MapPinCheckInside size={15} />
                                    <p>Damba</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <h1>2</h1>
                                    {Array.from({length: 5}).map((_, index) => (
                                        index < 2 ? (
                                            <Star key={index} size={16} className="text-yellow-500" />
                                        ) : (
                                            <Star key={index} size={16} />
                                        )
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p>“O app tornou minha viagem ao Uíge incrível! Descobri lugares surpreendentes e planejei tudo com facilidade. Recomendo a todos que querem explorar essa bela região!“</p>
                            </div>
                        </CardContent>
                    </Card>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}
