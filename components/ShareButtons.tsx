import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  EmailIcon
} from 'react-share';

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  hashtags?: string[];
  className?: string;
  iconSize?: number;
  round?: boolean;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({
  url,
  title,
  description = '',
  hashtags = ['UXStrip', 'ComicStrip', 'UXDesign'],
  className = '',
  iconSize = 32,
  round = true
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm font-medium mr-2">Share:</span>

      <FacebookShareButton
        url={url}
        hashtag={`#${hashtags[0]}`}
        // @ts-ignore - quote is a valid prop for FacebookShareButton but TypeScript doesn't recognize it
        quote={`${title} - ${description}`}
      >
        <FacebookIcon size={iconSize} round={round} />
      </FacebookShareButton>

      <TwitterShareButton url={url} title={title} hashtags={hashtags}>
        <TwitterIcon size={iconSize} round={round} />
      </TwitterShareButton>

      <LinkedinShareButton
        url={url}
        title={title}
        // @ts-ignore - summary and source are valid props but TypeScript doesn't recognize them
        summary={description}
        source="UX Strip"
      >
        <LinkedinIcon size={iconSize} round={round} />
      </LinkedinShareButton>

      <WhatsappShareButton url={url} title={`${title} - ${description}`}>
        <WhatsappIcon size={iconSize} round={round} />
      </WhatsappShareButton>

      <EmailShareButton url={url} subject={title} body={`Check out this comic: ${title}\n\n${description}\n\n${url}`}>
        <EmailIcon size={iconSize} round={round} />
      </EmailShareButton>
    </div>
  );
};

export default ShareButtons;
