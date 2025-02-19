import { AKGIcon } from "@/app/components/AKGIcon";
import { CodeSnippet } from "@/app/components/blog/CodeSnippet";
import { Heading } from "@/app/components/blog/Heading";
import { InlineCode } from "@/app/components/blog/InlineCode";
import { Link } from "@/app/components/blog/Link";
import { List, ListItem } from "@/app/components/blog/List";
import { Note } from "@/app/components/blog/Note";
import { Paragraph } from "@/app/components/blog/Paragraph";
import { Title } from "@/app/components/blog/Title";
import Image from "next/image";

export default function RemixFeatureFlags() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-theme(space.16))] max-w-[740px] flex-col content-center bg-white p-6 dark:bg-black md:p-10 lg:p-8 lg:px-16 lg:py-12">
      <Title title="Zero Dependency Feature Flags in Remix" />
      <Paragraph>
        Have you ever authored a new feature for your web app and then waited a
        week or longer to release it? The marketing team hasn’t finished their
        email campaign, or a product manager wants to wait for another team to
        complete a companion feature. There are many reasons why complete code
        may sit in a feature branch for weeks.
      </Paragraph>
      <Paragraph>
        Instead of keeping a feature branch alive and dealing with a steady
        stream of merge conflicts, I’d advocate for releasing the feature behind
        a feature flag. With a few lines of code, any developer can add a
        feature flag to a Remix application with zero dependencies.
      </Paragraph>
      <Heading id="what-are-feature-flags">What are Feature Flags?</Heading>
      <Paragraph>
        A feature flag is a technique to show, hide, enable, or disable a
        feature during runtime. They can be as simple as a boolean value used to
        show or hide a feature, or as complex as a 3rd party integration that
        enables different features for subsets of a user base.
      </Paragraph>
      <Paragraph>
        This article will focus on two use-cases: showing or hiding a particular
        feature, and controlling access to a page of an application.
      </Paragraph>
      <Heading id="managed-services">Managed Services</Heading>
      <Paragraph>
        Before diving into a coding example it’s worth mentioning that there are
        many great services for managing feature flags.{" "}
        <Link href="https://www.optimizely.com/" text="Optimizely" />,{" "}
        <Link href="https://www.split.io/" text="Split.io" />,{" "}
        <Link href="https://launchdarkly.com/" text="Launch Darkly" />, and{" "}
        <Link href="https://docs.devcycle.com/management-api" text="DevCycle" />{" "}
        are a few services I’ve used or evaluated in the past. These services
        provide scalable solutions that are suitable for complex use-cases and
        development environments. Teams that pay for these services tend to
        manage many feature flags and run multiple experiments at once.
      </Paragraph>
      <Heading id="what-are-we-building">What are we building?</Heading>
      <Paragraph>
        A simple inventory application for an IT department built with Remix,
        React, and Typescript. We’ll implement zero-dependency feature flags to
        enable or disable specific features and pages. I’ll demonstrate how to
        load environment variables into an application, set up a context to use
        them client-side, and use http responses to control page access.
      </Paragraph>
      <Heading id="requirements">Requirements</Heading>
      <List>
        <ListItem>An app to display a company’s IT inventory.</ListItem>
        <ListItem>
          The app should display a list of items with a title and details.
        </ListItem>
        <ListItem>
          Each item has a SKU, but this property is hidden behind a feature
          flag.
        </ListItem>
        <ListItem indented={true}>
          This feature is controlled by the{" "}
          <InlineCode>SHOW_ITEM_SKU</InlineCode> feature flag.
        </ListItem>
        <ListItem indented={true}>
          When the value is false, the SKU should be hidden.
        </ListItem>
        <ListItem>
          Each list item should be clickable. When clicked, it should navigate
          to a details page with more item info.
        </ListItem>
        <ListItem indented={true}>
          This page is controlled by the <InlineCode>SHOW_ITEM_PAGE</InlineCode>{" "}
          feature flag.
        </ListItem>
        <ListItem indented={true}>
          When the value is false, the item should not be clickable and the
          route should render a 404 error if accessed via URL.
        </ListItem>
      </List>
      <Paragraph>
        I used{" "}
        <Link
          href="https://codesandbox.io/p/github/grecoa66/remix-feature-flags/main"
          text="CodeSandbox"
        />{" "}
        to create this demo. You can also refer to this{" "}
        <Link
          href="https://github.com/grecoa66/remix-feature-flags"
          text="Github repository"
        />
        . The readme in the repository will explain each commit. You can refer
        to specific commits to isolate different changes.
      </Paragraph>
      <Paragraph>
        You can view this commit message for initial setup of the project:{" "}
        <Link
          href={
            "https://github.com/grecoa66/remix-feature-flags?tab=readme-ov-file#commit-1"
          }
          text={"Commit #1"}
        />{" "}
      </Paragraph>
      <Heading id="setting-up-the-project">Setting up the project</Heading>
      <Paragraph>
        First, let’s set up some of the basic piece of the inventory
        application. Let’s display the inventory for an IT department as a list
        of items. Each list item will display an item’s title, description,
        quantity, and location. First we'll define the type for an inventory
        item. Then we'll define the JSX for a list item.
      </Paragraph>
      <CodeSnippet
        code={`// app/types/inventory.ts
// Type definition for an inventory item
export type InventoryItem = {
  readonly id: string
  readonly sku: string
  name: string
  quantity: number
  description: string
  location: {
    building: string
    shelf: string
  }
}`}
      />
      <CodeSnippet
        code={`// app/routes/_index.tsx
// UI for displaying an inventory item.
// Currently the SKU is not rendered.
<div
  key={item.id}
  className="..."
>
  <p>Name: {item.name}</p>
  <p>Description: {item.description}</p>
  <p>Quantity: {item.quantity}</p>
  <div>
    <p>Location</p>
    <div className="...">
      <p>Building: {item.location.building}</p>
      <p>Shelf: {item.location.shelf}</p>
    </div>
  </div>
</div>`}
      />

      <Image
        src="/blog/remix-feature-flags/list_item.png"
        width="740"
        height="740"
        alt="Inventory list"
      />
      <Heading id="server-to-client-feature-flag">
        Server-to-Client Feature Flag
      </Heading>
      <Paragraph>
        We’ll implement our first feature flag to show or hide the SKU based on
        an environment variable. First, ensure you have an{" "}
        <InlineCode>`.env`</InlineCode> file in the root of your project.{" "}
        <Link
          href={
            "https://remix.run/docs/hi/main/guides/envvars#local-development"
          }
          text={"Remix will inject"}
        />{" "}
        the values from this file into your development server. To add
        environment variables to your production application refer to your
        hosting provider’s docs.
      </Paragraph>
      <CodeSnippet
        code={`// .env
SHOW_ITEM_SKU="true"`}
      />
      <Note>
        If my <InlineCode>.env</InlineCode> file had any API keys or secret
        values, I would add this file to my <InlineCode>.gitignore</InlineCode>.
        To state the obvious, you never want to push secrets up to GitHub.
        Anyone who can see your repo can see your api keys and secrets. For this
        example, I have nothing to hide, and I want my
        <InlineCode>.env</InlineCode> in Github so y’all can see it.
      </Note>
      <Paragraph>
        Next, we’ll add typescript support for this environment variable. This
        is optional, but I find defining types is almost always worth the
        effort. In a Typescript and Node application you can provide type
        information about the node environment. This is useful for autocomplete
        in your IDE. You can create a file named{" "}
        <InlineCode>global.d.ts</InlineCode> file in the app directory. In this
        file you can add type information to the <InlineCode>NodeJS</InlineCode>{" "}
        namespace. In the <InlineCode>Process</InlineCode> namespace we’ll
        declare a type for our environment variable.
      </Paragraph>
      <CodeSnippet
        code={`// app/global.d.ts
type FeatureFlagValues = 'true' | 'false'

declare namespace NodeJS { 
    export interface ProcessEnv {
        SHOW_ITEM_SKU: FeatureFlagValues;
    }
}`}
      />
      <Paragraph>
        In the Node context you can access environment variables with{" "}
        <InlineCode>process.env</InlineCode>. Remember Remix executes{" "}
        <InlineCode>loaders</InlineCode> on the server, so we have access to our
        Node environment. We can read{" "}
        <InlineCode>process.env.SHOW_ITEM_SKU</InlineCode> in a page’s{" "}
        <InlineCode>loader</InlineCode> function. We return the environment
        variables value and have a reference in our page component.
      </Paragraph>
      <CodeSnippet
        code={`// app/routes/_index.tsx
export const loader = () => {
    // in lieu of a fetching from an external source...
    const inventoryItems = inventoryList

    const showItemSku = process.env.SHOW_ITEM_SKU;

    return { inventoryItems, showItemSku }
}`}
      />
      <Note>
        Notice we get type support from our IDE because we added a type
        definition to <InlineCode>ProcessEnv</InlineCode> for the{" "}
        <InlineCode>NodeJS</InlineCode> namespace.
        <Image
          src="/blog/remix-feature-flags/code_hint.png"
          width="740"
          height="740"
          alt="Code hint for process.env.SHOW_ITEM_SKU"
        />
      </Note>
      <Paragraph>
        Depending on the value of our environment variable we can show or hide
        the SKU.
      </Paragraph>
      <CodeSnippet
        code={`// app/routes/_index.tsx
export const InventoryPage = () => {
  const { inventoryItems, showItemSku } = useLoaderData<typeof loader>();

  return (
    <div key={item.id} className="...">
      <p>...</p>
      {showItemSku ? <p>SKU: {item.sku}</p> : null}
      <div> ... </div>
    </div>
  );
};
`}
      />
      <Heading id="client-side-context-and-feature-flags">
        Client-Side Context and Feature Flags
      </Heading>

      <Paragraph>
        Let’s refactor our example by abstracting out the list item. We'll move
        our list item code into a component called{" "}
        <InlineCode>{"<InventoryItem/>"}</InlineCode>. It accepts an inventory
        item as a prop and returns item UI.
      </Paragraph>
      <Paragraph>
        We could pass the value of <InlineCode>SHOW_SKU_ITEM</InlineCode> as a
        prop and call it a day. For the sake of a real-life example let’s
        imagine there are several pages rendering inventory items. We could load{" "}
        <InlineCode>SHOW_SKU_ITEM</InlineCode> in every loader that renders an
        inventory item, but this is repetitive and a perfect use-case for React
        Context. So, let’s initialize context in the root of our application so
        we can read the feature flag value in any component.
      </Paragraph>

      <CodeSnippet
        code={`// app/context/FeatureFlagContext.tsx
import { ReactNode, createContext, useContext } from 'react'

type FeatureFlagContextType = {
    showItemSku: boolean
}

export const FeatureFlagContext = createContext<
    FeatureFlagContextType | undefined
>(undefined)

export const FeatureFlagProvider = ({
    value,
    children,
}: {
    value: FeatureFlagContextType
    children: ReactNode
}) => {
    return (
        <FeatureFlagContext.Provider value={value}>
            {children}
        </FeatureFlagContext.Provider>
    )
}

export const useFeatureFlagContext = () => {
    const context = useContext(FeatureFlagContext)
    if (!context) {
        throw Error(
            'useFeatureFlagContext must be rendered within a FeatureFlagProvider'
        )
    }
    return context
}`}
      />
      <Paragraph>
        Lets also fetch our environment variable in the root loader.
      </Paragraph>
      <CodeSnippet
        code={`// app/root.tsx
export const loader = () => {
    const showItemSku = process.env.SHOW_ITEM_SKU === 'true'

    return { showItemSku }
}

export default function App() {
    const { showItemSku } = useLoaderData<typeof loader>()

    return (
        <html lang="en">
              ...
            <body>
                <FeatureFlagProvider value={{ showItemSku }}>
                    <Outlet />
                </FeatureFlagProvider>
            </body>
        </html>
    )
}`}
      />
      <Paragraph>
        Next, we access the context in our component and conditionally render
        the SKU.
      </Paragraph>
      <CodeSnippet
        code={`// app/components/InventoryItem.tsx
export const InventoryItem = ({ item }: { item: InventoryItemType }) => {
    const { showItemSku } = useFeatureFlagContext()

    return (
        <div
            key={item.id}
            className="..."
        >
		  	...
            {showItemSku ? <p>SKU: {item.sku}</p> : null}
            ...
        </div>
    )
}`}
      />
      <Paragraph>
        Fetching environment variables in our root loader and using React
        Context to access values is a simple pattern for implementing feature
        flags.
      </Paragraph>
      <Heading id={"use-feature-flag-to-gate-a-page"}>
        Use Feature Flag to Gate a Page
      </Heading>
      <Paragraph>
        For our last example we are going to add a new route to the application.
        The new route will render serialized pages for each item. Each list item
        will acts as a link to its item page. I’ll skip the code in the blog,
        but you can check the changes in{" "}
        <Link
          href="https://github.com/grecoa66/remix-feature-flags/commit/33ed38da3cad374202213cfa78968a182aa971e2"
          text="this commit."
        />
      </Paragraph>
      <Paragraph>
        Let’s imagine our designer and PM are not ready to release this page for
        our users. The PM doesn’t want list items to act as links, and they want
        the user to see a <InlineCode>404</InlineCode> if they navigate directly
        to an item page via the URL. The engineering team has already completed
        work and wants to avoid stashing their progress in a feature branch.
        With a simple feature flag, both parties can get what they want. We can
        accomplish this with our <InlineCode>FeatureFlagContext</InlineCode> and
        a loader response.
      </Paragraph>
      <Paragraph>
        First we’ll add a new environment variable, types, and context. I’ll
        skip the code example, but you can read{" "}
        <Link
          href="https://github.com/grecoa66/remix-feature-flags/commit/2314d54dfa236a09acf4e08436af215176af5150"
          text="this commit"
        />{" "}
        to follow along. The variable will be named{" "}
        <InlineCode>SHOW_ITEM_PAGE</InlineCode> and have a value of{" "}
        <InlineCode>false</InlineCode>.
      </Paragraph>
      <Paragraph>
        Next, in our loader for the item page, we’ll check the environment
        variable and throw a <InlineCode>Not Found</InlineCode> response if{" "}
        <InlineCode>SHOW_ITEM_PAGE</InlineCode> is set to false.
      </Paragraph>
      <CodeSnippet
        code={`// app/routes/inventory.$id.tsx
export const loader = ({ params }: LoaderFunctionArgs) => {
  ...
  const showItemPage = process.env.SHOW_ITEM_PAGE

  if (!showItemPage) {
      throw new Response(null, {
          status: 404,
          statusText: 'Not Found',
      })
  }
  ...
})`}
      />
      <Paragraph>
        Because we are checking the environment variables value in the loader,
        the page will throw a <InlineCode>404</InlineCode> not found before any
        UI is rendered in the browser. This is useful if you don’t want user to
        navigate directly to a page via the URL.
      </Paragraph>
      <Paragraph>
        Just like before, we can load the new environment variable in our client
        side context. This will allow us to render a link or not based on the
        value of <InlineCode>SHOW_ITEM_PAGE</InlineCode>. Again I’ll skip the
        example to avoid repeating myself in this blog.
      </Paragraph>
      <Paragraph>
        You can test this out by changing the value in the{" "}
        <InlineCode>.env</InlineCode> file and restarting the dev sever. If the
        value is false, nothing will change. If true, the inventory cards will
        be clickable links to the new serialized inventory pages.
      </Paragraph>
      <Heading id="conclusion">Conclusion</Heading>
      <Paragraph>
        And that’s it! The code for the route is deployed but hidden for our end
        users. This can easily be changed by modifying our environment variable
        and deploying our application or infrastructure.{" "}
      </Paragraph>
      <Paragraph>
        There are many other use-cases where this pattern can be useful. If you
        would like to chat about them or other frontend topics you reach me at{" "}
        <Link
          href="mailto:alex-greco-dev@gmail.com"
          text="alex-greco-dev@gmail.com"
        />
        .
      </Paragraph>
      <AKGIcon className="mt-8" />
    </main>
  );
}
