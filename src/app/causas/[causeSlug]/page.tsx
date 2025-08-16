import { DonateButton } from "@/components/DonateButton";
import { SafeArea } from "@/components/SafeArea";
import { getCauseBySlug } from "@/services/causesService";
import Image from "next/image";
import Link from "next/link";
import GeoSVGComponent from "@/components/Icons/Geo";
import { ReachBar } from "@/components/ReachBar";
import { toMoney } from "@/utils/money";
import { ClickCopyIcon } from "@/components/ClickCopyIcon";
import { ShareButtons } from "@/components/ShareButtons";
import { TabPanel, Tabs } from "@/components/AppTabs";
import { CauseDonations } from "@/components/CauseDonations";
import defaultCardImage from "/public/default-cause.jpg";



export default async function Cause({ params }: {
  params: Promise<{ causeSlug: string }>;
}) {

  const cause = await getCauseBySlug((await params).causeSlug);

  return (
    <SafeArea className="">
      <div className="px-4 py-5">
        <div className="py-7 flex justify-center flex-col items-center gap-2">
          <h1 className="text-center text-default text-6xl font-medium">{cause.name}</h1>
          <p className="text-gray-600">ID: {cause.id}</p>
          <div className="flex items-center gap-2">
            <GeoSVGComponent className="fill-gray-600" />
            <p className="text-lg text-gray-600 uppercase">
              {cause.location.city} / {cause.location.state}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between md:flex-row gap-4">
          <div className="bg-white p-4 md:w-xl lg:w-3xl rounded ">
            <Image
              alt=""
              src={cause.images[0]?.url || defaultCardImage}
              width={cause.images[0]?.width}
              height={cause.images[0]?.height} />
            <div className="mt-4">
              <p className="text-default-light">COMPARTILHE ESTA CAUSA</p>
              <div className="relative flex">
                <input
                  className="py-2 pl-4 pr-12 w-full text-default border rounded-md border-gray-300 text-nowrap text-ellipsis"
                  readOnly
                  value={process.env.NEXT_PUBLIC_HOST + '/causas/' + cause.slug}
                />
                <span className="absolute right-4 bottom-2 top-2">
                  <ClickCopyIcon content={'http://localhost:3002/causas/' + cause.slug} />
                </span>
              </div>
              <ShareButtons url={process.env.NEXT_PUBLIC_HOST + '/causas/' + cause.slug} ></ShareButtons>
            </div>

            <div className="mb-4">
              <Tabs>
                <TabPanel title="Sobre">
                  <div className="text-sm text-default">
                    <span className="font-bold text-default">Causa criada em: </span>
                    <span>{new Date(cause.startDate).toLocaleDateString('pt-BR')}</span>
                    <div className="border-t mt-4 pt-4 border-gray-300">
                      {cause.description}
                    </div>
                  </div></TabPanel>
                <TabPanel title="Atualizações">Não implementado</TabPanel>
                <TabPanel title="Apoiadores"><CauseDonations causeId={cause.id}></CauseDonations></TabPanel>
              </Tabs>
            </div>


          </div>
          <div className="w-full md:w-md">
            <div className="bg-white p-4 rounded flex w-full md:w-md flex-col gap-2 w-full md:sticky md:top-0">
              <ReachBar value={cause.currentAmount / cause.goalAmount}></ReachBar>
              <div>
                <p className="font-bold text-xl">Arrecadado</p>
                <span className="text-primary font-bold text-3xl">{toMoney(cause.currentAmount)}</span>
              </div>
              <div>
                <p className="text-xl text-default-light">Meta</p>
                <span className="text-default-light text-xl">{toMoney(cause.goalAmount)}</span>
              </div>

              <div>
                <p className="text-xl text-default-light">Doações</p>
                <span className="text-default-light text-xl">{cause.donationsCount}</span>
              </div>

              <Link href={`/causas/${cause.slug}/contribua`} className="mt-4">
                <DonateButton className="w-full" variant="lg">Quero Doar</DonateButton>
              </Link>

              <div className="border-t pt-4 mt-2 border-gray-300">
                <div className="flex items-center gap-1">
                  <img src={"https://ui-avatars.com/api/?background=009D4E&bold=true&color=fff&ims=40x40&name=EMILLY%20KELLY%20VIDAL%3Fims%3D225x225"} className="h-10 h-10 rounded-full"></img>
                  <div>
                    <p className="text-sm font-bold text-default">{cause.owner.name}</p>
                    <p className="text-xs text-gray-500">
                      Cadastro em {(new Date(cause.owner.registerDate)).toLocaleString('pt-BR', { month: 'long' })}/{new Date(cause.owner.registerDate).getFullYear()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm text-default-light mt-4">
          AVISO LEGAL: O texto e as imagens incluídos nessa página são de única e exclusiva responsabilidade do criador da causa e não representam a opinião ou endosso desta plataforma.
        </p>
      </div>
      {/* <CauseDonations causeId={cause.id} /> */}
    </SafeArea >
  )
}
