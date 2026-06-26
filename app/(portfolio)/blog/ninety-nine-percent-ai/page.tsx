import { AKGIcon } from "@/app/components/AKGIcon";
import { Heading } from "@/app/components/blog/Heading";
import { InlineCode } from "@/app/components/blog/InlineCode";
import { Link } from "@/app/components/blog/Link";
import { Paragraph } from "@/app/components/blog/Paragraph";
import { Title } from "@/app/components/blog/Title";
import Image from "next/image";

export default function NinetyNinePercentAI() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-theme(space.16))] max-w-[740px] flex-col content-center bg-white p-6 dark:bg-black md:p-10 lg:p-8 lg:px-16 lg:py-12">
      <Title title="99% AI" />
      <Paragraph>
        Over the last six months, the engineering team at <Link href="https://www.thelangstonco.com" text="The Langston Company" />{' '}
        has completely changed how we write software. We went from 1%&ndash;10%
        of our production code being written by AI to 99%. A change we
        didn&apos;t think would be possible a year ago.
      </Paragraph>
      <Paragraph>
        We were never opposed to LLM-assisted development. We&apos;ve stayed
        closely connected to the industry and have been watching where it&apos;s
        headed. If you&apos;ve been paying attention, the trajectory is hard to
        ignore. The models and tools have been improving steadily, with new ones
        appearing constantly. Trusted developers have been praising Claude,
        Codex, and Cursor. We outlined where we were a year ago in{" "}
        <Link
          href="https://www.alex-greco.dev/blog/one-percent-ai"
          text="this article titled 1%"
        />
        .
      </Paragraph>
      <Paragraph>
        The difference between then and now isn&apos;t just the models and tools
        improving drastically. The difference is that we finally set up a truly
        agentic workflow. Until you do that, you&apos;re not really using AI.
        You&apos;re just using a smarter Stack Overflow.
      </Paragraph>
      <Paragraph>
        If you&apos;re not familiar with what an agentic coding workflow means,
        there are plenty of deep-dive articles out there covering the topic.
        What we want to share is how we actually built ours, and what it changed
        for us.
      </Paragraph>
      <Heading id="the-workspace">The Workspace</Heading>
      <Paragraph>
        The core of our setup is what we call the Langston Workspace. It&apos;s
        a custom repository that acts as a wrapper around all of our
        repositories. Structurally, it mimics a monorepo but without the
        overhead and baggage that comes with actually managing one. The workspace
        uses git rules to ignore the nested repos it contains, so each codebase
        stays independent while still being co-located.
      </Paragraph>
      <Paragraph>
        Inside the workspace, we store our agent definitions, skills, MCP server
        configurations, and custom tools written as bash scripts. By bringing
        all of our repositories together in one place, our agents have full
        context across the entire stack. They can read and write code across
        services, understand how the layers connect, and make decisions that span
        the frontend, API, and database at the same time.
      </Paragraph>
      <Paragraph>
        One of the most practical benefits is that all of this configuration
        lives in git. Every teammate shares the same agent files, the same tool
        definitions, the same context. There&apos;s no &quot;it works on my
        machine&quot; version of an agent setup.
      </Paragraph>
      <Paragraph>
        We primarily run our workflow using{" "}
        <Link href="https://opencode.ai/" text="OpenCode" />, which lets us
        launch agentic sessions directly inside the workspace. We choose a
        model, enable whatever MCP servers are relevant to the task, and
        we&apos;re off.
      </Paragraph>
      <Paragraph>
        More recently, I&apos;ve been using Cursor and their workspace feature.
        It replicates a lot of what we built, but with less configuration and a
        nicer UI. Cursor was even able to search my laptop for existing agent
        files and skills and pull them in automatically. I prefer it day to day.
        The tradeoff is that our workspace configuration is checked into git and
        shared across the team &mdash; Cursor doesn&apos;t have a clean way to
        replicate that, at least not that I know of. So it&apos;s become my
        personal preference, while the shared workspace remains the team
        standard.
      </Paragraph>
      <Heading id="a-typical-feature">A Typical Feature</Heading>
      <Paragraph>
        Here&apos;s what building a new feature looks like for us now.
      </Paragraph>
      <Paragraph>
        We start a new session in OpenCode, Claude Code, or Cursor. The first
        thing we do is load our <strong>Planning agent</strong>, which is
        configured with a custom agent file that knows how we write tickets,
        understands our project structure, and is pointed at our Linear MCP
        server. We write out the requirements, provide background context on the
        task, and drop in any screenshots or mockups we have.
      </Paragraph>
      <Paragraph>
        For UI design, we use Vercel&apos;s v0 to sketch out basic layouts,
        though we&apos;ve been moving toward Claude Design lately. Claude Design
        connects more naturally with our codebase. v0 wants to build your entire
        app when you give it repo access, which isn&apos;t what we want from a
        mocking tool. We just want something we can quickly iterate on, not a
        parallel implementation.
      </Paragraph>
      <Paragraph>
        Once we&apos;ve loaded up the context, the agent searches the codebase
        and comes back with a plan. We read through it carefully and go back and
        forth refining scope, confirming or adjusting assumptions, and finalizing
        the approach. This part matters a lot. Handing a half-baked plan to an
        agent and letting it run is a good way to end up with a lot of spaghetti
        on the wall.
      </Paragraph>
      <Paragraph>
        When the plan is solid, we switch to our <strong>Building agent</strong>
        , which carries context about our coding style, testing requirements, and
        architectural patterns. The LLM writes the code, we review it, test it,
        and when it&apos;s ready, we commit it.
      </Paragraph>
      <Paragraph>
        From there two code review integrations start their review. We still
        have Copilot enabled, but honestly its comments are surface-level and I
        don&apos;t think we&apos;d see a drop in quality if we turned it off.
        Our real reviewer is Greptile, which does thorough, in-depth reviews.
        Its suggestions are useful about 85% of the time, which is a high bar
        for an automated review.
      </Paragraph>
      <Paragraph>
        We also have a custom command in our agent tools:{" "}
        <InlineCode>/pr-review &#123;github_url&#125;</InlineCode>. It fetches
        all the comments from the pull request, filters out the noise,
        determines which suggestions are worth acting on, makes the fixes, and
        pushes the code back up. It is LLMs all the way down.
      </Paragraph>
      <Heading id="whats-left-for-us">What&apos;s Left for Us</Heading>
      <Paragraph>
        The obvious question is: what does that leave the engineers to do?
      </Paragraph>
      <Paragraph>
        My answer is software engineers still control the most important parts of
        delivering software. We spend more time talking to stakeholders,
        gathering real requirements, and thinking carefully about system design.
        We think harder about what we&apos;re building and why before we ever
        start a session. The robot will write the code but it needs a capable
        person who understands the system to be in charge.
      </Paragraph>
      <Paragraph>
        This is the part that often gets glossed over in the &quot;AI will
        replace engineers&quot; conversation. LLMs don&apos;t do well when you
        let them run loose. They need direction. They need someone who
        understands the architecture, the business logic, and the constraints.
        The craft of software engineering hasn&apos;t gone away, it&apos;s
        shifted upstream.
      </Paragraph>
      <Paragraph>
        A small team like ours can now build what would have taken a team double
        or triple our size two years ago. That&apos;s the real headline. Not
        that AI writes code, but that it changes the leverage a small,
        thoughtful team can have.
      </Paragraph>
      <Paragraph>
        The process isn&apos;t perfect. We still ship bugs. We still carry tech
        debt. We still feel behind sometimes. But we are moving faster, thinking
        at a higher level, and building better software than we were a year ago.
      </Paragraph>
      <div className="mt-10 flex items-center gap-2 border-t border-white-900 pt-6 text-xs text-white-500">
        <span>Written by me. Proofread by</span>
        <Image
          src="/500px-Claude_AI_symbol.png"
          alt="Claude"
          width={16}
          height={16}
          className="opacity-70"
        />
        <span>Claude Sonnet 4.6</span>
      </div>
      <AKGIcon className="mt-8" />
    </main>
  );
}
