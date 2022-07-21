import React, { useEffect, useRef, useState } from "react";
import { useKeyboard, usePress } from "@react-aria/interactions";

export function ReadingRuler(props) {
  let [rulerCount, setRulerCount] = useState(0);
  let [lineHeight, setLineHeight] = useState(0);
  let [currentChild, setCurrentChild] = useState({
    index: 1,
    childStartPx: 0,
    childEndPx: 0
  });
  let [rulerTop, setRulerTop] = useState(1);
  let wrapperRef = useRef();
  let rulerRef = useRef();
  let { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      console.log(`key down: ${e.key}`);
      if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
        e.preventDefault();
        moveRulerDown();
      } else if (
        rulerCount > 0 &&
        (e.key === "ArrowUp" || e.key === "ArrowRight")
      ) {
        e.preventDefault();
        moveRulerUp();
      }
    }
  });
  let { pressProps } = usePress({
    onPress: (e) => {
      console.log(`press with ${e.pointerType}`);
      moveRulerDown();
    }
  });

  let moveRulerDown = () => {
    let lineHeightNumber = parseInt(lineHeight.replace("px", ""), 10);
    let newRulerCount = rulerCount + 1;
    setRulerCount(newRulerCount);
    rulerRef.current.style.top = newRulerCount * lineHeightNumber + "px";

    manageChild();
  };

  let moveRulerUp = () => {
    let lineHeightNumber = parseInt(lineHeight.replace("px", ""), 10);
    let newRulerCount = rulerCount - 1;
    setRulerCount(newRulerCount);
    rulerRef.current.style.top = newRulerCount * lineHeightNumber + "px";
  };

  let manageChild = () => {
    console.log("rulerRef.current.style.top", rulerRef.current.style.top);
    rulerRef.current.style.height = lineHeight;
    let lineHeightNumber = parseInt(lineHeight.replace("px", ""), 10);
    let rulerTopNumber = parseInt(
      rulerRef.current.style.top.replace("px", "") || 0,
      10
    );

    

    let childTwoBottomPx = window
      .getComputedStyle(wrapperRef.current.children[currentChild.index + 1], null)
      .getPropertyValue("height");
    let childTwoBottomNumber = parseInt(childTwoBottomPx.replace("px", ""), 10);

    console.log(
      "rulerTopNumber, lineHeightNumber, childTwoBottomNumber",
      rulerTopNumber,
      lineHeightNumber,
      childTwoBottomNumber
    );

    if (rulerTopNumber + lineHeightNumber > currentChild.childEndPx) {
      console.log("switch child");
      setCurrentChild({
        index: currentChild.index + 1,
        childStartPx: currentChild.childEndPx + 0,
        childEndPx: currentChild.childEndPx + childTwoBottomNumber
      });
    }
  };

  useEffect(() => {
    let curLineHeight = window
      .getComputedStyle(wrapperRef.current.children[currentChild.index], null)
      .getPropertyValue("line-height");
    setLineHeight(curLineHeight);
    console.log("child element font height", curLineHeight);

    let childHeightPx = window
      .getComputedStyle(wrapperRef.current.children[currentChild.index], null)
      .getPropertyValue("height");
    let childHeight = parseInt(childHeightPx.replace("px", ""), 10);
    // assuming this only happens on load
    setCurrentChild({
      index: currentChild.index,
      childStartPx: 0,
      childEndPx: childHeight
    });
    console.log("first child element height", childHeight);
  }, [lineHeight, currentChild]);

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
