import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback
} from "react";
import shortId from "shortid";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import UserCard, { CardContentInfo, CardInfo } from "./UserCard";
import stringAvatar from "../util/stringAvatar";
import "./styles.css";

const NEW_ITEMS: CardContentInfo[] = [
  {
    title: "강태훈",
    desc: "저는 강태훈 입니다."
  },
  {
    title: "최지원",
    desc: "저는 최지원 입니다."
  },
  {
    title: "정현호",
    desc: "저는 정현호 입니다."
  },
  {
    title: "홍성혜",
    desc: "저는 홍성혜 입니다."
  },
  {
    title: "장문수",
    desc: "저는 장문수 입니다."
  },
  {
    title: "김수찬",
    desc: "저는 김수찬 입니다."
  },
  {
    title: "오지은",
    desc: "저는 오지은 입니다."
  }
];

export default function App() {
  const rectMap = useRef<Map<string, DOMRect>>(new Map()).current;
  const [items, setItems] = useState<CardContentInfo[]>([]);

  type CardState = CardInfo & { image: string };
  const initialCardState: CardState = {
    showing: false,
    title: "",
    desc: "",
    image: ""
  };
  const [cardState, setCardState] = useState<CardState>(initialCardState);

  const handleClickAddButton = () => {
    const newItem = NEW_ITEMS.shift();
    if (newItem) {
      setItems([newItem, ...items]);
    }
  };

  const handleClickAvatar = (item: CardContentInfo) => {
    return (e: React.MouseEvent<HTMLLIElement>) => {
      e.stopPropagation();
      e.preventDefault();

      const elementId = (e.currentTarget as HTMLLIElement).id;
      const itemRect = rectMap.get(elementId);

      setCardState({
        showing: true,
        title: item.title,
        desc: item.desc,
        beforeRect: itemRect,
        image: "https://source.unsplash.com/random"
      });
    };
  };

  const handleCloseCard = () => {
    setCardState(initialCardState);
  };

  const getFlipperElements = useCallback(
    () => Array.from(document.querySelectorAll<HTMLLIElement>(".flipper")),
    []
  );

  // 최초 캐싱
  useEffect(() => {
    const elements = getFlipperElements();

    elements.forEach((el) => rectMap.set(el.id, el.getBoundingClientRect()));
  }, [rectMap, getFlipperElements]);

  useLayoutEffect(() => {
    const elements = getFlipperElements();

    elements.forEach((el) => {
      // 1. 이전에 캐싱된 li의 rect를 가져온다.
      const cachedRect = rectMap.get(el.id);
      // 2. 그려질 최신 상태의 rect를 가져온다.
      const nextRect = el.getBoundingClientRect();

      if (cachedRect) {
        // 3. FLIP
        el.animate(
          [
            { transform: `translateY(${cachedRect.top - nextRect.top}px)` },
            { transform: "translateY(0px)" }
          ],
          {
            duration: 300,
            easing: "ease-in-out"
          }
        );
      } else {
        // 새로 추가되는 li의 경우, opacity를 적용시켜준다.
        el.animate(
          [
            {
              opacity: 0
            },
            {
              opacity: 1
            }
          ],
          {
            duration: 300,
            easing: "ease-in-out"
          }
        );
      }

      // 4. 최신 상태의 rect를 다시 캐싱한다.
      rectMap.set(el.id, nextRect);
    });
  }, [rectMap, items, getFlipperElements]);

  return (
    <>
      <Button variant="outlined" onClick={handleClickAddButton}>
        Add
      </Button>

      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {items.map((item) => (
          <ListItem
            key={shortId.generate()}
            id={item.title}
            className="flipper"
            onClick={handleClickAvatar(item)}
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar {...stringAvatar(item.title)} />
              </ListItemAvatar>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <UserCard onClose={handleCloseCard} {...cardState} />
    </>
  );
}
