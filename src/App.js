import { ActionButton, Button, ButtonGroup, Content, defaultTheme, Dialog, DialogTrigger, Divider, Heading, Link, Provider, Text, View } from "@adobe/react-spectrum";
import React from "react";
import { ReadingRuler } from "./ReadingRuler";
import "./styles.css";

export default function App() {
  return (
    <Provider theme={defaultTheme}>
      <View padding={100} paddingTop={25}>
        <Heading level={2}>Digital Reading Ruler</Heading>
        <Heading level={3}>About</Heading>
        <Text>
          <p>Digital reading rulers are meant to simulate using a physical ruler to underline text on paper and help dyslexic people read. They are useful for all readers of web text.</p>
          <p>They were a covered in <Link><a href="https://wiki.corp.adobe.com/display/TS2021/TS22%3A+Breakout+Videos" target="_blank">TS137 Re-imagining Accessibility</a></Link> session of the Adobe Tech Summit 2022. In this <Link><a href="https://video.tv.adobe.com/v/341853" target="_blank">video</a></Link> the portion on digital reading rulers starts at 10:00.</p>
        </Text>
        <Heading level={3}>How to use</Heading>
        <Text>
          <p>A digital reading ruler is adding to the content of the dialog attached to the below button and the below text. This is an implementation of a grey bar style reading ruler.</p>
          <p>To enable the reading ruler either click on the text or tab to it. When the digital reading ruler is enabled you can use arrow keys or clicks to move the ruler through the text. If you leave the text via a "Tab" key event or interacting with the rest of the page to move focus elsewhere, the ruler closes and resets your reading location.</p>
          <ul>
            <li>Mouse click, touch, down arrow or right arrow: moves the ruler down a line</li>
            <li>Up arrow or left arrow: moves the ruler up a line</li>
          </ul>
        </Text>
        <Divider marginBottom={25} />
        <DialogTrigger type="modal">
          <ActionButton>Dialog with text</ActionButton>
          {(close) => (
            <Dialog>
              <Heading>Read this</Heading>
              <Divider />
              <Content>
                <Text>
                  <ReadingRuler>
                    <p>
                      Design systems are now more popular than ever, and many companies
                      both large and small are implementing their own component libraries
                      from scratch. Modern view libraries like React allow teams to build
                      and maintain these components more easily than ever before, but it
                      is still extraordinarily difficult to do so in a fully accessible
                      way with interactions that work across many types of devices. This
                      represents millions of dollars of investment for each company as
                      they duplicate work that could have been shared.
                    </p>
                    <p>
                      While each design system is unique, there is often more in common
                      between components than different. Most components typically found
                      in a design system, like buttons, checkboxes, selects, and even
                      tables, usually have very similar behavior and logic. The WAI-ARIA
                      Authoring Practices describe how many of the most common components
                      should behave in terms of accessibility semantics and keyboard
                      interactions. The main difference between design systems is styling.
                    </p>
                    <p>
                      Unfortunately, many companies and teams don't have the resources or
                      time to prioritize features like accessibility,
                      internationalization, full keyboard navigation, and touch
                      interactions. This leads to many web apps having sub-par
                      accessibility and interactions, and contributes to the perception of
                      the web as an inferior app platform compared to native apps.
                    </p>
                    <p>
                      We believe there is an opportunity to share much of the behavior and
                      component logic between design systems and across platforms. For
                      example, user interactions, accessibility, internationalization, and
                      behavior can be reused, while allowing custom styling and rendering
                      to live within individual design systems. This has the potential to
                      improve the overall quality of applications, while saving companies
                      money and time, and reducing duplicated effort across the industry.
                    </p>
                  </ReadingRuler>
                </Text>
              </Content>
              <ButtonGroup>
                <Button variant="cta" onPress={close} autoFocus>Close</Button>
              </ButtonGroup>
            </Dialog>
          )}
        </DialogTrigger>
        <Text>
          <ReadingRuler>
            <p>
              Design systems are now more popular than ever, and many companies
              both large and small are implementing their own component libraries
              from scratch. Modern view libraries like React allow teams to build
              and maintain these components more easily than ever before, but it
              is still extraordinarily difficult to do so in a fully accessible
              way with interactions that work across many types of devices. This
              represents millions of dollars of investment for each company as
              they duplicate work that could have been shared.
            </p>
            <p>
              While each design system is unique, there is often more in common
              between components than different. Most components typically found
              in a design system, like buttons, checkboxes, selects, and even
              tables, usually have very similar behavior and logic. The WAI-ARIA
              Authoring Practices describe how many of the most common components
              should behave in terms of accessibility semantics and keyboard
              interactions. The main difference between design systems is styling.
            </p>
            <p>
              Unfortunately, many companies and teams don't have the resources or
              time to prioritize features like accessibility,
              internationalization, full keyboard navigation, and touch
              interactions. This leads to many web apps having sub-par
              accessibility and interactions, and contributes to the perception of
              the web as an inferior app platform compared to native apps.
            </p>
            <p>
              We believe there is an opportunity to share much of the behavior and
              component logic between design systems and across platforms. For
              example, user interactions, accessibility, internationalization, and
              behavior can be reused, while allowing custom styling and rendering
              to live within individual design systems. This has the potential to
              improve the overall quality of applications, while saving companies
              money and time, and reducing duplicated effort across the industry.
            </p>
          </ReadingRuler>
        </Text>
      </View>
    </Provider>
  );
}
