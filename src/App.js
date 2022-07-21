import { defaultTheme, Provider, Text, View } from "@adobe/react-spectrum";
import React from "react";
import { ReadingRuler } from "./ReadingRuler";
import "./styles.css";

export default function App() {
  return (
    <Provider theme={defaultTheme} height="100%">
      <View height="50px" />
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
    </Provider>
  );
}
