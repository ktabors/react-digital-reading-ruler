import React, { useEffect, useRef, useState } from "react";
import { useKeyboard, usePress } from "@react-aria/interactions";

import "./ReadingRuler.css";

export function ReadingRuler(props) {
  // state
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
  let { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      console.log(`key down: ${e.key}`);
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
    onPress: (e) => {
      console.log(`press with ${e.pointerType}`);
      moveRulerEnd();
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
      let newPadding = currentChild.paddingAndMarginPx + currentChildMarginEndNumber;
      setCurrentChild({
        index: currentChild.index + 1,
        childStartPx: currentChild.childEndPx + currentChildMarginEndNumber + 0,
        childEndPx: currentChild.childEndPx + currentChildMarginEndNumber + childTwoBottomNumber,
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
    rulerRef.current.style.height = curLineHeight;

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
  }, [lineHeight, currentChild.index, currentChild.childStartPx, currentChild.childEndPx]);

  return (
    <span
      className="readingRulerWrapper"
      {...pressProps}
      {...keyboardProps}
      tabIndex="0"
      ref={wrapperRef}
    >
      <div className="singleLine" ref={rulerRef} />
      {props.children}
    </span>
  );
}
