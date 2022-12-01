import {
  generateDisplayDate,
  formatDate,
} from "@urbit/foundation-design-system";
import Link from "next/link";


export default function UpdatePreview({ post }) {
  const date = generateDisplayDate(post.date);
  return (
    <div key={post.slug} className="mb-12 cursor-pointer">
      <Link href={`/update/${post.slug}`}>
        <div className="flex items-center md:flex-row flex-col">

          <div className="w-full">
            <h3 className="md:mt-0 !mb-2">{post.title}</h3>

            <div className="text-wall-500 type-sm">
              {formatDate(date)}
            </div>

            {post?.description && <p className="!mt-4">{post.description}</p>}
          </div>
        </div>
      </Link>
    </div>
  );
}
