'use client'

import { FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon, WhatsappShareButton, WhatsappIcon } from "react-share";

interface Props {
  url: string
}

const ShareButtons = ({ url }: Props) => {
  return (
    <div className="flex gap-2 p-2">
      <FacebookShareButton url={url} >
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <WhatsappShareButton url={url} >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      <LinkedinShareButton url={url} >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  )
}
export { ShareButtons }