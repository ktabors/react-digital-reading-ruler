import React, { useEffect, useRef, useState } from "react";
import { useFocus, useKeyboard, usePress } from "@react-aria/interactions";

import "./ReadingRuler.css";

export function ReadingRuler(props) {
  // state
  let [rulerActive, setRulerAction] = useState(false);
  let [rulerCount, setRulerCount] = useState(0);
  let [lineHeight, setLineHeight] = useState(0);
  let [currentChild, setCurrentChild] = useState({
    index: 1,
    childStartPx: 0,
    childEndPx: 0,
    paddingAndMarginPx: 0
  });

  // refs
  let wrapperRef = useRef();
  let rulerRef = useRef();

  // hooks
  let {focusProps} = useFocus({
    onFocus: e => {
      setRulerAction(true);
      rulerRef.current.style.height = lineHeight;
    },
    onBlur: e => {
      let childHeightPx = window
        .getComputedStyle(wrapperRef.current.children[1], null)
        .getPropertyValue("height");
      let childHeight = parseInt(childHeightPx.replace("px", ""), 10);

      rulerRef.current.style.height = 0;
      rulerRef.current.style.top = 0;
      setRulerAction(false);
      setRulerCount(0);
      setLineHeight(0);
      setCurrentChild({
        index: 1,
        childStartPx: 0,
        childEndPx: childHeight,
        paddingAndMarginPx: 0
      });
    }
  });
  let { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
        e.preventDefault();
        moveRulerEnd();
      } else if (
        rulerCount > 0 &&
        (e.key === "ArrowUp" || e.key === "ArrowRight")
      ) {
        e.preventDefault();
        moveRulerStart();
      }
    }
  });
  let { pressProps } = usePress({
    preventFocusOnPress: true,
    onPress: (e) => {
      if (rulerActive) {
        moveRulerEnd();
      } else {
        setRulerAction(true);
        rulerRef.current.style.height = lineHeight;
        wrapperRef.current.focus();
      }
    }
  });

  // move logic
  let moveRulerEnd = () => {
    let lineHeightNumber = parseInt(lineHeight.replace("px", ""), 10);
    let rulerTopNumber = parseInt(
      rulerRef.current.style.top.replace("px", "") || 0,
      10
    );
    let newRulerCount = rulerCount + 1;

    // don't move past the end of the last child
    if (rulerTopNumber + lineHeightNumber < currentChild.childEndPx || Array.from(wrapperRef.current.children).length > currentChild.index + 1) {
      setRulerCount(newRulerCount);
      rulerRef.current.style.top = (newRulerCount * lineHeightNumber + currentChild.paddingAndMarginPx) + "px";
      manageChildEnd(newRulerCount, lineHeightNumber, rulerTopNumber);
    }
  };

  let moveRulerStart = () => {
    let lineHeightNumber = parseInt(lineHeight.replace("px", ""), 10);
    let newRulerCount = rulerCount - 1;
    setRulerCount(newRulerCount);
    rulerRef.current.style.top = (newRulerCount * lineHeightNumber + currentChild.paddingAndMarginPx) + "px";

    manageChildStart(newRulerCount, lineHeightNumber)
  };

  let manageChildEnd = (newRulerCount, lineHeightNumber, rulerTopNumber) => {
    if (rulerTopNumber + lineHeightNumber >= currentChild.childEndPx && !(Array.from(wrapperRef.current.children).length <= currentChild.index + 1)) {
      let childTwoBottomPx = window
        .getComputedStyle(wrapperRef.current.children[currentChild.index + 1], null)
        .getPropertyValue("height");
      let childTwoBottomNumber = parseInt(childTwoBottomPx.replace("px", ""), 10);
      let currentChildMarginEnd = window
        .getComputedStyle(wrapperRef.current.children[currentChild.index], null)
        .getPropertyValue("margin-block-end");
      let currentChildMarginEndNumber = parseInt(currentChildMarginEnd.replace("px", ""), 10);
      let nextChildMarginEnd = window
        .getComputedStyle(wrapperRef.current.children[currentChild.index + 1], null)
        .getPropertyValue("margin-block-end");
      let nextChildMarginEndNumber = parseInt(nextChildMarginEnd.replace("px", ""), 10);
      let maxMargin = nextChildMarginEndNumber > currentChildMarginEndNumber ? nextChildMarginEndNumber : currentChildMarginEndNumber;
      let newPadding = currentChild.paddingAndMarginPx + maxMargin ;
      setCurrentChild({
        index: currentChild.index + 1,
        childStartPx: currentChild.childEndPx + maxMargin + 0,
        childEndPx: currentChild.childEndPx + maxMargin + childTwoBottomNumber,
        paddingAndMarginPx: newPadding
      });

      // move rule to factor in margin
      rulerRef.current.style.top = (newRulerCount * lineHeightNumber + newPadding) + "px";
    }
  };

  let manageChildStart = (newRulerCount, lineHeightNumber) => {
    let rulerTopNumber = parseInt(
      rulerRef.current.style.top.replace("px", "") || 0,
      10
    );

    if (rulerTopNumber + lineHeightNumber <= currentChild.childStartPx) {
      let previousChildBottomPx = window
        .getComputedStyle(wrapperRef.current.children[currentChild.index - 1], null)
        .getPropertyValue("height");
      let previousChildBottomNumber = parseInt(previousChildBottomPx.replace("px", ""), 10);
      let currentChildMarginEnd = window
        .getComputedStyle(wrapperRef.current.children[currentChild.index], null)
        .getPropertyValue("margin-block-end");
      let currentChildMarginEndNumber = parseInt(currentChildMarginEnd.replace("px", ""), 10);
      let newPadding = currentChild.paddingAndMarginPx - currentChildMarginEndNumber;
      setCurrentChild({
        index: currentChild.index - 1,
        childStartPx: currentChild.childStartPx - currentChildMarginEndNumber - previousChildBottomNumber,
        childEndPx: currentChild.childStartPx - currentChildMarginEndNumber,
        paddingAndMarginPx: newPadding
      });

      // move rule to factor in margin
      rulerRef.current.style.top = (newRulerCount * lineHeightNumber + newPadding) + "px";
    }
  };

  // post render initial value setup
  useEffect(() => {
    let curLineHeight = window
      .getComputedStyle(wrapperRef.current.children[currentChild.index], null)
      .getPropertyValue("line-height");
    setLineHeight(curLineHeight);
    if (rulerActive) {
      rulerRef.current.style.height = curLineHeight;
    }

    // only run this on initial load when there is childEndPx
    if (currentChild.childEndPx === 0) {
      let childHeightPx = window
        .getComputedStyle(wrapperRef.current.children[currentChild.index], null)
        .getPropertyValue("height");
      let childHeight = parseInt(childHeightPx.replace("px", ""), 10);
      setCurrentChild({
        index: currentChild.index,
        childStartPx: 0,
        childEndPx: childHeight,
        paddingAndMarginPx: 0
      });
    }
  }, [lineHeight, rulerActive, currentChild.index, currentChild.childStartPx, currentChild.childEndPx]);

  return (
    <div
      className="readingRulerWrapper"
      {...focusProps}
      {...pressProps}
      {...keyboardProps}
      tabIndex="0"
      ref={wrapperRef}
    >
      <div className="singleLine" ref={rulerRef} />
      {props.children}
    </div>
  );
}
