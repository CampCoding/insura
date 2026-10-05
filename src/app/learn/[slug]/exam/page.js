import ExamView from "@/components/learn/ExamView";

export default async function ExamPage({ params }) {
  const { slug } = await params;
  return <ExamView slug={slug} />;
}
