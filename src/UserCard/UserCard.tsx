import React, { Suspense, useLayoutEffect, useRef } from "react";
import styled from "@emotion/styled";

import Modal from "../Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import UserCardMedia from "./UserCardMedia";

const StyledCard = styled(Card)`
  transform-origin: 0 0;
`;

export interface CardContentInfo {
  title: string;
  desc: string;
}

export interface CardInfo extends CardContentInfo {
  showing: boolean;
  beforeRect?: DOMRect;
}

interface CardProps extends CardInfo {
  image: string;
  onClose: () => void;
}
export default function UserCard({
  showing,
  title,
  desc,
  beforeRect,
  image,
  onClose
}: CardProps): React.ReactElement | null {
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const cardElement = cardRef.current;
    if (cardElement) {
      const rect = cardElement.getBoundingClientRect();
      if (showing) {
        const tX = beforeRect!.left - rect.left;
        const tY = beforeRect!.top - rect.top;

        cardElement.animate(
          [
            {
              transform: `translate(${tX}px, ${tY}px) scale(0.2)`,
              opacity: 0
            },
            { transform: "translate(0px, 0px)" }
          ],
          {
            duration: 300,
            easing: "ease-in-out"
          }
        );
      }
    }
  }, [showing, beforeRect]);

  if (!showing) return null;

  return (
    <Modal>
      <StyledCard sx={{ width: 345 }} ref={cardRef}>
        <Suspense fallback={<div>Loading...</div>}>
          <UserCardMedia originImageUrl={image} />
        </Suspense>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {desc}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => onClose()}>Close</Button>
        </CardActions>
      </StyledCard>
    </Modal>
  );
}
