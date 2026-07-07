import { supabase } from "@/lib/supabase";
import { Certification } from "@/lib/types";
import NewPostForm from "@/components/NewPostForm";

export default async function NewPostPage() {
  const { data } = await supabase.from("certifications").select("*");
  const certs = (data ?? []) as Certification[];

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">글쓰기</h1>
      <NewPostForm certs={certs} />
    </div>
  );
}
