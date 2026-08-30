import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ConceptIntro } from "@/components/learn/ConceptIntro";
import { LessonAnswer } from "@/components/learn/LessonAnswer";
import { TryIt } from "@/components/learn/TryIt";
import { injectTryItPanels } from "@/lib/injectTryIt";
import { prepareLessonMdx } from "@/lib/prepareLessonMdx";

type LessonMdxProps = {
  source: string;
};

const components = {
  ConceptIntro,
  TryIt,
  LessonAnswer,
};

export function LessonMdx({ source }: LessonMdxProps) {
  const prepared = prepareLessonMdx(injectTryItPanels(source));
  return (
    <div className="lesson-prose">
      <MDXRemote
        source={prepared}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </div>
  );
}
