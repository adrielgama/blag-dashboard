import React from 'react'

import { Eye, Pen, PenBox } from 'lucide-react'

import { Stats } from '@/components/Home/stats'
import { TopArticles } from '@/components/Home/topArticles'
import { Welcome } from '@/components/Home/welcome'

export const Home: React.FC = () => {
  const articles = [
    {
      image:
        'https://static-assets.bamgrid.com/product/disneyplus/images/share-default.14fadd993578b9916f855cebafb71e62.png',
      title: 'Exploring the Magical World of Disney',
      createdAt: '2023-10-08T00:00:00Z',
      views: 50146,
    },
    {
      image:
        'https://i0.wp.com/cloud.estacaonerd.com/wp-content/uploads/2019/03/14122530/marvel.jpg',
      title: 'Marvel Universe: Heroes, Villains and Infinite Realms',
      createdAt: '2023-09-15T00:00:00Z',
      views: 16875,
    },
    {
      image: 'https://images.uncyc.org/pt/9/9b/PIXAR.jpg',
      title: 'Pixar Animations: Creating Emotional Stories',
      createdAt: '2023-08-20T00:00:00Z',
      views: 1580,
    },
    {
      image:
        'https://s3.wasabisys.com/instax/74/instax/2023/04/star-wars-1680799242.jpg',
      title: 'Star Wars Saga: Navigating Through Galaxies Far, Far Away',
      createdAt: '2023-07-01T00:00:00Z',
      views: 300,
    },
    {
      image:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/fe/ed/83/feed83a2-ba58-ab41-f042-2dc61624b8ef/AppIcons-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1200x630wa.png',
      title: 'Journeys with National Geographic: Exploring Our Planet',
      createdAt: '2023-06-12T00:00:00Z',
      views: 10,
    },
    {
      image:
        'https://yt3.googleusercontent.com/ytc/AOPolaTG1QNgsV7lVq8Dj-4iOcHafbmESgy6pperUuXXdvY=s900-c-k-c0x00ffffff-no-rj',
      title: 'ESPN Sports Coverage: From Local Events to Global Competitions',
      createdAt: '2023-05-10T00:00:00Z',
      views: 0,
    },
  ]

  return (
    <div className="flex gap-4 container">
      <div className="flex flex-col gap-4">
        <Welcome name={'Adriel Gama'} />
        <TopArticles articles={articles} />
      </div>
      <div className="flex flex-col gap-4">
        <Stats icon={<Eye />} title="Total views" value={130000} />
        <Stats icon={<Pen />} title="Artigos postados" value={6} />
        <Stats icon={<PenBox />} title="Rascunhos" value={13} />
      </div>
    </div>
  )
}
